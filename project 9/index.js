

const quizData=[
    {
        question:"what does HTML stands for?",
        option :[
            "Hypertext Markup Language",
            "Hyper Transfer Markup Language",
            "Hypertext Machine Language",
            "Hyperlink and Text Markup Language",
        ],
        correct: 0,
    },
    {
        question:"what does HTML stands for?",
        option :[
            "Hypertext Markup Language",
            "Hyper Transfer Markup Language",
            "Hypertext Machine Language",
            "Hyperlink and Text Markup Language",
        ],
        correct: 0,
    },
    {
        question:"what does HTML stands for?",
        option :[
            "Hypertext Markup Language",
            "Hyper Transfer Markup Language",
            "Hypertext Machine Language",
            "Hyperlink and Text Markup Language",
        ],
        correct: 0,
    },
    {
        question:"what does HTML stands for?",
        option :[
            "Hypertext Markup Language",
            "Hyper Transfer Markup Language",
            "Hypertext Machine Language",
            "Hyperlink and Text Markup Language",
        ],
        correct: 0,
    },
];

const  answerElm =document.querySelectorAll('.answer');
const [questionElm, option_1, option_2, option_3,option_4]= document.querySelectorAll("#question, .option_1, .option_2, .option_3, .option_4");
const submitBtn = document.querySelector("#submit");

const currentQuiz =0;
const score =0;
const loadQuiz  = ()=>{
    const {question, options}=quizData[currentQuiz];
    questionElm.innerHTML=question;
};
loadQuiz();

