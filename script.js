'use-strict';

// --- CONFIGURATION ---
const SCHOOL_START_HOUR = 7;
const SCHOOL_END_HOUR = 13;
const HOME_ARRIVAL_HOUR = 14;
const UPDATE_INTERVAL_MS = 120000; // 2 minutes
const BACKEND_URL = 'https://glbp-nodejs.onrender.com/api/generate-message';

// --- APPLICATION LOGIC ---

document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const statusElement = document.getElementById('current-status');
    const timerSpan = document.querySelector('#timer-display span');
    const dailyMessageElement = document.getElementById('daily-message');

    function parseMarkdown(text) {
        const boldRegex = /\*\*(.+?)\*\*/g;
        return text.replace(boldRegex, '<strong>$1</strong>');
    }
    
    // This function no longer needs to call the AI, we can use a simple list
    function setDailyMessage() {
        const dailyGreetings = [
            "It's Sunday. The **Sunday Scaries** are setting in. Preparing for the week ahead.", "It's Monday. The week's final boss is fought on the first day. **Coffee is essential**.", "It's Tuesday. The **longest day** of the week, for some reason. We push through.", "It's Wednesday. Hump day! The peak of the mountain. It's **all downhill** from here.", "It's Thursday. The day of palpable **'pre-Friday' energy**. We are so close.", "It's **FRIDAY!** The golden day. Energy levels are high, patience is optional.", "It's Saturday. Day of rest, errands, and **absolutely zero** school thoughts. Hopefully.",
        ];
        const today = new Date().getDay();
        const parsedDailyMessage = parseMarkdown(dailyGreetings[today]);
        dailyMessageElement.innerHTML = parsedDailyMessage;
    }

    // This function now returns a simple string context for the AI
    function getCurrentContext() {
        const currentHour = new Date().getHours();
        if (currentHour < SCHOOL_START_HOUR) return "early morning, getting ready for school";
        if (currentHour < SCHOOL_END_HOUR) return "in the middle of a school day";
        if (currentHour < HOME_ARRIVAL_HOUR) return "driving home from school";
        if (currentHour < 22) return "at home in the evening, correcting work or relaxing";
        return "late at night, trying to sleep";
    }

    // *** THIS IS THE NEW CORE FUNCTION ***
    async function updateStatus() {
        statusElement.classList.add('fade-out');

        try {
            const context = getCurrentContext();
            
            // Fetch a new message from our Node.js backend
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ context: context }), // Send the context to the AI
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const formattedMessage = parseMarkdown(data.message);
            
            // Display the new message from the AI
            setTimeout(() => {
                statusElement.innerHTML = `<p>${formattedMessage}</p>`;
                statusElement.classList.remove('fade-out');
            }, 500);

        } catch (error) {
            console.error("Could not fetch new message:", error);
            // Display an error message on the site if something goes wrong
            setTimeout(() => {
                statusElement.innerHTML = `<p>Connection to Global Person's mind is **offline**.</p>`;
                statusElement.classList.remove('fade-out');
            }, 500);
        }
    }

    function startCountdown() {
        let timeLeft = UPDATE_INTERVAL_MS / 1000;
        const updateTimer = () => {
            timeLeft--;
            if (timeLeft < 0) {
                timeLeft = (UPDATE_INTERVAL_MS / 1000) - 1;
            }
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerSpan.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        };
        setInterval(updateTimer, 1000);
    }

    // --- INITIALIZATION ---
    setDailyMessage();
    updateStatus();
    startCountdown();
    setInterval(updateStatus, UPDATE_INTERVAL_MS);
});