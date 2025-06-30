from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
import os

from openrouter import ask_openrouter

app = Flask(__name__)
DB_PATH = os.path.join(os.path.dirname(__file__), 'app.db')


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# Initialize DB
conn = get_db()
conn.execute(
    """CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            resume TEXT,
            skills TEXT
    )"""
)
conn.execute(
    """CREATE TABLE IF NOT EXISTS swipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            job TEXT,
            decision TEXT
    )"""
)
conn.commit()
conn.close()


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return {'error': 'missing username or password'}, 400
    hashed = generate_password_hash(password)
    try:
        conn = get_db()
        conn.execute('INSERT INTO users(username, password) VALUES (?, ?)', (username, hashed))
        conn.commit()
        user_id = conn.execute('SELECT id FROM users WHERE username=?', (username,)).fetchone()['id']
    finally:
        conn.close()
    return {'status': 'ok', 'user_id': user_id}


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    conn = get_db()
    row = conn.execute('SELECT id, password FROM users WHERE username=?', (username,)).fetchone()
    conn.close()
    if row and check_password_hash(row['password'], password):
        return {'status': 'ok', 'user_id': row['id']}
    return {'error': 'invalid credentials'}, 401


@app.route('/profile/<int:user_id>', methods=['GET', 'POST'])
def profile(user_id):
    conn = get_db()
    if request.method == 'POST':
        data = request.json
        resume = data.get('resume', '')
        skills = data.get('skills', '')
        conn.execute('UPDATE users SET resume=?, skills=? WHERE id=?', (resume, skills, user_id))
        conn.commit()
    row = conn.execute('SELECT id, username, resume, skills FROM users WHERE id=?', (user_id,)).fetchone()
    conn.close()
    if not row:
        return {'error': 'not found'}, 404
    return dict(row)


def fetch_job_suggestion(resume, skills):
    prompt = (
        "Based on the following resume and skills, list one relevant job in JSON format with fields 'id', 'title', 'company', 'description'.\n"
        f"Resume: {resume}\nSkills: {skills}"
    )
    msg = ask_openrouter([{"role": "user", "content": prompt}])
    return msg


def improve_resume(resume, job_description):
    prompt = (
        "Rewrite the following resume to better match this job description.\n"
        f"Job: {job_description}\nResume: {resume}"
    )
    msg = ask_openrouter([{"role": "user", "content": prompt}])
    return msg


@app.route('/job/<int:user_id>', methods=['GET'])
def job(user_id):
    conn = get_db()
    row = conn.execute('SELECT resume, skills FROM users WHERE id=?', (user_id,)).fetchone()
    conn.close()
    if not row:
        return {'error': 'not found'}, 404
    job_json = fetch_job_suggestion(row['resume'], row['skills'])
    return {'job': job_json}


@app.route('/swipe/<int:user_id>', methods=['POST'])
def swipe(user_id):
    data = request.json
    job = data.get('job')
    decision = data.get('decision')  # 'yes' or 'no'
    if not job or decision not in {'yes', 'no'}:
        return {'error': 'bad request'}, 400
    conn = get_db()
    conn.execute('INSERT INTO swipes(user_id, job, decision) VALUES (?, ?, ?)', (user_id, job, decision))
    conn.commit()
    if decision == 'yes':
        row = conn.execute('SELECT resume FROM users WHERE id=?', (user_id,)).fetchone()
        new_resume = improve_resume(row['resume'], job)
        conn.execute('UPDATE users SET resume=? WHERE id=?', (new_resume, user_id))
        conn.commit()
    conn.close()
    return {'status': 'recorded'}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
