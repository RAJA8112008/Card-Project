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
        options: [ 
            "Computer Style Sheet",
            "Cascading Style Sheet",
            "Creative Style System",
            "Colorful Style Sheet",
        ],
        correct: 1, 
    },
    
    {
        question: "What is the correct way to declare a variable in JavaScript?",
        option: [
            "var x = 10;",
            "variable x = 10;",
            " x = 10;",
            "let x == 10;",
        ],
        correct: 0,
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        option: [
            "string",
            "boolean",
            "float",
            "undefined",
        ],
        correct: 2,
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
