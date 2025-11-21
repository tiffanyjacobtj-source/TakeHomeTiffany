const questions = [
    { q: "A video of snow in Bali must be real because many people reposted it.", answer: false },
    { q: "A screenshot forwarded from WhatsApp is always reliable.", answer: false },
    { q: "AI-generated news clips can look real even if they are fake.", answer: true },
    { q: "Information is trustworthy just because your friend shared it.", answer: false },
    { q: "A viral TikTok rumor about a celebrity passing away can be false.", answer: true },
    { q: "If a video looks glitchy, it might be edited or AI-generated.", answer: true },
    { q: "Wikipedia can be edited by anyone, so it can contain mistakes.", answer: true },
    { q: "If many Instagram pages post the same claim, it must be true.", answer: false },
    { q: "Fake news often spreads faster than real news.", answer: true },
    { q: "You should always check a second source before believing online information.", answer: true }
];

let index = 0;
let score = 0;
let timed = false;
let timerValue = 60;
let timerInterval;
let totalTime = 0;

/* DOM Elements */
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");

const questionEl = document.getElementById("question");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const progressEl = document.getElementById("progress");
const finalScoreEl = document.getElementById("final-score");
const timeTakenEl = document.getElementById("time-taken");

/* Start Quiz */
document.getElementById("start-btn").addEventListener("click", () => {
    timed = document.getElementById("timed-mode").checked;

    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    loadQuestion();
});

/* Load Question */
function loadQuestion() {
    questionEl.textContent = questions[index].q;
    feedbackEl.textContent = "";
    scoreEl.textContent = `Score: ${score * 10}/100`;

    progressEl.style.width = `${(index / questions.length) * 100}%`;

    if (timed) startTimer();
}

/* Timer */
function startTimer() {
    timerValue = 60;
    timerEl.textContent = timerValue;
    timerEl.classList.remove("hidden", "warning");

    timerInterval = setInterval(() => {
        timerValue--;
        totalTime++;

        timerEl.textContent = timerValue;

        if (timerValue <= 10) {
            timerEl.classList.add("warning");
        }
        if (timerValue === 0) {
            clearInterval(timerInterval);
            answer("timeout");
        }
    }, 1000);
}

/* Answer Handling */
function answer(userAnswer) {
    if (timed) clearInterval(timerInterval);

    if (userAnswer === questions[index].answer) {
        feedbackEl.textContent = "Correct!";
        score++;
    } else if (userAnswer === "timeout") {
        feedbackEl.textContent = "Time’s up!";
    } else {
        feedbackEl.textContent = "Incorrect!";
    }

    index++;

    if (index < questions.length) {
        setTimeout(loadQuestion, 800);
    } else {
        quizScreen.classList.add("hidden");
        showResults();
    }
}

/* Results */
function showResults() {
    resultsScreen.classList.remove("hidden");

    finalScoreEl.textContent = `Your Score: ${score * 10}/100`;
    timeTakenEl.textContent = timed ? `Total Time: ${totalTime} seconds` : "";
}

/* Restart */
document.getElementById("restart-btn").addEventListener("click", () => {
    index = 0;
    score = 0;
    totalTime = 0;

    resultsScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
});
