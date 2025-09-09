let currentDay = 1;
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// 배열을 무작위로 섞는 함수
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// 퀴즈 시작 시 문제 순서 섞기
function startQuiz(day) {
  currentDay = day;
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  // 문제 순서 섞기 (깊은 복사)
  quizData._shuffled = quizData[day].map(q => {
    // 선택지 섞기 및 정답 인덱스 재계산
    const choices = q.choices.map((c, i) => ({ text: c, origIdx: i }));
    shuffle(choices);
    const newAnswer = choices.findIndex(c => c.origIdx === q.answer);
    return {
      question: q.question,
      choices: choices.map(c => c.text),
      answer: newAnswer
    };
  });
  shuffle(quizData._shuffled);

  document.getElementById('day-select').style.display = 'none';
  document.getElementById('result-area').style.display = 'none';
  document.getElementById('quiz-area').style.display = '';
  showQuestion();
}

function showQuestion() {
  const questions = quizData._shuffled;
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
  const questions = quizData._shuffled;
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
  const questions = quizData._shuffled;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById('quiz-area').style.display = 'none';
  document.getElementById('result-area').style.display = '';
  document.getElementById('score').innerText = `점수: ${score} / ${quizData._shuffled.length * 2}`;
}