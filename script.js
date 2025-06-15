'use strict';

// --- CONFIGURATION & MESSAGE POOLS ---

const SCHOOL_START_HOUR = 7;
const SCHOOL_END_HOUR = 13;
const HOME_ARRIVAL_HOUR = 14;
const UPDATE_INTERVAL_MS = 120000; // 2 minutes

// New message pool for the daily greeting
const dailyMessages = [
    "It's Sunday. The 'Sunday Scaries' are setting in. Preparing for the week ahead.", // Sunday (index 0)
    "It's Monday. The week's final boss is fought on the first day. Coffee is essential.", // Monday (index 1)
    "It's Tuesday. The longest day of the week, for some reason. We push through.", // Tuesday (index 2)
    "It's Wednesday. Hump day! The peak of the mountain. It's all downhill from here.", // Wednesday (index 3)
    "It's Thursday. The day of palpable 'pre-Friday' energy. We are so close.", // Thursday (index 4)
    "It's FRIDAY! The golden day. Energy levels are high, patience is optional.", // Friday (index 5)
    "It's Saturday. Day of rest, errands, and absolutely zero school thoughts. Hopefully.", // Saturday (index 6)
];

const earlyMorningMessages = [
    "Waking up. The coffee machine is the real MVP.",
    "Contemplating the meaning of the curriculum. And life.",
    "Alarm went off. Snooze button is being abused.",
    "Searching for two matching socks. Mission failed.",
    "Spilled coffee on a clean shirt. It's a sign.",
    "Mentally reviewing today's lesson plan while brushing teeth.",
    "The cat is demanding breakfast with threatening intensity.",
    "Is it Friday yet? A quick check confirms: it is not.",
    "Listening to the morning news. It's all just noise.",
    "Packing lunch. Is a granola bar a balanced meal?",
    "Realizing the coffee pot was never set last night. A true tragedy.",
    "Trying to be quiet so as not to wake the rest of the house.",
    "The 'check engine' light is on again. We're ignoring it.",
    "Traffic report: already a nightmare. Fantastic.",
    "Grabbing a piece of toast while running out the door.",
    "Double-checking the backpack. Keys, wallet, phone, patience...",
    "The sun isn't even up yet. This feels unnatural.",
    "Debating if today is a 'good hair day'. The humidity says no.",
    "That feeling when you find a surprise $5 bill in your jacket.",
    "Just remembered a brilliant idea for a lesson. Now to find a pen.",
];

const schoolMessages = [
    "Explaining the same concept for the 5th time. It's fine.",
    "Navigating the hallway traffic jam between classes.",
    "Whispering 'use your inside voice' for the 100th time.",
    "The projector is not projecting. Classic.",
    "Someone just asked if this will be on the test.",
    "Grading papers while trying to eat lunch in 5 minutes.",
    "Staring at the clock. It appears to be moving backwards.",
    "The Wi-Fi is down. Time to improvise... again.",
    "A student just said something surprisingly profound. Hope is restored.",
    "A student just asked if Africa is a country. Hope is dwindling.",
    "The copier is jammed. The error message is in ancient Aramaic.",
    "The smell of cafeteria tater tots is wafting into the room.",
    "Confiscating a phone for the third time today. From the same student.",
    "That moment of pure silence after you ask a difficult question.",
    "A surprise observation from the principal. Just act natural.",
    "Someone raised their hand to tell a long, unrelated story.",
    "Found a typo on the worksheet after making 150 copies.",
    "A student's birthday means cupcakes. The sugar rush is imminent.",
    "The fire alarm went off. It was just a drill. Probably.",
    "That one student is asleep again. I'll let it slide this time.",
    "The bell for lunch sounded like an angel's harp.",
];

const drivingHomeMessages = [
    "Driving home. Mentally replaying that awkward parent-teacher conversation.",
    "Listening to a podcast to decompress. The volume is high.",
    "Stuck in traffic. Perfect time to plan tomorrow's lesson.",
    "The school day is over. Freedom... almost.",
    "Blasting music with the windows down. A sacred ritual.",
    "Just sitting in complete, blissful silence.",
    "The phantom sound of the school bell is still ringing in my ears.",
    "Calling a friend to vent about the day's chaos.",
    "Debating stopping for groceries vs. going straight to the couch.",
    "Realizing my favorite coffee mug was left on my desk.",
    "A wave of exhaustion just hit. Hard.",
    "Taking the scenic route to delay adulting at home.",
    "Suddenly remembering a funny thing a student said and smiling.",
    "The car feels like a personal decompression chamber.",
    "Planning dinner in my head. It's probably going to be cereal.",
    "My back hurts from leaning over desks all day.",
    "Making a mental note to bring extra tissues to class tomorrow.",
    "Did I lock the classroom door? Yes. Probably. I think so.",
    "That feeling of taking off a lanyard is pure freedom.",
    "Seeing a school bus and feeling a strange sense of camaraderie.",
];

