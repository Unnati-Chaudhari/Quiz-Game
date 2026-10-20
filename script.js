const questions = [
  {
    question: "Which language is used for styling a webpage?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: 1,
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: 1,
  },
  {
    question: "Which CSS property changes the text color?",
    options: ["font-style", "text-color", "background-color", "color"],
    answer: 3,
  },
  {
    question: "Which keyword declares a block-scoped variable in JavaScript?",
    options: ["var", "let", "define", "int"],
    answer: 1,
  },
  {
    question: "Which symbol is used for a single-line comment in JavaScript?",
    options: ["<!-- -->", "#", "//", "**"],
    answer: 2,
  },
  {
    question: "Which method selects an element by its ID in JavaScript?",
    options: [
      "document.querySelectorAll()",
      "document.getElementById()",
      "document.getElementsByClass()",
      "document.getElement()",
    ],
    answer: 1,
  },
  {
    question:
      "Which CSS layout system is best suited for arranging items in rows and columns?",
    options: ["CSS Grid", "Float", "Text Align", "Position"],
    answer: 0,
  },
  {
    question: "Which array method adds an element to the end of an array?",
    options: ["pop()", "shift()", "push()", "unshift()"],
    answer: 2,
  },
  {
    question:
      "Which JavaScript method converts a JSON string into a JavaScript object?",
    options: [
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.convert()",
      "JSON.object()",
    ],
    answer: 1,
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language",
    ],
    answer: 0,
  },
];

const pageOne = document.querySelector(".page_one");
const pageTwo = document.querySelector(".page_two");
const scoreCard = document.querySelector(".score_card");
const queNum = document.querySelector(".question_no");
const currQueOn = document.querySelector(".curr_que");
const question = document.querySelector(".que_text");
const options = document.querySelectorAll(".option");
const prevBtn = document.querySelector("#prev_btn");
const nextBtn = document.querySelector("#next_btn");
const startBtn = document.querySelector(".start_quiz");
const scrDiv = document.querySelector(".scr_div");
const scrMsg = document.querySelector(".scr_msg");
const scrSubmsg = document.querySelector(".scr_submsg");
const restartBtn = document.querySelector(".restart_btn");
const homeBtn = document.querySelector(".home_btn");

let currentIndex = 0;
let score = 0;

let userAnswers = Array(questions.length).fill(null);

// to show homepage at the starting
function showPage(page) {
  pageOne.style.display = "none";
  pageTwo.style.display = "none";
  scoreCard.style.display = "none";
  page.style.display = "flex";
}

showPage(pageOne);

// start
startBtn.addEventListener("click", () => {
  currentIndex = 0;
  userAnswers = Array(questions.length).fill(null);
  showPage(pageTwo);
  showQuestion();
});

// for question
function showQuestion() {
  const currentQuestion = questions[currentIndex];
  queNum.textContent = `Question No. ${String(currentIndex + 1).padStart(2, "0")}`;
  currQueOn.textContent = currentIndex + 1;
  question.textContent = currentQuestion.question;
  options.forEach((option, index) => {
    option.style.backgroundColor = "";
    option.style.border = "";
    option.querySelector(".letter").style.backgroundColor = "";
    option.querySelector(".opt").textContent = currentQuestion.options[index];
  });

  const savedAnswer = userAnswers[currentIndex];

  if (savedAnswer !== null) {
    displayAnswer(savedAnswer);
  }

  prevBtn.disabled = currentIndex === 0;

  nextBtn.textContent =
    currentIndex === questions.length - 1 ? "Finish" : "Next";
}

function displayAnswer(selectedIndex) {
  const correctAnswer = questions[currentIndex].answer;
  options.forEach((option) => {
    option.style.backgroundColor = "";
    option.style.border = "";
    option.querySelector(".letter").style.backgroundColor = "";
  });

  const correctOption = options[correctAnswer];
  correctOption.style.backgroundColor = "hsl(142, 69%, 58%, 0.2)";
  correctOption.style.border = "2px solid hsl(142, 69%, 58%)";
  correctOption.querySelector(".letter").style.backgroundColor =
    "hsl(142, 69%, 58%)";
  const selectedOption = options[selectedIndex];
  if (selectedIndex !== correctAnswer) {
    selectedOption.style.backgroundColor = "hsl(350, 95%, 72%, 0.2)";
    selectedOption.style.border = "2px solid hsl(350, 95%, 72%)";
    selectedOption.querySelector(".letter").style.backgroundColor =
      "hsl(350, 95%, 72%)";
  }
}

options.forEach((option, index) => {
  option.addEventListener("click", () => {
    userAnswers[currentIndex] = index;
    displayAnswer(index);
  });
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    showQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    showQuestion();
  } else {
    calculateScore();
  }
});

// final score
function calculateScore() {
  score = userAnswers.reduce((total, selected, index) => {
    return total + (selected === questions[index].answer ? 1 : 0);
  }, 0);

  const percentage = (score / questions.length) * 100;

  scrDiv.textContent = `${score}/${questions.length}`;

  if (percentage >= 90) {
    scrMsg.textContent = "Outstanding! 🏆";
    scrSubmsg.textContent = "You're a true Code Master!";
  } else if (percentage >= 75) {
    scrMsg.textContent = "Excellent work! 🎉";
    scrSubmsg.textContent = "You've got solid coding skills.";
  } else if (percentage >= 50) {
    scrMsg.textContent = "Good effort! 💪";
    scrSubmsg.textContent = "Keep sharpening your coding skills.";
  } else if (percentage >= 30) {
    scrMsg.textContent = "You're making progress! 🌱";
    scrSubmsg.textContent = "Practice makes progress. Keep going!";
  } else {
    scrMsg.textContent = "Every expert starts somewhere! 🚀";
    scrSubmsg.textContent = "Review the basics and give it another try.";
  }

  showPage(scoreCard);
}

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  userAnswers = Array(questions.length).fill(null);
  showPage(pageTwo);
  showQuestion();
});

homeBtn.addEventListener("click", () => {
  showPage(pageOne);
});
