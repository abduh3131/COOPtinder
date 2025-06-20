from flask import Flask, render_template, request, redirect, session, url_for
from dataclasses import dataclass
from typing import List
import os

app = Flask(__name__)
app.secret_key = 'dev'

UPLOAD_FOLDER = 'resumes'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@dataclass
class Job:
    id: int
    title: str
    description: str

# Sample jobs
JOBS: List[Job] = [
    Job(1, 'Software Engineer', 'Build cool apps'),
    Job(2, 'Data Analyst', 'Analyze data and generate reports'),
    Job(3, 'UX Designer', 'Design user experiences')
]

# In-memory user store
USERS = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        file = request.files['resume']
        if username in USERS:
            return 'User already exists', 400
        path = os.path.join(UPLOAD_FOLDER, f"{username}_resume.pdf")
        file.save(path)
        USERS[username] = {'resume': path, 'seen': set(), 'applied': []}
        session['username'] = username
        return redirect(url_for('swipe'))
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        if username not in USERS:
            return 'Unknown user', 400
        session['username'] = username
        return redirect(url_for('swipe'))
    return render_template('login.html')

@app.route('/swipe', methods=['GET'])
def swipe():
    username = session.get('username')
    if not username:
        return redirect(url_for('login'))
    user = USERS[username]
    # Find next unseen job
    job = next((j for j in JOBS if j.id not in user['seen']), None)
    return render_template('swipe.html', job=job)

@app.route('/swipe/<int:job_id>', methods=['POST'])
def swipe_action(job_id):
    username = session.get('username')
    if not username:
        return redirect(url_for('login'))
    action = request.form['action']
    user = USERS[username]
    user['seen'].add(job_id)
    if action == 'right':
        user['applied'].append(job_id)
    return redirect(url_for('swipe'))

if __name__ == '__main__':
    app.run(debug=True)
