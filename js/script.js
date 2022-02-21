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
takeQuiz.addEventListener("click", (e) => {
	e.preventDefault();
	homePage.classList.add("hide");
	userPage.classList.replace("hide", "show");
});
username.addEventListener("submit", (e) => {
	e.preventDefault();
	startQuiz.classList.replace("hide", "show");
	userPage.style.display = "none";
	let user = new FormData(username).get("username");
	let capsUsername = user.charAt(0).toUpperCase();
	user = capsUsername + user.slice(1);

	document.querySelector(".username").innerText = user;
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

// // Display the quizzes and start timer
function startQuizzes() {
	startQuiz.classList.replace("show", "hide");
	questions.classList.replace("hide", "show");
	duration = setInterval(timer, 1000);
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

// ======= VALIDATE RADIO FORMS =======
const answers = {
	question1: "Sunday",
	question2: "Yes",
	question3: "<script>",
	question4: "Dynamically Typed",
};

const userForm = document
	.querySelector("#userForm")
	.addEventListener("submit", (e) => {
		e.preventDefault();
		const [isValidForm, grade, correct, incorrect] = validateForm();
		if (!isValidForm) {
			return false;
		} else {
			updateUser(grade, incorrect);
		}
	});

const updateUser = (grade, incorrect) => {
	clearInterval(duration);
	const output = document.querySelector(".results");
	document.querySelector(".output-message").innerText = grade;
	output.classList.replace("hide", "show");

	const showAnswers = document
		.querySelector(".show-answers")
		.addEventListener("click", (e) => {
			document.querySelector("fieldset").setAttribute("disabled", "true");
			output.classList.replace("show", "hide");
			document
				.querySelectorAll(".active")
				.forEach((section) => section.classList.replace("active", "inactive"));
			document
				.querySelector(".question_set")
				.classList.replace("inactive", "active");
			incorrect.forEach((answer) =>
				document
					.querySelector(`input[value=${answer[1]}]`)
					.setAttribute("checked", true)
			);
		});
};

const validateForm = () => {
	let score = 0;
	let incorrect = [];
	let correct = [];
	for (const key in answers) {
		const userAnswer = document.querySelector(`input[name=${key}]:checked`);
		const unanswered = document.querySelector(`input[name=${key}]`);

		if (userAnswer === null) {
			unanswered.parentElement.classList.add("invalid-form");
			console.log("Error", key);
			return [false, null, [], []];
		} else {
			unanswered.parentElement.classList.remove("invalid-form");
			const correctAnswer = compareAnswers(key, userAnswer.value);
			if (correctAnswer === true) {
				score++;
				correct.push([key, correctAnswer]);
			} else {
				incorrect.push([key, correctAnswer]);
			}
		}
	}
	return [true, grading(score), correct, incorrect];
};

const compareAnswers = (question, userAnswer) =>
	answers[question] === userAnswer.trim() ? true : answers[question];

const grading = (score) => {
	const grade = (score / 4) * 100;
	let message = "";
	if (grade < 50) {
		message = "Below average!";
	} else if (grade >= 50 && grade <= 70) {
		message = "You're a geek!";
	} else if (grade > 70 && grade <= 90) {
		message = "We should call you chifu!";
	} else {
		message = "You're a genius!";
	}
	return `${grade}%: ${message}`;
};

const resetForm = () => {
	hours = mins = secs = 0;
	document
		.querySelectorAll(".show")
		.forEach((section) => section.classList.replace("show", "hide"));
	document
		.querySelectorAll(".active")
		.forEach((section) => section.classList.replace("active", "inactive"));
	document.querySelector(".questions").classList.replace("hide", "show");
	document
		.querySelector(".question_set")
		.classList.replace("inactive", "active");

	document.getElementById("userForm").reset();
	return (duration = setInterval(timer, 1000));
};
