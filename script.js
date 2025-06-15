'use-strict';

// --- CONFIGURATION & MESSAGE POOLS ---

const SCHOOL_START_HOUR = 7;
const SCHOOL_END_HOUR = 13;
const HOME_ARRIVAL_HOUR = 14;
const UPDATE_INTERVAL_MS = 60000; // 2 minutes

const dailyMessages = [
    "It's Sunday. The **Sunday Scaries** are setting in. Preparing for the week ahead.", // Sunday (index 0)
    "It's Monday. The week's final boss is fought on the first day. **Coffee is essential**.", // Monday (index 1)
    "It's Tuesday. The **longest day** of the week, for some reason. We push through.", // Tuesday (index 2)
    "It's Wednesday. Hump day! The peak of the mountain. It's **all downhill** from here.", // Wednesday (index 3)
    "It's Thursday. The day of palpable **'pre-Friday' energy**. We are so close.", // Thursday (index 4)
    "It's **FRIDAY!** The golden day. Energy levels are high, patience is optional.", // Friday (index 5)
    "It's Saturday. Day of rest, errands, and **absolutely zero** school thoughts. Hopefully.", // Saturday (index 6)
];

// --- GIGANTIC MESSAGE POOLS ---

const earlyMorningMessages = [
    "Waking up. The coffee machine is the **real MVP**.", "Contemplating the meaning of the curriculum. And life.", "Alarm went off. Snooze button is **being abused**.", "Searching for two matching socks. **Mission failed**.", "Spilled coffee on a clean shirt. It's a sign.", "Mentally reviewing today's lesson plan while brushing teeth.", "The cat is demanding breakfast with **threatening intensity**.", "Is it Friday yet? A quick check confirms: **it is not**.", "Listening to the morning news. It's all just noise.", "Packing lunch. Is a granola bar a balanced meal?", "Realizing the coffee pot was never set last night. A **true tragedy**.", "Trying to be quiet so as not to wake the rest of the house.", "The 'check engine' light is on again. We're ignoring it.", "Traffic report: **already a nightmare**. Fantastic.", "Grabbing a piece of toast while running out the door.", "Double-checking the backpack. Keys, wallet, phone, **patience...**", "The sun isn't even up yet. This feels unnatural.", "Debating if today is a 'good hair day'. The humidity says **no**.", "That feeling when you find a surprise $5 bill in your jacket.", "Just remembered a brilliant idea for a lesson. Now to find a pen.", "A moment of silence for the person I was before the alarm went off.", "Putting on the 'teacher armor'. It's mostly just caffeine and a brave face.", "The first sip of coffee has been deployed. **Humanity loading...**", "Realizing I forgot to charge my phone overnight. A risky start.", "The sky is a weird color. Should probably check the weather.", "Today's forecast: 100% chance of needing more coffee.", "Running on **3 hours of sleep** and sheer willpower.", "Mentally preparing for the first 'Good morning!' which I don't feel yet.", "Finding my car keys was today's first pop quiz.", "My brain feels like an old dial-up modem trying to connect.", "Is this my coffee or yesterday's? We're about to find out.", "My joints just made a sound like **popping bubble wrap**.", "I've hit the snooze button so many times I'm not sure what year it is.", "Lost the battle with the snooze button. It was a valiant effort.", "Mentally rehearsing a parent email response while in the shower.", "The reflection in the mirror looks like a **sleep-deprived cryptid**.", "Today's professional outfit was chosen entirely based on what was clean.", "Stepped on a Lego. The day has **already peaked** in terms of pain.", "The kitchen is a disaster zone from last night. A problem for 'Future Me'.", "My internal monologue is just the dial-up sound this morning.", "Pouring cereal and realizing there's no milk. **A moment of crisis**.", "Trying to remember if I have a meeting before school today. Probably.", "The birds are chirping. They sound **far too happy** for this hour.", "Just remembered I have playground duty today. Pray for me.", "The air has a distinct smell of 'I don't want to go'.", "One last peaceful scroll through the phone before the chaos begins.", "Okay, let's do this. **Or not**. We'll see.", "The car is covered in a mysterious layer of pollen. Nature's glitter.", "Have I become the kind of person who irons their clothes? **No. Definitely not**.", "That deep breath before opening the car door at school. Here we go.",
];

