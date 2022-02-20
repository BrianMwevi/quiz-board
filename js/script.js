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

// // Correct Answers
// let singleSelection = {
// 	s1: "When comparing two or more values and their data types",
// 	s2: "<script>",
// 	s3: "Dynamically Typed",
// 	s4: "Ans-4",
// };
// let multiSelection = {
// 	m1: ["Ans-1", "Ans-2", "Ans-3"],
// 	m2: ["Ans-1", "Ans-2", "Ans-3"],
// 	m3: ["Ans-1", "Ans-2", "Ans-3"],
// 	m4: ["Ans-1", "Ans-2", "Ans-3"],
// };
// let inputQuiz = {
// 	i1: "Ans-1",
// 	i2: "Ans-2",
// 	i3: "Ans-3",
// 	i4: "Ans-4",
// };

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
};

const userForm = document
	.querySelector("#userForm")
	.addEventListener("submit", (e) => {
		e.preventDefault();
		const [isValidForm, grade, missedAnswers] = validateForm();
		if (!isValidForm) {
			return false;
		} else {
			updateUser(grade, missedAnswers);
		}
	});

const updateUser = (grade, missedAnswers) => {
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
			missedAnswers.forEach((answer) =>
				document
					.querySelector(`input[value=${answer[1]}]`)
					.setAttribute("checked", true)
			);
		});
};

const validateForm = () => {
	let score = 0;
	let missedAnswers = [];
	for (const key in answers) {
		const userAnswer = document.querySelector(`input[name=${key}]:checked`);
		const unanswered = document.querySelector(`input[name=${key}]`);

		if (userAnswer === null) {
			unanswered.parentElement.classList.add("invalid-form");
			console.log("Error", key);
			return [false, null, []];
		} else {
			unanswered.parentElement.classList.remove("invalid-form");
			const correctAnswer = compareAnswers(key, userAnswer.value);
			if (correctAnswer === true) {
				score++;
			} else {
				missedAnswers.push([key, correctAnswer]);
			}
		}
	}
	return [true, grading(score), missedAnswers];
};

const compareAnswers = (question, userAnswer) =>
	answers[question] === userAnswer ? true : answers[question];

const grading = (score) => {
	const grade = (score / 2) * 100;
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
	return document.getElementById("userForm").reset();
};
