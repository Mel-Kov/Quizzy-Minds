//Selecting important DOM elements
const questionContainer = document.getElementById("question-container");
const nextBtn = document.getElementById("next-btn");
const answersGrid = document.getElementById("answers-grid");


// All the quiz questions, answers, facts and correct flags //
const questions = [
    {
        question:  "What country has the most time zones including overseas territories?",
        answers : [
            {answer: "France", correct: true},
            {answer: "Monaco", correct: false},
            {answer: "Japan", correct: false},
            {answer: "Russia", correct: false},
        ],
        fact: "France has 12 time zones due to its overseas territories!"
    },
     {
         question:  "Which is the only country that covers an entire continent?",
         answers : [
             {answer: "Russia", correct: false},
             {answer: "Australia", correct: true},
             {answer: "USA", correct: false},
             {answer: "Mexico", correct: false},
             ],
         fact: "Australia is the only country that's also a continent."
        },
    {
        question: "Which city is located on two continents?",
        answers : [
            {answer: "Istanbul", correct: true},
            {answer: "Berlin", correct: false},
            {answer: "Moscow", correct: false},
            {answer: "Minsk", correct: false},
            ],
        fact: "Istanbul straddles both Europe and Asia!"
    },
    {
        question: "What is the smallest country in the world?",
        answers : [
            {answer: "Luxembourg", correct: false},
            {answer: "Monaco", correct: false},
            {answer: "Vietnam", correct: false},
            {answer: "Vatican City", correct: true},
            ],
        fact: "It's only about 0.2 square miles—smaller than a golf course!"
    },
     {
        question: "Which country has no rivers?",
        answers : [
            {answer: "Saudi Arabia", correct: true},
            {answer: "Indonesia", correct: false},
            {answer: "Pakistan", correct: false},
            {answer: "Moldova", correct: false},
            ],
        fact: "Despite its size, Saudi Arabia has zero permanent rivers."
    },
     {
        question: "What is the most spoken language in the world by native speakers?",
        answers : [
            {answer: "Arabic", correct: false},
            {answer: "English", correct: false},
            {answer: "Mandarin", correct: true},
            {answer: "German", correct: false},
            ],
        fact: "Over 900 million people speak it natively!"
    },
     {
        question: "Which country has the most official languages?",
        answers : [
            {answer: "United States", correct: false},
            {answer: "Canada", correct: false},
            {answer: "Belgium", correct: false},
            {answer: "South Africa", correct: true},
            ],
        fact: "South Africans often grow up speaking more than one language fluently."
    },
    {
        question: "Where do people wear wooden shoes as part of traditional culture?",
        answers : [
            {answer: "Brazil", correct: false},
            {answer: "Japan", correct: false},
            {answer: "China", correct: false},
            {answer: "Netherlands", correct: true},
            ],
        fact: "The famous wooden clogs are called “klompen.”"
    },
    {
        question: " What natural wonder is visible from space?",
        answers : [
            {answer: "The Great Barrier Reef", correct: true},
            {answer: "Harbor of Rio de Janeiro", correct: false},
            {answer: "Mount Everest", correct: false},
            {answer: "Grand Canyon", correct: false},
            ],
        fact: "It's the largest living structure on Earth."
    },
     {
        question: "What country has a flag that's not square or rectangular?",
        answers : [
            {answer: "Thailand", correct: false},
            {answer: "Indonesia", correct: false},
            {answer: "Nepal", correct: true},
            {answer: "Iraq", correct: false},
            ],
        fact: "Nepal's flag is two triangles stacked vertically!"
    },
     {
        question: "What is the tallest waterfall in the world?",
        answers : [
            {answer: "Angel Falls, Venezuela", correct: true},
            {answer: "Victoria Falls, Zambia", correct: false},
            {answer: "Niagara Falls, Canada", correct: false},
            {answer: "Wall of Tears, Hawaii", correct: false},
            ],
        fact: "It's nearly 1 kilometer tall—979 meters (3,212 feet)!"
    },
     {
        question: "In which country can you find more sheep than people?",
        answers : [
            {answer: "New Zealand", correct: true},
            {answer: "Croatia", correct: false},
            {answer: "Bosnia and Hercegovina", correct: false},
            {answer: "Italy", correct: false},
            ],
        fact: "There are about 5 sheep for every person!"
    },
     {
        question: "What country is home to the world's largest pyramid?",
        answers : [
            {answer: "Egypt", correct: false},
            {answer: "Tunisia", correct: false},
            {answer: "Mexico", correct: true},
            {answer: "Chile", correct: false},
            ],
        fact: "It's larger in volume than the pyramids in Egypt."
    },
     {
        question: "Which country banned chewing gum to keep its streets clean?",
        answers : [
            {answer: "Sweden", correct: false},
            {answer: "Japan", correct: false},
            {answer: "Denmark", correct: false},
            {answer: "Singapore", correct: true},
            ],
        fact: "Chewing gum is only allowed for medical use!"
    },
     {
        question: " What country has a festival where people throw tomatoes at each other?",
        answers : [
            {answer: "Spain", correct: true},
            {answer: "Thailand", correct: false},
            {answer: "Netherlands", correct: false},
            {answer: "England", correct: false},
            ],
        fact: "Over 100 tons of tomatoes are thrown each year!"
    },
     ]

let currentQuestionIndex = 0; //Keeps track of current question number
let finalScore = 0; // Keeps track of user's correct answers
let questionNum = 1; // For progress display
let shuffledQuestions = []; // Holds all the shuffled quiz questions