const schoolMessages = [
    "Explaining the same concept for the **5th time**. It's fine.", "Navigating the hallway traffic jam between classes.", "Whispering 'use your inside voice' for the **100th time**.", "The projector is **not projecting**. Classic.", "Someone just asked if this will be on the test.", "Grading papers while trying to eat lunch in **5 minutes**.", "Staring at the clock. It appears to be moving **backwards**.", "The Wi-Fi is down. Time to improvise... **again**.", "A student just said something surprisingly profound. **Hope is restored**.", "A student just asked if Africa is a country. Hope is dwindling.", "The copier is jammed. The error message is in **ancient Aramaic**.", "The smell of cafeteria tater tots is wafting into the room.", "Confiscating a phone for the third time today. From the **same student**.", "That moment of **pure silence** after you ask a difficult question.", "A surprise observation from the **principal**. Just act natural.", "Someone raised their hand to tell a long, unrelated story.", "Found a typo on the worksheet **after** making 150 copies.", "A student's birthday means cupcakes. The **sugar rush** is imminent.", "The fire alarm went off. It was just a drill. **Probably**.", "That one student is asleep again. I'll let it slide **this time**.", "The bell for lunch sounded like an **angel's harp**.", "The Smartboard is uncalibrated. Now everything I write is 6 inches to the left.", "A student is crying. Reason is unclear, but it involves a pencil.", "The PA system just crackled to life with an **incomprehensible announcement**.", "I've used up my entire supply of sticky notes for the day.", "A student just called me 'mom'. I'm not even mad.", "The classroom temperature is either **Arctic Tundra** or **Scorching Desert**.", "Someone is sharpening a pencil. It has been sharpening for three minutes.", "That brief, beautiful moment when every student is **actually working**.", "A student just explained a meme to me. I feel **ancient**.", "Receiving an apple from a student. My diet for the day is now sorted.", "Just broke up a heated debate about whether hot dogs are sandwiches.", "The distinct smell of **wet-wipes and desperation** fills the air.", "A student just used a vocabulary word correctly. **There is hope**.", "My 'teacher stare' is fully charged and operational.", "The last working blue dry-erase marker has **given up the ghost**.", "Someone is trying to pay for a snack with a **single, sticky penny**.", "Navigating a conversation with a colleague while 30 kids yell my name.", "A student just asked a question so smart it **stopped me in my tracks**.", "Just found a glitter bomb in a returned assignment.", "The lights are flickering. This place is **definitely haunted**.", "My personal coffee mug has been declared a biohazard.", "A student just told me I look tired. **Thanks, I know**.", "The glue sticks have all lost their caps. It's a sticky apocalypse.", "Someone is humming off-key. It's a test of my will.", "I'm 90% coffee and 10% dry shampoo at this point.", "A student is arguing that a square is, in fact, not a rectangle.", "The good snacks in the staff room are gone. **A dark day**.", "Just intercepted a passed note. It's surprisingly well-written.", "Another meeting that could have been an email. **My soul weeps**.", "The quietest student just made the funniest joke of the year.",
];

const drivingHomeMessages = [
    "Driving home. Mentally replaying that **awkward** parent-teacher conversation.", "Listening to a podcast to decompress. The volume is high.", "Stuck in traffic. Perfect time to plan **tomorrow's lesson**.", "The school day is over. **Freedom... almost**.", "Blasting music with the windows down. A sacred ritual.", "Just sitting in **complete, blissful silence**.", "The phantom sound of the school bell is still ringing in my ears.", "Calling a friend to vent about the day's chaos.", "Debating stopping for groceries vs. going **straight to the couch**.", "Realizing my favorite coffee mug was **left on my desk**.", "A wave of exhaustion just hit. **Hard**.", "Taking the scenic route to delay adulting at home.", "Suddenly remembering a funny thing a student said and smiling.", "The car feels like a personal **decompression chamber**.", "Planning dinner in my head. It's probably going to be **cereal**.", "My back hurts from leaning over desks all day.", "Making a mental note to bring extra tissues to class tomorrow.", "**Did I lock the classroom door?** Yes. Probably. I think so.", "That feeling of taking off a lanyard is **pure freedom**.", "Seeing a school bus and feeling a strange sense of camaraderie.", "The teacher-voice has been switched off. Regular human mode engaged.", "Hitting every single red light on the way home. The universe is testing me.", "My brain is a browser with **50 tabs open**, and I'm trying to close them all.", "The silence in the car is so loud after a day of noise.", "Debating if I have the energy to cook or if it's a takeout night.", "Fantasizing about the moment my head hits the pillow.", "The car in front of me has a 'Proud Parent' bumper sticker. I feel that.", "Forgetting what I was thinking about mid-thought. Brain capacity reached.", "The transition from 'Global Person, Educator' to just 'Global Person' is complete.", "The radio is playing a song from my high school days. A strange time warp.", "The car is officially a **scream-therapy chamber** for today's commute.", "Mentally unsubscribing from the day's events. **Please stop sending notifications**.", "Just saw a student at the grocery store. We made awkward eye contact and **pretended it didn't happen**.", "My brain is playing a highlight reel of the day's **most confusing questions**.", "A sticky note is stuck to my shoe. It just says 'pigeons'.", "The check engine light seems to be mocking my own internal state.", "Singing along to a song at the top of my lungs and getting a weird look from the next car.", "The first sip of a post-school beverage is a **religious experience**.", "My pockets are full of confiscated items: a broken toy, a weird rock, and three paperclips.", "Did I accomplish anything today? **The jury is out**.", "A deep, soul-cleansing sigh just escaped.", "That weird feeling of being in public but still in 'teacher mode'.", "The sun is hitting my face. I'd forgotten what it felt like.", "Just remembered a hilarious wrong answer a student gave. Giggling alone in the car.", "The steering wheel has absorbed all my stress for the day.", "Realizing I have to go to the post office. The day's trials **are not over**.", "There's a mysterious stain on my pants. I have no idea where it came from.", "Is it too early for pajamas? **No. The answer is no**.", "The world outside of school seems so... calm.", "I could just keep driving. Just drive straight to the coast.",
];

