/**
 * Example store structure
 */
const store = {
    // 5 or more questions are required
    questions: [
      {
        question: '"There are 106 miles to Chicago, we have a full tank of gas, half a pack of cigarettes, it’s dark, and we’re wearing sunglasses."',
        answers: [
          'Rat Race',
          'The Blues Brothers',
          'Road Trip',
          'Due Date'
        ],
        correctAnswer: 'The Blues Brothers'
      },
      {
        question: '"Are you not entertained?"',
        answers: [
          'Spartacus',
          '300',
          'Gladiator',
          'Ben Hur'
        ],
        correctAnswer: 'Gladiator'
      },
      {
        question: '"I Hope That When The World Comes To An End, I Can Breathe A Sigh Of Relief, Because There Will Be So Much To Look Forward To."',
        answers: [
          'Donnie Darko',
          'The Day After Tomorrow',
          'Arrival',
          'Planet of the Apes'
        ],
        correctAnswer: 'Donnie Darko'
      },
      {
        question: '"Life moves pretty fast. If you don’t stop and look around once in a while, you could miss it."',
        answers: [
          'Dazed and Confused',
          'Fast Times at Ridgemont High',
          'Ferris Bueller\'s Day Off' ,
          'Risky Business'
        ],
        correctAnswer: 'Ferris Bueller\'s Day Off'
      },
      {
        question: '“Ideals are peaceful. History is violent.”',
        answers: [
          'Saving Private Ryan',
          'Apocalypse Now',
          'Hacksaw Ridge',
          'Fury'
        ],
        correctAnswer: 'Fury'
      }
    ],
    answerCorrect: false,
    quizStarted: false,
    questionNumber: 0,
    score: 0
  };
  
  /**
   * 
   * Technical requirements:
   * 
   * Your app should include a render() function, that regenerates the view each time the store is updated. 
   * See your course material and access support for more details.
   *
   * NO additional HTML elements should be added to the index.html file.
   *
   * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
   *
   * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
   * 
   */
  
  /********** TEMPLATE GENERATION FUNCTIONS **********/
  
  // These functions return HTML templates

function generateQuizStart() {
  return `
    <div class="content-container">
      <p>This is a quiz about movie quotes. Click below to begin!</p>
      <button class="js-start-quiz-button">Start Quiz</button>
    </div>`;
}

function generateQuizPage() {
  const answerArray = store.questions[store.questionNumber].answers;
  const question = store.questions[store.questionNumber].question;

  return `
  <div class="content-container">
    <h2>Question ${store.questionNumber + 1}/5</h2>
    <h2>${store.score}/5 questions correct</h2>
    <h3>${store.questionNumber + 1}. What film is this quote from?</h3>
        <form id="quiz-form">
            <h3>${question}</h3>
            <input type="radio" id="answer1" name="answer" value="${answerArray[0]}" required>
            <label for="${answerArray[0]}">${answerArray[0]}</label><br>
            <input type="radio" id="answer2" name="answer" value="${answerArray[1]}" required>
            <label for="${answerArray[1]}">${answerArray[1]}</label><br>
            <input type="radio" id="answer3" name="answer" value="${answerArray[2]}" required>
            <label for="${answerArray[2]}">${answerArray[2]}</label><br>
            <input type="radio" id="answer4" name="answer" value="${answerArray[3]}" required>
            <label for="${answerArray[3]}">${answerArray[3]}</label><br>
            <button type="submit" class="js-answer-submit">Submit</button>
        </form>
  </div>`;
}

function generateCorrectResponseFeedback() {
  let correctAnswer = store.questions[store.questionNumber].correctAnswer;

  return `
  <div class="content-container">
    <h2>Question ${store.questionNumber + 1}/5</h2>
    <h2>${store.score}/5 questions correct</h2>
    <p>${correctAnswer} is correct!</p>
    <button class="js-next-question" type="submit">Next Question</button>
  </div>`
}

function generateIncorrectResponseFeedback() {
  let correctAnswer = store.questions[store.questionNumber].correctAnswer;

  return `
  <div class="content-container">
    <h2>Question ${store.questionNumber + 1}/5</h2>
    <h2>${store.score}/5 questions correct</h2>
    <p>Oops! The correct answer was ${correctAnswer}</p>
    <button class="js-next-question" type="submit">Next Question</button>
  </div>`
}

function generateQuizEndPage() {
  const score = store.score;

  return `
  <div class="content-container">
    <h2>Your Score is ${score}/5</h2>
    <h3>Want to try again? Click the button below to restart the quiz!</h3>
    <button class="js-restart-button" type="reset">Restart Quiz</button>
  </div>`;
}
  
  /********** RENDER FUNCTION(S) **********/
  
  // This function conditionally replaces the contents of the <main> tag based on the state of the store


function renderQuizStart() {
  const quizStartView = generateQuizStart();
  $(".js-quiz-container").html(quizStartView);
}

function renderQuizPage() {
  const quizView = generateQuizPage();
  $(".js-quiz-container").html(quizView);
}

function renderCorrectAnswer(){
  const correctResponseView = generateCorrectResponseFeedback();
  $(".js-quiz-container").html(correctResponseView);
}

function renderInorrectAnswer(){
  const incorrectResponseView = generateIncorrectResponseFeedback();
  $(".js-quiz-container").html(incorrectResponseView);
}

function renderQuizEndPage() {
  const quizEndView = generateQuizEndPage();
  $(".js-quiz-container").html(quizEndView);
}
  /********** EVENT HANDLER FUNCTIONS **********/
  
  // These functions handle events (submit, click, etc)

function handleStartQuiz() {
  //listen for button click on '.js-start-quiz-button'
  $('.js-quiz-container').on('click', `.js-start-quiz-button`, (event) => {
    store.quizStarted = true;
    render();
  });
}

function validateAnswer() {
  let correctAnswer = store.questions[store.questionNumber].correctAnswer;
  store.answerCorrect = false;
  let selectedAnswer = $("input[type='radio']:checked").val();
  if(selectedAnswer === correctAnswer) {
    store.score ++;
    store.answerCorrect = true;
  } 
  
}

function handleAnswerSubmission() {
  $('main').on('submit', '#quiz-form', event => {
    event.preventDefault();
    
    validateAnswer();
    
    if(store.answerCorrect === true){
      renderCorrectAnswer();
    }
    else {
      renderInorrectAnswer();
    }
  })
}

function handleNextQuestion() {
  $('main').on('click', '.js-next-question', event => {
    event.preventDefault();

    if(store.questionNumber < store.questions.length) {
      store.questionNumber ++;
    }

    render();
  })
}

function handleRestartQuiz() {
  $('main').on('click', '.js-restart-button', event => {
    event.preventDefault();

    store.questionNumber = 0; 
    store.quizStarted = false;
    store.score = 0;
    store.answerCorrect = false;

    render();
  })
}

function render() {
  if(store.quizStarted === false){
    renderQuizStart();
  }
  else if(store.quizStarted === true && store.questionNumber < store.questions.length) {
    renderQuizPage();
  }
  else {
    renderQuizEndPage();
  }
}

function handleQuiz() {
  render();
  handleStartQuiz();
  handleAnswerSubmission();
  handleNextQuestion();
  handleRestartQuiz();
}

$(handleQuiz);
