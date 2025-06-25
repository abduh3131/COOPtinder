import os
import subprocess
import sys


def main():
    env = os.environ.copy()
    key = env.get("OPENROUTER_API_KEY")
    if not key:
        print("OPENROUTER_API_KEY environment variable not set")
        return

    backend = subprocess.Popen([sys.executable, "backend/app.py"], env=env)
    try:
        subprocess.run(["npx", "expo", "start", "--ios"], env=env)
    finally:
        backend.terminate()
        backend.wait()


if __name__ == "__main__":
    main()