const homeAndEveningMessages = [
    "Finally home. First stop: **the toilet**.", "Correcting a mountain of homework. The red pen is **thirsty**.", "Making dinner while thinking about that one student's **weird question**.", "Zoning out in front of the TV. Don't ask me what's on.", "Actually, I have to go back to the store. **Forgot the milk**.", "Preparing tomorrow's lesson plan. The cycle **never ends!**", "Changing out of 'teacher clothes' and into '**sentient blanket**' mode.", "The pet is acting like I've been gone for **three years**.", "The eternal question: 'What's for dinner?'", "Ignoring the pile of laundry in the corner. It's a **feature** now.", "Finding a surprisingly sweet note from a student in a pile of papers.", "Fell down a YouTube rabbit hole about **historical bread-making**.", "Collapsing on the couch for a 'five-minute rest'. **Woke up an hour later**.", "Got a burst of energy and actually cleaned the kitchen.", "Answering parent emails. Trying to sound **cheerful and professional**.", "Reading a book that has absolutely **nothing** to do with my subject.", "Realized I have a staff meeting first thing tomorrow. **Ugh**.", "The simple joy of putting my feet up.", "Trying to help my own kid with their homework. The **irony** is not lost on me.", "Just remembered a bill is due. There goes the fun money.", "Unpacking the 'teacher bag'. It's a vortex of papers, pens, and lost dreams.", "That moment of pure joy when a planned event gets cancelled.", "Watering the plants. They are the only things that don't talk back.", "Ordering pizza. Because **I deserve it**.", "Inputting grades into the soul-crushing online portal.", "The 'teacher hangover' is real. It's just exhaustion, not alcohol.", "Found a crayon in my pocket. A souvenir from the day.", "Explaining to my partner why I'm so tired when I 'just sit all day'.", "Finally sitting down. I may never get up again.", "Watching a mindless reality show. **Brain detox** in progress.", "The kitchen table has disappeared under a **tsunami of ungraded papers**.", "I've entered my 'goblin mode' attire. **Comfort is paramount**.", "My search history is now a bizarre mix of 'Pythagorean theorem' and 'easy crockpot recipes'.", "Explaining to a non-teacher friend why I'm so tired. They **don't get it**.", "Found a piece of glitter on my face. A student's parting gift.", "The sheer bliss of taking off a pair of uncomfortable shoes.", "Making a complicated dinner from scratch. **This was a mistake**.", "The pet is now asleep on a pile of important papers. They shall not be moved.", "The TV is on, but I've been staring at a wall for ten minutes.", "That moment I realize I have no clean coffee mugs for tomorrow. A **future problem**.", "Just found a student's lost tooth in a plastic baggie in my purse.", "I have three baskets of laundry to fold. I will instead **build a fort**.", "The dishwasher is clean. A small, but **monumental** victory.", "Debating if I have the social energy to answer a phone call. **I do not**.", "Reading student work that is so creative it makes the whole day worth it.", "Or reading student work that makes me question the future of humanity.", "A cup of tea and a quiet room. **The ultimate luxury**.", "The fridge is empty. It's a 'get creative with condiments' kind of night.", "Fell asleep with a pen in my hand. Woke up with ink on my face.", "Planning a weekend adventure to distract from the impending Monday.",
];

