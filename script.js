const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: 2,
    },
    {
        question: "Which programming language is used in web browsers?",
        options: ["Python", "JavaScript", "C++", "Java"],
        answer: 1,
    },
    {
        question: "Which HTML element is used for the largest heading?",
        options: ["<h1>", "<h6>", "<header>", "<head>"],
        answer: 0,
    },
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    optionsElement.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => selectOption(index);
        optionsElement.appendChild(button);
    });
}

let selectedOption = null;

function selectOption(index) {
    selectedOption = index;
    Array.from(optionsElement.children).forEach((button, idx) => {
        button.style.backgroundColor = idx === index ? "#d1d1d1" : "#f1f1f1";
    });
}

submitBtn.addEventListener("click", () => {
    if (selectedOption === null) {
        alert("Please select an answer!");
        return;
    }

    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        score++;
    }

    submitBtn.style.display = "none";
    nextBtn.style.display = "inline-block";

    Array.from(optionsElement.children).forEach((button, idx) => {
        button.style.backgroundColor =
            idx === correctAnswer ? "#4caf50" : idx === selectedOption ? "#f44336" : "#f1f1f1";
    });
});

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        selectedOption = null;
        submitBtn.style.display = "inline-block";
        nextBtn.style.display = "none";
    } else {
        showScore();
    }
});

function showScore() {
    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    submitBtn.style.display = "none";
    nextBtn.style.display = "none";
    scoreElement.style.display = "block";
    scoreElement.textContent = `Your Score: ${score}/${questions.length}`;
}

loadQuestion();
