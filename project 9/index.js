const quizData = [
    {
        question: "What does HTML stand for?",
        option: [
            "Hypertext Markup Language",
            "Hyper Transfer Markup Language",
            "Hypertext Machine Language",
            "Hyperlink and Text Markup Language",
        ],
        correct: 0,
    },
    {
        question: "What does CSS stand for?",
        option: [
            "Computer Style Sheet",
            "Cascading Style Sheet",
            "Creative Style System",
            "Colorful Style Sheet",
        ],
        correct: 1,
    },
    {
        question: "What does JS stand for?",
        option: [
            "Java Syntax",
            "Java System",
            "JavaScript",
            "Jumbo Script",
        ],
        correct: 2,
    },
    {
        question: "What does HTTP stand for?",
        option: [
            "HyperText Transfer Protocol",
            "HyperText Transmission Protocol",
            "High Transmission Text Protocol",
            "Hyperlink Transfer Protocol",
        ],
        correct: 0,
    },
];

const answerElm = document.querySelectorAll('.answer');
const questionElm = document.querySelector("#question");
const option_1 = document.querySelector("#option_1");
const option_2 = document.querySelector("#option_2");
const option_3 = document.querySelector("#option_3");
const option_4 = document.querySelector("#option_4");
const submitBtn = document.querySelector("#submit");

let currentQuiz = 0;
let score = 0;

const loadQuiz = () => {
    const { question, option } = quizData[currentQuiz];
    questionElm.innerHTML = question;
    option_1.innerHTML = option[0];
    option_2.innerHTML = option[1];
    option_3.innerHTML = option[2];
    option_4.innerHTML = option[3];
};

const getSelectedOption = () => {
    let answerIndex = -1;
    answerElm.forEach((curOption, index) => {
        if (curOption.checked) {
            answerIndex = index;
        }
    });
    return answerIndex;
};

const deselectAnswers = () => {
    answerElm.forEach(curElem => curElem.checked = false);
};

submitBtn.addEventListener('click', () => {
    const selectedOptionIndex = getSelectedOption();

    if (selectedOptionIndex === -1) {
        alert("Please select an answer before submitting.");
        return;
    }

    if (selectedOptionIndex === quizData[currentQuiz].correct) {
        score++;
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
        deselectAnswers();
        loadQuiz();
    } else {
        document.querySelector(".quiz-section").innerHTML = `<h2>You scored ${score} out of ${quizData.length}!</h2>
        <button onclick="location.reload()">Play Again</button>`;
    }
});

// Load the first question
loadQuiz();
