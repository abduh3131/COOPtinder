import os
import subprocess
import sys


def main():
    key = os.environ.get("OPENROUTER_API_KEY")
    if not key:
        key = input("Enter your OpenRouter API key: ").strip()
        if not key:
            print("No API key provided. Exiting.")
            return
        os.environ["OPENROUTER_API_KEY"] = key

    backend = subprocess.Popen([sys.executable, "backend/app.py"])
    try:
        subprocess.run(["npx", "expo", "start", "--ios"])
    finally:
        backend.terminate()
        backend.wait()


if __name__ == "__main__":
    main()
