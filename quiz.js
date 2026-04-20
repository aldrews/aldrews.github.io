function gradeQuiz() {

    let score = 0;
    let total = 5;

    let resultsHTML = "";

    // ANSWER KEY
    let answers = {
        q1: "surfing",      // fill-in-the-blank answer
        q2: "b",
        q3: "b",
        q4: "b",
        q5: ["a","b","d"]     // multi-select answers
    };

    // QUESTION 1 (TEXT INPUT)
    let q1 = document.getElementById("q1").value.trim();

    if (q1.toLowerCase() === answers.q1.toLowerCase()) {
        score++;
        resultsHTML += `<p class="correct">Q1: Correct</p>`;
    } else {
        resultsHTML += `<p class="incorrect">Q1: Incorrect (Answer: ${answers.q1})</p>`;
    }

    // QUESTIONS 2–4
    for (let i = 2; i <= 4; i++) {

        let selected = document.querySelector(`input[name="q${i}"]:checked`);

        if (selected && selected.value === answers[`q${i}`]) {
            score++;
            resultsHTML += `<p class="correct">Q${i}: Correct</p>`;
        } else {
            resultsHTML += `<p class="incorrect">Q${i}: Incorrect (Answer: ${answers[`q${i}`]})</p>`;
        }
    }

    // QUESTION 5 (CHECKBOXES)
    let selectedBoxes = document.querySelectorAll('input[name="q5"]:checked');

    let selectedValues = Array.from(selectedBoxes).map(cb => cb.value);

    let correctAnswers = answers.q5;

    let isCorrect =
        selectedValues.length === correctAnswers.length &&
        selectedValues.every(val => correctAnswers.includes(val));

    if (isCorrect) {
        score++;
        resultsHTML += `<p class="correct">Q5: Correct</p>`;
    } else {
        resultsHTML += `<p class="incorrect">Q5: Incorrect (Answer: ${correctAnswers.join(", ")})</p>`;
    }

    // PASS / FAIL RESULT
    let pass = score >= 3 ? "PASS" : "FAIL";
    let color = score >= 3 ? "green" : "red";

    // DISPLAY RESULTS
    document.getElementById("results").innerHTML = `
        <h2 style="color:${color}">${pass}</h2>
        <p><strong>Score:</strong> ${score} / ${total}</p>
        ${resultsHTML}
    `;
}

// RESET QUIZ FUNCTION
function resetQuiz() {

    document.getElementById("quizForm").reset();
    document.getElementById("results").innerHTML = "";
}