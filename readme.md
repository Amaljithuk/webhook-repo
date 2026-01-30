# GitHub Activity Monitor (TechStaX Assessment)

![Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Python](https://img.shields.io/badge/Python-3.8%2B-yellow)
![Flask](https://img.shields.io/badge/Flask-2.0%2B-green)

This project is a full-stack application designed to capture GitHub events (Push, Pull Request, Merge) in real-time via webhooks and display them on a clean, minimal UI that updates every 15 seconds.

## 🚀 Features

- **Webhook Receiver**: A Flask-based endpoint that processes incoming JSON payloads from GitHub.
- **Database Integration**: Stores event data (author, branches, timestamp, and request ID) in MongoDB Atlas.
- **Live UI**: A minimalist dashboard that polls the database every 15 seconds for the latest activity.
- **UTC Formatting**: All timestamps are displayed in the required UTC format.

## 🛠️ Tech Stack

- **Backend**: Python, Flask
- **Database**: MongoDB Atlas
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (Fetch API)
- **Tunneling**: Ngrok (for local development)

## 📂 Project Structure

```
webhook-repo/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── .env                # Environment variables (not committed)
├── readme.md           # Project documentation
├── static/             # Static assets
│   ├── css/
│   │   └── style.css   # Main stylesheet
│   └── js/
│       └── main.js     # Frontend logic
└── templates/
    └── index.html      # Main dashboard HTML
```

## 📋 Schema Requirements

The application strictly follows the mandatory MongoDB schema:

| Field | Description |
| :--- | :--- |
| `request_id` | Git commit hash or Pull Request ID. |
| `author` | The GitHub username. |
| `action` | `PUSH`, `PULL_REQUEST`, or `MERGE`. |
| `from_branch` | Source branch (for PRs/Merges). |
| `to_branch` | Target branch. |
| `timestamp` | Datetime formatted string (UTC). |

## ⚙️ Setup and Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/webhook-repo.git
cd webhook-repo
```

### 2. Set up Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your MongoDB connection string:
```ini
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/
```

### 4. Run the Application
```bash
python app.py
```

### 5. Expose to Webhook
If running locally, use ngrok to create a tunnel:
```bash
ngrok http 5000
```
Add the generated URL to your GitHub repository settings under **Settings > Webhooks** (e.g., `https://your-url.ngrok.io/webhook`).

## ✅ Final Submission Checklist

- [ ] Both action-repo and webhook-repo links are ready.
- [ ] UI displays "Merge" actions for extra "Brownie Points."
- [ ] MongoDB Atlas contains records for your recent test pushes.