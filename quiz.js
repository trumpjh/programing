let currentDay = 1;
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let shuffledQuestions = []; // quizData._shuffled 대신 별도 변수 사용

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
  shuffledQuestions = quizData[day].map(q => {
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
  shuffle(shuffledQuestions);

  document.getElementById('day-select').style.display = 'none';
  document.getElementById('result-area').style.display = 'none';
  document.getElementById('quiz-area').style.display = '';
  showQuestion();
}

function showQuestion() {
  const q = shuffledQuestions[currentQuestion];
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
  const q = shuffledQuestions[currentQuestion];
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
  if (currentQuestion < shuffledQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById('quiz-area').style.display = 'none';
  document.getElementById('result-area').style.display = '';
  document.getElementById('score').innerText = `점수: ${score} / ${shuffledQuestions.length * 2}`;
}