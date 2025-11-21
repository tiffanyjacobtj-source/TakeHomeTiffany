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

function loadQuestion() {
    document.getElementById("question").textContent = questions[index].q;
    document.getElementById("feedback").textContent = "";
    document.getElementById("score").textContent = `Score: ${score}/${questions.length}`;
}

function answer(userAnswer) {
    // disable buttons temporarily (optional)
    disableButtons(true);

    if (userAnswer === questions[index].answer) {
        document.getElementById("feedback").textContent = "Correct!";
        score++;
    } else {
        document.getElementById("feedback").textContent = "Incorrect!";
    }

    index++;

    if (index < questions.length) {
        setTimeout(() => {
            disableButtons(false);
            loadQuestion();
        }, 800);
    } else {
        document.getElementById("question").textContent = "Quiz Completed!";
        document.getElementById("feedback").textContent = `Final Score: ${score}/${questions.length}`;
        document.getElementById("score").textContent = "";
    }
}

function disableButtons(state) {
    document.getElementById("trueBtn").disabled = state;
    document.getElementById("falseBtn").disabled = state;
}

loadQuestion();
