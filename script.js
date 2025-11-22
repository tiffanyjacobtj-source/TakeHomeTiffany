// Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const questionEl = document.getElementById("question");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const progressBar = document.getElementById("progress");
const finalScoreEl = document.getElementById("final-score");
const timeTakenEl = document.getElementById("time-taken");
const timerEl = document.getElementById("timer");
const timedModeCheckbox = document.getElementById("timed-mode");
const answerButtons = document.querySelectorAll(".answer-btn");

// Quiz Data
const questions = [
  { q: "A forwarded WhatsApp message is always reliable.", a: false },
  { q: "A glitchy video (e.g., snow in Bali) can often be edited or AI-generated.", a: true },
  { q: "Videos on TikTok are always fact-checked.", a: false },
  { q: "You should always cross-check news from multiple sources.", a: true },
  { q: "A viral screenshot of a celebrity apology is always real.", a: false },
  { q: "YouTube thumbnails can be misleading or edited.", a: true },
  { q: "If many people share a post, it must be true.", a: false },
  { q: "AI-generated news clips can look real at first glance.", a: true },
  { q: "Anything sent by a family member on WhatsApp is guaranteed true.", a: false },
  { q: "Fact-checking before sharing helps reduce misinformation.", a: true }
];

let score = 0;
let index = 0;
let timed = false;
let timer;
let totalTime = 0;

// Start Quiz
startBtn.addEventListener("click", () => {
  timed = timedModeCheckbox.checked;
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  score = 0;
  index = 0;
  totalTime = 0;

  loadQuestion();

  if (timed) startTimer();
});

// Restart Quiz
restartBtn.addEventListener("click", () => {
  resultsScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  clearInterval(timer);
  timerEl.classList.add("hidden");
});

// Load Question
function loadQuestion() {
  const q = questions[index];
  questionEl.textContent = q.q;
  feedbackEl.textContent = "";
  scoreEl.textContent = `Score: ${score}/${questions.length}`;
  progressBar.style.width = ((index / questions.length) * 100) + "%";
  if (timed) timerEl.textContent = 60;
}

// Handle Answer
function answer(choice) {
  const correct = questions[index].a;
  if (choice === correct) {
    score++;
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
  } else {
    feedbackEl.textContent = "Incorrect!";
    feedbackEl.style.color = "red";
  }

  index++;

  if (index < questions.length) {
    setTimeout(loadQuestion, 800);
  } else {
    setTimeout(showResults, 800);
    clearInterval(timer);
  }
}

// Attach click listeners
answerButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const choice = btn.dataset.value === "true";
    answer(choice);
  });
});

// Timer for Timed Mode
function startTimer() {
  timerEl.classList.remove("hidden");
  let timeLeft = 60;

  timer = setInterval(() => {
    timeLeft--;
    totalTime++;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      index++;
      if (index < questions.length) {
        timeLeft = 60;
        loadQuestion();
      } else {
        showResults();
        clearInterval(timer);
      }
    }
  }, 1000);
}

// Show Results
function showResults() {
  quizScreen.classList.add("hidden");
  resultsScreen.classList.remove("hidden");

  const finalPoints = score * 10;
  finalScoreEl.textContent = `Your Score: ${finalPoints}/100`;

  let message = "";
  if (finalPoints < 50) {
    message =
      "You scored below 50. Here are some tips:❗<br><br>" +
      "• Double-check information using multiple sources<br>" +
      "• Avoid trusting screenshots or forwarded messages<br>" +
      "• Look for signs of AI-generated or edited content<br>" +
      "• Verify claims with fact-checking websites like Snopes or AFP Fact Check";
  } else if (finalPoints < 70) {
    message =
      "You're doing okay, but there is room for improvement! 📘<br><br>" +
      "Try to:<br>" +
      "• Pause before sharing posts<br>" +
      "• Watch for emotional or sensational wording<br>" +
      "• Compare information from reputable/reliable news outlets";
  } else {
    message =
      "🎉 Great job! You're skilled at spotting misinformation!<br><br>" +
      "Keep staying critical and always verify what you see online.";
  }

  timeTakenEl.innerHTML = message + "<br><br>" +
    (timed ? `⏳ Total Time: ${totalTime} seconds` : "");
}
