
(function(){
  function buildQuiz(){
  // variable to store the HTML output
  const output = [];

  // for each question...
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {

      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for(letter in currentQuestion.answers){

        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
      );
    }
  );

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');

}

function showResults(){
  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');

  // keep track of user's answers
  let numCorrect = 0;

  // for each question...
  myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if(userAnswer === currentQuestion.correctAnswer){
      // add to the number of correct answers
      numCorrect++;

      // color the answers green
      answerContainers[questionNumber].style.color = 'lightgreen';
    }
    // if answer is wrong or blank
    else{
      // color the answers red
      answerContainers[questionNumber].style.color = 'red';
    }
  });

  // show number of correct answers out of total

  if (numCorrect === 3) {
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}. Wow! Very nice!`;
  }
  if (numCorrect === 2) {
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}. Not bad!`
  }
  if (numCorrect === 1) {
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}. It's OK. You don't know me yet!`
  } 
   if (numCorrect === 0){
  resultsContainer.innerHTML = `Dang, ${numCorrect} out of ${myQuestions.length}. We should really get to know one another!`
   }
  
}

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const myQuestions = [
  {
    question: "In college, I wrote a one-man show called Let's Find C.J.! where I talked about my love of Dragonball Z.",
    answers: {
      a: "True",
      b: "False"
    },
    correctAnswer: "a"
  },
  {
    question: "I once dressed as Vegeta, one of the main characters, for Halloween.",
    answers: {
      a: "True",
      b: "False"
    },
    correctAnswer: "b"
  },
  {
    question: "My favorite character is _______",
    answers: {
      a: "Goku",
      b: "Vegeta",
      c: "Gohan",
      d: "Bulma",
      e: "Piccolo",
      f: "I can't pick a favorite! I love them all!"
    },
    correctAnswer: "c"
  }
];


// display quiz right away
buildQuiz();

// on submit, show results
submitButton.addEventListener('click', showResults);
})();