// Displays questions and its answers 
function showQuestion(questionObj) {
    const progress = document.getElementById("progress-num");
    //Show the question
    questionContainer.textContent = questionObj.question;
    questionContainer.setAttribute("aria-label", `${questionNum} Question: ${questionObj.question}`);
    // Update progress tracker
    progress.textContent = `${currentQuestionIndex + 1}/${shuffledQuestions.length}`;

    // Restart fade-in animation
    questionContainer.classList.remove("fade-in");
    void questionContainer.offsetWidth;
    questionContainer.classList.add("fade-in");
    //Clear all the old buttons
    // const answersGrid = document.getElementById("answers-grid");
    answersGrid.innerHTML = "";
    //Shuffle current question answers
    const shuffledAnswers = shuffleArray([...questionObj.answers]);

    //Create button for each answer
    shuffledAnswers.forEach((answerObj, index) => {
        const btn = document.createElement("button");
        btn.classList.add("answer", "fade-in");
        btn.textContent = `${String.fromCharCode(65 + index)}. ${answerObj.answer}`; //A.,B.,C.
        btn.dataset.correct = answerObj.correct; //Store answer if correct
        btn.type = "button";
        btn.setAttribute("aria-label", `Answer choice ${String.fromCharCode(65 + index)}: ${answerObj.answer}`);
        btn.addEventListener("click", selectAnswer); //Handle answer click
        answersGrid.appendChild(btn);
    });
    //Hide next question button until user answers
    nextBtn.style.display = "none";
}

//Called when user clicks on answer
function selectAnswer(e) {
    const selectedButton = e.currentTarget;
    const isCorrect = selectedButton.dataset.correct === "true";
    // Get all current answer buttons
    const allButtons = document.querySelectorAll("#answers-grid .answer");

    //If correct increement score
    if (isCorrect) {
        finalScore++;
        selectedButton.classList.add("correct-answer");
    } else {
        selectedButton.classList.add("wrong-answer");
        //Reveal the correct answer with short delay
        allButtons.forEach(btn => {
            if (btn.dataset.correct === "true") {
                setTimeout(() => btn.classList.add("correct-answer"), 300);
            }
        });
    }
    //Disable all buttons after answering   
    allButtons.forEach(btn => btn.disabled = true);
    //Show fact and next question button after a delay
    setTimeout(() => {
        questionContainer.textContent = shuffledQuestions[currentQuestionIndex].fact;
        questionContainer.style.backgroundColor = "rgba(255, 0, 176, 0.4)";
        nextBtn.style.display = "block";
    }, 300);
}

//Go to next question or finish the quiz
function nextQuestion() {
    currentQuestionIndex++;
    questionNum++
    if (currentQuestionIndex < shuffledQuestions.length) {
        //Show next question
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        //Reset the background
        questionContainer.style.backgroundColor = "var(--question-container-color)";
    } else {
        //All questions done
        endQuiz();
    }
}

//Show final score and reset button
function endQuiz() {
    //Hide answer grid
    document.getElementById("answers-grid").style.display = "none";
    //Show restart button with a delay
    setTimeout(() => {
        nextBtn.style.display = "block";
    }, 400);
    nextBtn.textContent = "Restart Quiz";
    nextBtn.setAttribute("aria-label", "Restart quiz button");

    //Remove next question event
    nextBtn.removeEventListener("click", nextQuestion);
    nextBtn.addEventListener("click", restartQuiz);

    // Display a message according to score
    const message = finalScore === shuffledQuestions.length
        ? `Congratulations!! Your final score is: ${finalScore}/${shuffledQuestions.length}.`
        : `Your final score is: ${finalScore}/${shuffledQuestions.length}.`;
    //Show final message
    questionContainer.textContent = message;
    questionContainer.classList.remove("fade-in");
    void questionContainer.offsetWidth;
    questionContainer.classList.add("fade-in");
}

//Restarts the quiz afterit ends
function restartQuiz() {
    nextBtn.setAttribute("aria-label", "Next question button");

    currentQuestionIndex = 0;
    finalScore = 0;

    //Retart UI
    answersGrid.style.display = "grid";
    answersGrid.innerHTML = "";
    questionContainer.innerHTML = "";
    nextBtn.style.display = "none";
    nextBtn.textContent = "Next";

    //Change back to next button event
    nextBtn.removeEventListener("click", restartQuiz);
    nextBtn.addEventListener("click", nextQuestion);

    shuffledQuestions = shuffleArray([...questions]);
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

//Utility to shuffle arrays randomly
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

//Initialize quiz after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-btn");
    const introScreen = document.getElementById("intro-screen");
    const mainContent = document.querySelector("main");
    const backGround = document.getElementById("background-elements");
    //Start button logic
    startButton.addEventListener("click", () => {
        //Fade out intro screen
        introScreen.style.opacity = "0";
        introScreen.style.transition = "opacity 0.5s ease";

        //Hide intro screen, show quiz
        setTimeout(() => {
            introScreen.style.display = "none";
            mainContent.style.display = "flex";
            mainContent.classList.add("visible");
            backGround.style.display = "block";

            //Shuffle questions and beggin the quiz
            shuffledQuestions = shuffleArray([...questions]);
            showQuestion(shuffledQuestions[currentQuestionIndex]);
        }, 500);
    });
});

//Go to next question
nextBtn.addEventListener("click", nextQuestion);
    