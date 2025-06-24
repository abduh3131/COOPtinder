from flask import Flask, request, jsonify
import sqlite3
import threading
import time
import os

from transformers import pipeline
from faster_whisper import WhisperModel

app = Flask(__name__)

# initialize sqlite database
DB_PATH = "queue.db"
conn = sqlite3.connect(DB_PATH, check_same_thread=False)
conn.execute(
    """CREATE TABLE IF NOT EXISTS jobs (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           transcript TEXT,
           status TEXT,
           result TEXT
       )"""
)
conn.commit()

# load local models
SUMMARY_MODEL = os.environ.get("SUMMARY_MODEL", "t5-small")
ASR_MODEL = os.environ.get("ASR_MODEL", "base")  # faster-whisper model size

summarizer = pipeline("summarization", model=SUMMARY_MODEL)
asr_model = WhisperModel(ASR_MODEL, device="cpu", compute_type="int8")


def generate_soap(text: str) -> str:
    """Generate a SOAP style note from transcript text."""
    prompt = (
        "Generate a medical note in SOAP format using bullet points.\n"
        "Transcript: " + text
    )
    summary = summarizer(prompt, max_length=200, min_length=50)[0]["summary_text"]
    # simple formatting into sections
    sections = {
        "Subjective": "- " + summary.replace("\n", " ")
    }
    soap = "\n".join(f"{k}: {v}" for k, v in sections.items())
    return soap


def worker():
    """Background worker processing queued transcripts."""
    while True:
        cur = conn.execute("SELECT id, transcript FROM jobs WHERE status='pending' ORDER BY id LIMIT 1")
        row = cur.fetchone()
        if row is None:
            time.sleep(1)
            continue
        job_id, transcript = row
        try:
            soap = generate_soap(transcript)
            conn.execute("UPDATE jobs SET result=?, status='done' WHERE id=?", (soap, job_id))
            conn.commit()
        except Exception as e:
            conn.execute("UPDATE jobs SET result=?, status='error' WHERE id=?", (str(e), job_id))
            conn.commit()


threading.Thread(target=worker, daemon=True).start()


@app.route("/submit", methods=["POST"])
def submit():
    """Submit an audio file or transcript to the queue."""
    transcript = request.form.get("transcript")
    if 'file' in request.files:
        f = request.files['file']
        path = os.path.join('/tmp', f.filename)
        f.save(path)
        segments, _ = asr_model.transcribe(path)
        transcript = " ".join([seg.text for seg in segments])
        os.remove(path)
    if not transcript:
        return jsonify({"error": "missing transcript"}), 400
    cur = conn.execute("INSERT INTO jobs (transcript, status) VALUES (?, 'pending')", (transcript,))
    conn.commit()
    job_id = cur.lastrowid
    return jsonify({"job_id": job_id, "status": "queued"})


@app.route("/queue", methods=["GET"])
def queue_status():
    cur = conn.execute("SELECT id, status FROM jobs ORDER BY id DESC")
    data = [dict(id=row[0], status=row[1]) for row in cur.fetchall()]
    return jsonify(data)


@app.route("/result/<int:job_id>", methods=["GET"])
def result(job_id):
    cur = conn.execute("SELECT status, result FROM jobs WHERE id=?", (job_id,))
    row = cur.fetchone()
    if row is None:
        return jsonify({"error": "not found"}), 404
    status, result_text = row
    return jsonify({"status": status, "result": result_text})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
