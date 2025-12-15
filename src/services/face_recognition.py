import sys
import json
import os


def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "no image path provided"}))
        sys.exit(2)

    path = sys.argv[1]
    exists = os.path.exists(path)

    result = {
        "matched": False,
        "message": "placeholder - implement dlib-based recognition",
        "pathExists": exists,
    }

    print(json.dumps(result))


if __name__ == '__main__':
    main()
