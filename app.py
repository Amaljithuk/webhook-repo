import os
from flask import Flask, request, jsonify, render_template
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Retrieve the URI from environment variables
MONGO_URI = os.getenv("MONGO_URI")

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client['github_events']
collection = db['events']

@app.route('/')
def index():
    # This looks for index.html inside the /templates folder
    return render_template('index.html')

@app.route('/api/events', methods=['GET'])
def get_events():
    # Fetch data from MongoDB to send to the UI
    events = list(collection.find().sort("timestamp", -1).limit(10))
    for event in events:
        event['_id'] = str(event['_id']) 
    return jsonify(events)

@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.json
    if not data:
        return jsonify({"error": "No payload"}), 400

    # Determine event type from GitHub Header
    event_type = request.headers.get('X-GitHub-Event', '').upper()
    
    event_doc = {}
    
    if event_type == "PUSH":
        event_doc = {
            "request_id": data.get('after'), # Git commit hash [cite: 27]
            "author": data.get('pusher', {}).get('name'),
            "action": "PUSH",
            "from_branch": "", # Pushes don't usually have a 'from' branch in this context
            "to_branch": data.get('ref', '').split('/')[-1],
            "timestamp": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ') # UTC format [cite: 27]
        }
    
    elif event_type == "PULL_REQUEST":
        action_detail = data.get('action')
        # Check if it's a merge or just a PR submission
        is_merged = data.get('pull_request', {}).get('merged', False)
        
        event_doc = {
            "request_id": str(data.get('pull_request', {}).get('id')), # PR ID [cite: 27]
            "author": data.get('pull_request', {}).get('user', {}).get('login'),
            "action": "MERGE" if is_merged else "PULL_REQUEST",
            "from_branch": data.get('pull_request', {}).get('head', {}).get('ref'),
            "to_branch": data.get('pull_request', {}).get('base', {}).get('ref'),
            "timestamp": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        }

    if event_doc:
        collection.insert_one(event_doc)
        return jsonify({"status": "success"}), 200

    return jsonify({"status": "ignored"}), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)