const homeAndEveningMessages = [
    "Finally home. First stop: the toilet.",
    "Correcting a mountain of homework. The red pen is thirsty.",
    "Making dinner while thinking about that one student's weird question.",
    "Zoning out in front of the TV. Don't ask me what's on.",
    "Actually, I have to go back to the store. Forgot the milk.",
    "Preparing tomorrow's lesson plan. The cycle never ends!",
    "Changing out of 'teacher clothes' and into 'sentient blanket' mode.",
    "The pet is acting like I've been gone for three years.",
    "The eternal question: 'What's for dinner?'",
    "Ignoring the pile of laundry in the corner. It's a feature now.",
    "Finding a surprisingly sweet note from a student in a pile of papers.",
    "Fell down a YouTube rabbit hole about historical bread-making.",
    "Collapsing on the couch for a 'five-minute rest'. Woke up an hour later.",
    "Got a burst of energy and actually cleaned the kitchen.",
    "Answering parent emails. Trying to sound cheerful and professional.",
    "Reading a book that has absolutely nothing to do with my subject.",
    "Realized I have a staff meeting first thing tomorrow. Ugh.",
    "The simple joy of putting my feet up.",
    "Trying to help my own kid with their homework. The irony is not lost on me.",
    "Just remembered a bill is due. There goes the fun money.",
];

const lateNightMessages = [
    "Should be sleeping. Instead, scrolling through memes.",
    "The house is quiet. Too quiet. It's suspicious.",
    "One last check of school emails. Regretting it immediately.",
    "Falling asleep on the couch with the remote in my hand.",
    "Setting five different alarms for the morning, just in case.",
    "A brilliant lesson idea just struck at midnight. Now where's a notebook?",
    "The 'just one more episode' lie I tell myself every night.",
    "The Sunday Scaries are kicking in, even on a Tuesday.",
    "Calculating the exact hours of sleep I'll get if I go to bed *right now*.",
    "Got up for a glass of water and forgot why I was in the kitchen.",
    "Making a mental to-do list for tomorrow is not helping me relax.",
    "Doomscrolling the news. A terrible pre-sleep activity.",
    "The sweet, sweet relief of finally climbing into bed.",
    "Thinking about that one student I'm worried about.",
    "Hearing a weird noise and deciding it's probably not a monster.",
    "Laying in the dark, re-thinking a conversation from three years ago.",
    "Did I leave the oven on? No. But I'll check anyway.",
    "My brain won't shut up. It's still in 'teacher mode'.",
    "Finally drifting off... and then remembering something I forgot to do.",
    "Dreaming that I'm at school, but I've forgotten my pants.",
];

// --- APPLICATION LOGIC ---

document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const statusElement = document.getElementById('current-status');
    const timerSpan = document.querySelector('#timer-display span');
    const dailyMessageElement = document.getElementById('daily-message');

    // Variable to store the last message to prevent repeats
    let lastMessage = '';

    // Function to set the daily message in the header
    function setDailyMessage() {
        const today = new Date().getDay(); // 0 for Sunday, 1 for Monday, etc.
        dailyMessageElement.textContent = dailyMessages[today];
    }

    // Function to get the correct message pool based on time
    function getCurrentMessagePool() {
        const currentHour = new Date().getHours();
        if (currentHour < SCHOOL_START_HOUR) return earlyMorningMessages;
        if (currentHour < SCHOOL_END_HOUR) return schoolMessages;
        if (currentHour < HOME_ARRIVAL_HOUR) return drivingHomeMessages;
        if (currentHour < 22) return homeAndEveningMessages; // Before 10 PM
        return lateNightMessages;
    }

    // Function to get a random message from a pool
    function getRandomMessage(pool) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        return pool[randomIndex];
    }

    // Function to update the displayed status
    function updateStatus() {
        const messagePool = getCurrentMessagePool();
        let newMessage;

        // Loop to make sure the new message is not the same as the last one
        // This loop will only run if there is more than one message in the pool
        do {
            newMessage = getRandomMessage(messagePool);
        } while (newMessage === lastMessage && messagePool.length > 1);

        // Store the new message as the last message for the next update
        lastMessage = newMessage;

        // Add a fade-out effect for a smooth transition
        statusElement.classList.add('fade-out');
        setTimeout(() => {
            statusElement.innerHTML = `<p>${newMessage}</p>`;
            statusElement.classList.remove('fade-out');
        }, 500); // This delay must match the CSS transition duration
    }

    // Function to update the countdown timer every second
    function startCountdown() {
        let timeLeft = UPDATE_INTERVAL_MS / 1000;
        const updateTimer = () => {
            timeLeft--;
            if (timeLeft < 0) {
                timeLeft = (UPDATE_INTERVAL_MS / 1000) - 1; // Reset timer
            }
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerSpan.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        };
        setInterval(updateTimer, 1000);
    }

    // --- INITIALIZATION ---
    setDailyMessage(); // Set the daily message on page load
    updateStatus();    // Initial status update
    startCountdown();  // Start the countdown timer

    // Set the interval for all future status updates
    setInterval(updateStatus, UPDATE_INTERVAL_MS);
});