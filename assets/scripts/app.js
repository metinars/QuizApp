const addContent = document.querySelector('.content');
const startQuizButton = document.querySelector('.btn-start');
const resultQuizButton = document.querySelector('.btn-result');
const backdrop = document.getElementsByClassName('text-content');
const questions = document.querySelector('.questions');
const p = document.querySelector('.question-text p');
const answerButton = document.querySelectorAll('.btn-answer');
const nextButton = document.querySelector('.next-button');
const checkButton = document.querySelector('.check-button');
const nextButtonRow = document.querySelector('.next-btn')
const quizesResults = document.querySelector('.quizes-results');
var qstID = questions.getAttribute('data-id');
var globalButtonValue = 0;
var scoreTable = [];
let score = 0;

const visibleContentBackdrop = () => {
  addContent.classList.add('invisible');
};

const visibleQuestions = () => {
  questions.classList.remove('invisible');
};

const visibleResult = () => {
  visibleContentBackdrop();
  questions.classList.add('invisible');
  quizesResults.classList.remove('invisible');
  quizesResultsScreen();
}

const renderNewQuestionElement = () => {
  visibleContentBackdrop();
  visibleQuestions();

  for (let i in items) {
    if (items[i].id == questions.getAttribute('data-id')) {
      p.innerHTML = `${items[i].question}`;
      for (let j in items[i].otherAnswers) {
        answerButton[j].innerHTML = `${items[i].otherAnswers[j]}`;
        answerButton[j].setAttribute('value', items[i].otherAnswers[j])
      }
    }
    nextButtonRow.classList.add('invisible');
  }
};

const nextQuestionBtn = () => {
  reset();
  if (qstID < items.length) {
    qstID++;
    questions.setAttribute('data-id', qstID);
    renderNewQuestionElement();


  } else if (qstID > items.length - 1) {
    visibleResult();
  };
};

const answerCheckVisible = () => {
  nextButtonRow.classList.remove('invisible');
};

answerButton.forEach(el => {
  el.addEventListener('click', () => {
    reset();
    buttonvalue(el.textContent);
    el.classList.toggle('active');
  });
});

const buttonvalue = (val) => {
  globalButtonValue = val;
};

const answerCheckButtonHover = () => {
  reset();
  answerCheckVisible();

  answerButton.forEach(element => {
    if (element.textContent == items[qstID - 1].answer) {
      element.classList.add('true-btn')
    } else if (element.textContent != items[qstID - 1].answer) {
      element.classList.add('false-btn')
    };
  });
};

function writeToAnswer(answer, result) {
  const logScore = {
    answerID: answer,
    answersResult: result
  };
  scoreTable.push(logScore);
};

const answerCheck = () => {
  answerCheckButtonHover();
  if (globalButtonValue == items[qstID - 1].answer) {
    score += items[qstID - 1].score;
    writeToAnswer(qstID, "Doğru")
  } else {
    writeToAnswer(qstID, "Yanlış")
  };
};

const quizesResultsScreen = () => {
  let ul = document.querySelector('.result');
  let resultScore = document.querySelector('.result-score h3');

  for (const result in scoreTable) {

    let li = `<div class="answer-result">
    <div class="row">
      <div class="col-lg-6 answer">
        <p>Soru ${scoreTable[result].answerID}</p>
      </div>
      <div class="col-lg-6 result">
        <p>${scoreTable[result].answersResult}</p>
      </div>
      <hr />
    </div>
  </div>`;

    ul.insertAdjacentHTML("beforebegin", li);
  }
  resultScore.innerHTML = `Skor: ${score}`;

}

const reset = () => {
  for (let i in items) {
    for (let j in items[i].otherAnswers) {
      answerButton[j].classList.remove('true-btn');
      answerButton[j].classList.remove('false-btn');
      answerButton[j].classList.remove('active');
    }
  }
};


startQuizButton.addEventListener('click', renderNewQuestionElement);
checkButton.addEventListener('click', answerCheck);
nextButton.addEventListener('click', nextQuestionBtn);
resultQuizButton.addEventListener('click', visibleResult);