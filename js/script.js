const homePage = document.querySelector(".home");
const takeQuiz = document.getElementById("take-quiz");
const username = document.querySelector(".user-form");

const userPage = document.querySelector(".user-detail");
const startQuiz = document.querySelector(".start");
const questions = document.querySelector(".questions");

let duration;
let hours = 0;
let mins = 0;
let secs = 0;

// Correct Answers
let singleSelection = {
	s1: "When comparing two or more values and their data types",
	s2: "<script>",
	s3: "Dynamically Typed",
	s4: "Ans-4",
};
let multiSelection = {
	m1: ["Ans-1", "Ans-2", "Ans-3"],
	m2: ["Ans-1", "Ans-2", "Ans-3"],
	m3: ["Ans-1", "Ans-2", "Ans-3"],
	m4: ["Ans-1", "Ans-2", "Ans-3"],
};
let inputQuiz = {
	i1: "Ans-1",
	i2: "Ans-2",
	i3: "Ans-3",
	i4: "Ans-4",
};
takeQuiz.addEventListener("click", (e) => {
	e.preventDefault();
	homePage.classList.add("hide");
	userPage.classList.replace("hide", "show");
});
username.addEventListener("submit", (e) => {
	e.preventDefault();
	startQuiz.classList.replace("hide", "show");
	userPage.style.display = "none";
	let user = new FormData(username);

	document.querySelector(".username").textContent = user.get("username");
});

let timer = () => {
	let displayTimer = document.querySelector(".timer");
	let output = "00:00:00";
	secs++;
	if (secs === 60) {
		mins++;
		secs = 0;
	}
	if (mins === 5 && secs === 0) {
		clearInterval(duration);
	}
	if (secs < 10) {
		output = `0${hours}:${mins}:0${secs}`;
	}
	if (mins < 10) {
		output = `0${hours}:0${mins}:${secs}`;
	}
	if (mins < 10 && secs < 10) {
		output = `0${hours}:0${mins}:0${secs}`;
	}

	return (displayTimer.innerHTML = output);
};

// Display the quizzes and start timer
function startQuizzes() {
	startQuiz.classList.replace("show", "hide");
	questions.classList.replace("hide", "show");
	duration = setInterval(timer, 1000);
}

// Listen when user submit answers
const userForm = document.getElementById("form");
userForm.addEventListener("submit", (e) => {
	e.preventDefault();
	clearInterval(duration);
	let answers = new FormData(userForm);
	compareAnswers(answers);
});

// Grade user using a range of <30%<=40%<=50%<70%<=80%<90%<=100%
let grading = (correctAns) => {
	let score = (correctAns / Object.keys(singleSelection).length) * 100;
	let grade;
	if (score >= 90) {
		grade = "You're a genius!";
	} else if (score >= 80 && score < 90) {
		grade = "You were born to Code!";
	} else if (score >= 70 && score < 80) {
		grade = "You're a geek!";
	} else {
		grade = "Keep it up, you'll get there!";
	}
	return `${score}%: ${grade}`;
};

// Compare submitted answers
function compareAnswers(answers) {
	let score = 0;
	for (let answer of answers) {
		let formKey = answer[0].slice(0, 1);
		let formValue = answer[1];

		// SINGLE-SELECTION QUESTIONS
		if (formKey === "s") {
			if (singleSelection[answer[0]] === formValue) {
				score++;
			}
		}
		// MULTI-SELECTION QUESTIONS
		else if (formKey === "m") {
			if (multiSelection[answer[0]] === formValue) {
				score++;
			}
		}
		// INPUT QUESTIONS
		else if (formKey === "i") {
			if (inputQuiz[answer[0]] === formValue) {
				score++;
			}
		}
	}
	return (document.querySelector(".score").innerHTML = grading(score));
}

function slider(e) {
	const slide = e.target.getAttribute("id");
	const active_quiz = document.querySelector(".active");
	const next = active_quiz.nextElementSibling;
	const prev = active_quiz.previousElementSibling;

	if (slide === "next" && next.classList.contains("question_set")) {
		active_quiz.classList.replace("active", "inactive");
		next.classList.replace("inactive", "active");
	} else if (prev !== null && slide === "prev") {
		active_quiz.classList.replace("active", "inactive");
		prev.classList.replace("inactive", "active");
	} else {
		return document.getElementById("submit").classList.remove("hide");
	}
}
