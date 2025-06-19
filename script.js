'use-strict';

// --- CONFIGURATION ---
const dailyMessageElement = document.getElementById('daily-message');
const UPDATE_INTERVAL_MS = 120000; // 2 minutes
const BACKEND_URL = 'https://glbp-nodejs.onrender.com/api/current-message'; // Make sure this is your correct Render URL

// --- APPLICATION LOGIC ---

document.addEventListener('DOMContentLoaded', () => {
    const statusElement = document.getElementById('current-status');
    const timerSpan = document.querySelector('#timer-display span');
    
    let lastDisplayedMessage = '';

    function parseMarkdown(text) {
        const boldRegex = /\*\*(.+?)\*\*/g;
        return text.replace(boldRegex, '<strong>$1</strong>');
    }

    function setDailyMessage() {
        const dailyGreetings = [
            "It's Sunday. The **Sunday Scaries** are setting in. Preparing for the week ahead.", "It's Monday. The week's final boss is fought on the first day. **Coffee is essential**.", "It's Tuesday. The **longest day** of the week, for some reason. We push through.", "It's Wednesday. Hump day! The peak of the mountain. It's **all downhill** from here.", "It's Thursday. The day of palpable **'pre-Friday' energy**. We are so close.", "It's **FRIDAY!** The golden day. Energy levels are high, patience is optional.", "It's Saturday. Day of rest, errands, and **absolutely zero** school thoughts. Hopefully.",
        ];
        const today = new Date().getDay();
        const parsedDailyMessage = parseMarkdown(dailyGreetings[today]);
        dailyMessageElement.HTML = parsedDailyMessage;
    }

    // *** MODIFIED UPDATE FUNCTION WITH WAITING MESSAGE LOGIC ***
    async function updateStatus() {
        let loadingTimerId = null;

        // Set a timer. If the fetch takes too long, this will run.
        loadingTimerId = setTimeout(() => {
            statusElement.innerHTML = `<p class="loading-message">Waking up the server... one moment.</p>`;
        }, 2000); // Show message after 2 seconds of waiting

        try {
            const response = await fetch(BACKEND_URL);

            // If we get here, the server has responded. Stop the timer.
            clearTimeout(loadingTimerId);
            
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const data = await response.json();

            if (data.message !== lastDisplayedMessage) {
                console.log("New message received from server:", data.message);
                lastDisplayedMessage = data.message;
                
                const formattedMessage = parseMarkdown(data.message);

                statusElement.classList.add('fade-out');
                setTimeout(() => {
                    // Make sure to remove the loading-message class if it was added
                    statusElement.classList.remove('loading-message'); 
                    statusElement.innerHTML = `<p>${formattedMessage}</p>`;
                    statusElement.classList.remove('fade-out');
                }, 500);
            } else {
                console.log("Message hasn't changed on the server yet. Waiting for next cycle.");
            }

        } catch (error) {
            // Also stop the timer on error.
            clearTimeout(loadingTimerId);
            console.error("Could not fetch new message:", error);
            statusElement.innerHTML = `<p>Connection to Global Person's mind is **offline**.</p>`;
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