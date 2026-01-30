GitHub Activity Monitor (TechStaX Assessment)

This project is a full-stack application designed to capture GitHub events (Push, Pull Request, Merge) in real-time via webhooks and display them on a clean, minimal UI that updates every 15 seconds.

🚀 Features

    Webhook Receiver: A Flask-based endpoint that processes incoming JSON payloads from GitHub. 

Database Integration: Stores event data (author, branches, timestamp, and request ID) in MongoDB Atlas.

Live UI: A minimalist dashboard that polls the database every 15 seconds for the latest activity.

UTC Formatting: All timestamps are displayed in the required UTC format.

🛠️ Tech Stack

    Backend: Python, Flask 

Database: MongoDB Atlas

Frontend: HTML5, CSS3, Vanilla JavaScript (Fetch API)

    Tunneling: Ngrok (for local development)

📋 Schema Requirements

The application strictly follows the mandatory MongoDB schema:

    request_id: Git commit hash or Pull Request ID.

    author: The GitHub username.

    action: PUSH, PULL_REQUEST, or MERGE.

    from_branch: Source branch (for PRs/Merges).

    to_branch: Target branch.

    timestamp: Datetime formatted string (UTC).

⚙️ Setup and Installation

    Clone the repository:
    Bash

git clone https://github.com/your-username/webhook-repo.git
cd webhook-repo

Set up Virtual Environment:
Bash

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

Environment Variables: Create a .env file in the root directory and add your MongoDB connection string:
Code snippet

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/

Run the Application:
Bash

python app.py

Expose to Webhook: If running locally, use ngrok to create a tunnel:
Bash

ngrok http 5000

Add the generated URL to the action-repo settings under Webhooks (e.g., https://your-url.ngrok.io/webhook).

Final Submission Checklist

    [ ] Both action-repo and webhook-repo links are ready. 

[ ] UI displays "Merge" actions for extra "Brownie Points."

[ ] MongoDB Atlas contains records for your recent test pushes.