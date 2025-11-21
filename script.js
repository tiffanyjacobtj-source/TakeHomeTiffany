function showResults() {
    resultsScreen.classList.remove("hidden");

    const finalPoints = score * 10;
    finalScoreEl.textContent = `Your Score: ${finalPoints}/100`;

    // Score-based messages
    let message = "";

    if (finalPoints < 50) {
        message = 
        "You scored below 50. Here are some tips:❗<br><br>" +
        "• Double-check information using multiple sources<br>" +
        "• Avoid trusting screenshots or forwarded messages<br>" +
        "• Look for signs of AI-generated or edited content<br>" +
        "• Verify claims with fact-checking websites like Snopes or AFP Fact Check";
    } 
    else if (finalPoints < 70) {
        message =
        "You're doing okay, but there is room for improvement! 📘<br><br>" +
        "Try to:<br>" +
        "• Pause before sharing posts<br>" +
        "• Watch for emotional or sensational wording<br>" +
        "• Compare information from reputable news outlets";
    } 
    else {
        message =
        "🎉 Great job! You're skilled at spotting misinformation!<br><br>" +
        "Keep staying critical and always verify what you see online.";
    }

    timeTakenEl.innerHTML = message + "<br><br>" +
        (timed ? `⏳ Total Time: ${totalTime} seconds` : "");
}
