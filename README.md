
# 🎥 Chrome Tab Recorder Extension

A simple Chrome Extension that captures the **active tab's** screen **with audio** using the `chrome.tabCapture` API. The extension allows users to **start**, **pause**, **resume**, and **stop** recordings, and automatically **downloads the video** after recording.

---

## 🚀 Features

- ✅ Capture video and audio from the currently active tab  
- ⏸ Pause and ▶️ Resume recording  
- 🛑 Stop recording and download the result  
- 💾 Automatically saves video in `.webm` format  
- 🔒 Works entirely within the browser (no server or cloud)

---

## 📦 Installation

1. Clone or download this repository.
2. Open Google Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (top right corner).
4. Click **Load unpacked** and select the project folder.

---

## 🛠 Technologies Used

- `chrome.tabCapture` – for capturing active tab video/audio  
- `MediaRecorder` API – for recording media streams  
- HTML / CSS / JavaScript – for the extension UI and logic

---

## 🧪 How to Use

1. Click on the extension icon in the Chrome toolbar.
2. Click **Start Recording** to begin capturing the current tab.
3. Use **Pause** and **Resume** as needed.
4. Click **Stop Recording** to end the session.
5. The video will be automatically downloaded as a `.webm` file.

---

## 📁 Project Structure

```
chrome-tab-recorder/
├── manifest.json
├── capture.html
├── capture.js
├── capture.css
├── capservice.js
├── offscreen.html
├── offscreen.js
└── images/
    └── error-icon.png
```

---

## 📄 Manifest Permissions

```json
"permissions": [
  "tabCapture",
  "activeTab",
  "storage",
  "notifications",
  "tabs",
  "offscreen"
]
```

---

## 📌 Notes

- The extension only records **one tab at a time**.
- Make sure to have **audio playing** on the tab if you want it included.
- Works best on the latest version of Chrome.
- ⚠️ **Current Limitation**: The UI buttons do not currently reflect the recording state (e.g., recording, paused). This will be improved in a future update.

---



=======
# tab-capture-extension
A simple Chrome extension that captures the content of the active browser tab using the Chrome Tab Capture API.

