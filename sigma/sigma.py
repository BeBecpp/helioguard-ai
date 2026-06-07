import json
import sys
import time
from pathlib import Path

import pyautogui
import pyperclip


BASE_DIR = Path(__file__).resolve().parent
SNIPPETS_FILE = BASE_DIR / "snippets.json"

START_DELAY = 5
TYPE_DELAY = 0.025
DELETE_DELAY = 0.01
PAUSE_AFTER_TYPING = 1.2
PAUSE_AFTER_DELETING = 0.5

LOOP_FOREVER = True

pyautogui.FAILSAFE = True


def paste_hotkey():
    if sys.platform == "darwin":
        pyautogui.hotkey("command", "v")
    else:
        pyautogui.hotkey("ctrl", "v")


def type_text(text):
    for char in text:
        pyperclip.copy(char)
        paste_hotkey()
        time.sleep(TYPE_DELAY)


def delete_text(text):
    for _ in range(len(text)):
        pyautogui.press("backspace")
        time.sleep(DELETE_DELAY)


def load_snippets():
    print(f"Looking for JSON file: {SNIPPETS_FILE}")

    if not SNIPPETS_FILE.exists():
        print("ERROR: snippets.json олдсонгүй.")
        print("sigma.py-тэй нэг folder дотор snippets.json үүсгэ.")
        return []

    with SNIPPETS_FILE.open("r", encoding="utf-8") as file:
        data = json.load(file)

    snippets = []

    if isinstance(data, list):
        for item in data:
            if isinstance(item, dict) and item.get("code"):
                snippets.append(item["code"])

    print(f"Loaded snippets: {len(snippets)}")

    return snippets


def main():
    print("sigma.py started")

    snippets = load_snippets()

    if not snippets:
        print("No snippets found. Program stopped.")
        return

    try:
        original_clipboard = pyperclip.paste()
    except Exception:
        original_clipboard = ""

    print()
    print(f"Starting in {START_DELAY} seconds...")
    print("Одоо Cursor editor дээрээ бичүүлэх file дээрээ click хий.")
    print("Зогсоох бол mouse-оо дэлгэцийн зүүн дээд буланд аваач.")
    print()

    for i in range(START_DELAY, 0, -1):
        print(f"{i}...")
        time.sleep(1)

    try:
        while True:
            for index, code in enumerate(snippets, start=1):
                print(f"Typing snippet {index}/{len(snippets)}")

                type_text(code)
                time.sleep(PAUSE_AFTER_TYPING)

                print(f"Deleting snippet {index}/{len(snippets)}")

                delete_text(code)
                time.sleep(PAUSE_AFTER_DELETING)

            if not LOOP_FOREVER:
                break

    except pyautogui.FailSafeException:
        print("Stopped by fail-safe.")

    except KeyboardInterrupt:
        print("Stopped by Ctrl+C.")

    finally:
        try:
            pyperclip.copy(original_clipboard)
        except Exception:
            pass

        print("sigma.py finished")


if __name__ == "__main__":
    main()