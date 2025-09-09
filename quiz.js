let currentDay = 1;
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

function startQuiz(day) {
  currentDay = day;
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  document.getElementById('day-select').style.display = 'none';
  document.getElementById('result-area').style.display = 'none';
  document.getElementById('quiz-area').style.display = '';
  showQuestion();
}

function showQuestion() {
  const questions = quizData[currentDay];
  const q = questions[currentQuestion];
  document.getElementById('question-number').innerText = `${currentQuestion + 1}번 문제 (${currentDay}일차)`;
  document.getElementById('question-text').innerText = q.question;
  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';
  q.choices.forEach((choice, idx) => {
    const btn = document.createElement('button');
    btn.innerText = `${idx + 1}. ${choice}`;
    btn.onclick = () => selectAnswer(idx, btn);
    choicesDiv.appendChild(btn);
  });
  document.getElementById('next-btn').style.display = 'none';
}

function selectAnswer(idx, btn) {
  const questions = quizData[currentDay];
  const q = questions[currentQuestion];
  const choiceBtns = document.querySelectorAll('#choices button');
  choiceBtns.forEach(b => b.disabled = true);
  if (idx === q.answer) {
    btn.classList.add('correct');
    score += 2;
  } else {
    btn.classList.add('incorrect');
    choiceBtns[q.answer].classList.add('correct');
  }
  userAnswers.push(idx);
  document.getElementById('next-btn').style.display = '';
}

function nextQuestion() {
  currentQuestion++;
  const questions = quizData[currentDay];
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById('quiz-area').style.display = 'none';
  document.getElementById('result-area').style.display = '';
  document.getElementById('score').innerText = `점수: ${score} / ${quizData[currentDay].length * 2}`;
}