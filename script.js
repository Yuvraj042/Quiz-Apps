const questions = [
    {
        question: "Who invented Java Programming?",
        answers: [
            { text: "Guido van Rossum", correct: false},
            { text: "James Gosling ", correct: true},
            { text: "Dennis Ritchie", correct: false},
            { text: "Bjarne Stroustrup", correct: false},
        ]
    },
    {
        question: "Which one of the following is not a Java feature?",
        answers: [
            { text: "Object-oriented", correct: false},
            { text: "Use of pointers", correct: true},
            { text: "Portable", correct: false},
            { text: "Dynamic and Extensible", correct: false},
        ]
    },
    {
        question: "What is the extension of java code files?",
        answers: [
            { text: ".js", correct: false},
            { text: ".txt", correct: false},
            { text: ".class", correct: false},
            { text: ".java", correct: true},
        ]
    },
    {
        question: "Which environment variable is used to set the java path?",
        answers: [
            { text: "MAVEN_Path", correct: false},
            { text: "JavaPATH", correct: false},
            { text: "JAVA", correct: false},
            { text: "JAVA_HOME", correct: true},
        ]
    },
    {
        question: "Which of the following is not an OOPS concept in Java?",
        answers: [
            { text: "Polymorphism", correct: false},
            { text: "Inheritance", correct: false},
            { text: "Compilation", correct: true},
            { text: "Encapsulation", correct: false},
        ]
    },
    {
        question: "Which of the following is a type of polymorphism in Java Programming?",
        answers: [
            { text: "Multiple polymorphism", correct: false},
            { text: "Compile time polymorphism", correct: true},
            { text: "Multilevel polymorphism", correct: false},
            { text: "Execution time polymorphism", correct: false},
        ]
    },
    {
        question: "Which of these are selection statements in Java?",
        answers: [
            { text: "break", correct: false},
            { text: "continue", correct: false},
            { text: "for()", correct: false},
            { text: "if()", correct: true},
        ]
    },
    {
        question: "Which of these keywords is used to define interfaces in Java?",
        answers: [
            { text: "intf", correct: false},
            { text: "Intf", correct: false},
            { text: "interface", correct: true},
            { text: "Interface", correct: false},
        ]
    },
    {
        question: "Which of the following is a superclass of every class in Java?",
        answers: [
            { text: "ArrayList", correct: false},
            { text: "Abstract class", correct: false},
            { text: "Object class", correct: true},
            { text: "String", correct: false},
        ]
    },
    {
        question: "Which of these keywords are used for the block to be examined for exceptions?",
        answers: [
            { text: "check", correct: false},
            { text: "throw", correct: false},
            { text: "catch", correct: false},
            { text: "try", correct: true},
        ]
    }
];
const questionElement= document.getElementById("question");
const answerButtons= document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex= 0;
let score=0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML= "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion= questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex + 1;
    questionElement.innerHTML= questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button= document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct=answer.correct
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect= selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled= true;
    })
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML= `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="play Again";
    nextButton.style.display="block";
}


function handlenextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handlenextButton();
    }else{
        startQuiz();
    }
});

startQuiz();