const lateNightMessages = [
    "Should be sleeping. Instead, **scrolling through memes**.", "The house is quiet. **Too quiet**. It's suspicious.", "One last check of school emails. **Regretting it immediately**.", "Falling asleep on the couch with the remote in my hand.", "Setting **five different alarms** for the morning, just in case.", "A brilliant lesson idea just struck at midnight. Now where's a notebook?", "The '**just one more episode**' lie I tell myself every night.", "The Sunday Scaries are kicking in, even on a Tuesday.", "Calculating the exact hours of sleep I'll get if I go to bed **right now**.", "Got up for a glass of water and forgot why I was in the kitchen.", "Making a mental to-do list for tomorrow is **not helping me relax**.", "Doomscrolling the news. A **terrible** pre-sleep activity.", "The sweet, sweet relief of finally climbing into bed.", "Thinking about that one student I'm worried about.", "Hearing a weird noise and deciding it's probably **not a monster**.", "Laying in the dark, re-thinking a conversation from **three years ago**.", "Did I leave the oven on? No. But I'll **check anyway**.", "My brain won't shut up. It's still in **'teacher mode'**.", "Finally drifting off... and then remembering something I forgot to do.", "Dreaming that I'm at school, but I've **forgotten my pants**.", "This is 'revenge bedtime procrastination'. I'm getting my free time back, even if it costs me my sanity tomorrow.", "Closing the 50 browser tabs I opened for 'lesson research'.", "The silence of the house is finally louder than the ringing in my ears.", "That sleepy feeling when you know you've found the **perfect** cold spot on the pillow.", "Is the door locked? Yes. Am I going to get up and check? Also yes.", "My bed has never felt so comfortable. **Peak coziness achieved**.", "Just finished a book. The post-book hangover is beginning.", "Resisting the urge to plan a whole new unit at 1 AM.", "The cat has decided my face is the perfect place to sleep.", "The last thought before sleep: **I hope the coffee pot is set for tomorrow**.", "My brain has chosen 2 AM to have a **philosophical breakthrough** about classroom management.", "Laying here so tired I can't sleep. It's the **ultimate paradox**.", "Just remembered a student's name I forgot today. My brain can rest now.", "The refrigerator is humming a **song of judgment** for my late-night snack.", "The moon is judging my life choices through the window.", "Just added 17 things to an online shopping cart and then closed the tab. **Self-control**.", "Suddenly sitting bolt upright. **I forgot to grade the quizzes**.", "The house settled. Or it was a ghost. Either way, I'm not investigating.", "My dreams will probably be about grading papers. **Again**.", "Writing a brilliant email and then deleting it. **Future Me can handle it**.", "The shadows in my room are starting to look like my principal.", "My brain is trying to solve a math problem from 3rd period. **Let it go**.", "I can hear the trash truck outside. It's later than I thought.", "Feeling a strange sense of peace. The day is **truly over**.", "My feet are finally not hurting. A miracle.", "Imagining a world where I get 8 hours of sleep. It's a beautiful world.", "The glow from my phone screen is the only light in the universe.", "Okay, for real this time. Goodnight.", "Wait, did I respond to that one parent...?", "Just one last YouTube video. **Famous last words**.",
];

// --- APPLICATION LOGIC ---

document.addEventListener('DOMContentLoaded', () => {
    const statusElement = document.getElementById('current-status');
    const timerSpan = document.querySelector('#timer-display span');
    const dailyMessageElement = document.getElementById('daily-message');
    let lastMessage = '';

    function parseMarkdown(text) {
        const boldRegex = /\*\*(.+?)\*\*/g;
        return text.replace(boldRegex, '<strong>$1</strong>');
    }

    function setDailyMessage() {
        const today = new Date().getDay();
        const parsedDailyMessage = parseMarkdown(dailyMessages[today]);
        dailyMessageElement.innerHTML = parsedDailyMessage;
    }

    function getCurrentMessagePool() {
        const currentHour = new Date().getHours();
        if (currentHour < SCHOOL_START_HOUR) return earlyMorningMessages;
        if (currentHour < SCHOOL_END_HOUR) return schoolMessages;
        if (currentHour < HOME_ARRIVAL_HOUR) return drivingHomeMessages;
        if (currentHour < 22) return homeAndEveningMessages;
        return lateNightMessages;
    }

    function getRandomMessage(pool) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        return pool[randomIndex];
    }

    function updateStatus() {
        const messagePool = getCurrentMessagePool();
        let newMessage;

        do {
            newMessage = getRandomMessage(messagePool);
        } while (newMessage === lastMessage && messagePool.length > 1);

        lastMessage = newMessage;
        const formattedMessage = parseMarkdown(newMessage);

        statusElement.classList.add('fade-out');
        setTimeout(() => {
            statusElement.innerHTML = `<p>${formattedMessage}</p>`;
            statusElement.classList.remove('fade-out');
        }, 500);
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

    setDailyMessage();
    updateStatus();
    startCountdown();
    setInterval(updateStatus, UPDATE_INTERVAL_MS);
});