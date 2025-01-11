

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

let currentQuiz =0;
let score =0;
const loadQuiz  = ()=>{
    const {question, options}=quizData[currentQuiz];
    questionElm.innerHTML=question;
    options.forEach((curOption,index)=> 
    (window[`option_${index + 1}`].innerHTML=curOption)
);
};
loadQuiz();

const getSelectedOption = () =>{
//     let ans_index;
//     answerElm.forEach((curOption,index)=>{
// if(curOption.checked){
//     ans_index= index;
// }
//     });
//     return ans_index;
let answerElement =Array.from(answerElm);
 return answerElement.findIndex((curElem)=>curElem.checked);
};
const deselectedAnswer = ()=>{
   return answerElm.forEach(curElem => curElem.checked= false);
}

submitBtn.addEventListener('click',()=>{
    const selectedOptionIndex = getSelectedOption();
    console.log(selectedOptionIndex);
    currentQuiz ++;
if(currentQuiz<quizData.length){
    deselectedAnswer();
    loadQuiz();
}
});

