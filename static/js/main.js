document.addEventListener('DOMContentLoaded', () => {
    fetchEvents();
    setInterval(fetchEvents, 15000); // Polling every 15s
});

async function fetchEvents() {
    try {
        const response = await fetch('/api/events');
        const events = await response.json();
        renderEvents(events);
    } catch (err) {
        console.error("Error fetching data:", err);
    }
}

function renderEvents(events) {
    const list = document.getElementById('events-list');
    list.innerHTML = '';

    if (events.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <p>No actions detected yet.</p>
                <p style="font-size: 0.875rem;">Push something to the repo to see it appear here!</p>
            </div>`;
        return;
    }

    events.forEach((event, index) => {
        const card = createEventCard(event, index);
        list.appendChild(card);
    });
}

function createEventCard(event, index) {
    const ts = new Date(event.timestamp).toLocaleString();
    let content = "";
    let icon = "";
    let iconClass = "";

    // Determine content and style based on action type
    if (event.action === "PUSH") {
        icon = "🚀";
        iconClass = "bg-push";
        content = `
            <div>
                <span class="author-name">${event.author}</span> pushed to 
                <span class="branch-name">${event.to_branch}</span>
            </div>`;
    } else if (event.action === "PULL_REQUEST") {
        icon = "🔀";
        iconClass = "bg-pr";
        content = `
            <div>
                <span class="author-name">${event.author}</span> opened a PR from 
                <span class="branch-name">${event.from_branch}</span> to 
                <span class="branch-name">${event.to_branch}</span>
            </div>`;
    } else if (event.action === "MERGE") {
        icon = "🟣";
        iconClass = "bg-merge";
        content = `
            <div>
                <span class="author-name">${event.author}</span> merged 
                <span class="branch-name">${event.from_branch}</span> into 
                <span class="branch-name">${event.to_branch}</span>
            </div>`;
    } else {
        // Fallback
        icon = "📝";
        iconClass = "bg-push";
        content = `
            <div>
                <span class="author-name">${event.author}</span> performed ${event.action}
            </div>`;
    }

    const card = document.createElement('div');
    card.className = 'event-card animate-slide-up';
    card.style.animationDelay = `${index * 0.1}s`; // Staggered animation

    card.innerHTML = `
        <div class="event-content">
            <div class="event-icon ${iconClass}">
                ${icon}
            </div>
            <div class="event-text">
                ${content}
                <div class="event-meta">
                    <span>🕒 ${ts}</span>
                    <span>•</span>
                    <span>ID: ${event.request_id.substring(0, 7)}...</span>
                </div>
            </div>
        </div>
    `;

    return card;
}
