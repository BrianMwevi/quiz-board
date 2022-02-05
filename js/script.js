const takeQuiz = document.getElementById("take-quiz");
const username = document.querySelector(".user-form");

const homePage = document.querySelector(".home");
const userPage = document.querySelector(".user-detail");
const startQuiz = document.querySelector(".start");
const questions = document.querySelector(".questions");

let duration;
let hours,
	mins,
	secs = 0;

// Correct Answers
let singleSelection = {
	s1: "HyperText Markup Language",
	s2: "Cascading Styling Sheet",
	s3: "Ans-3",
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
	homePage.style.display = "none";
	userPage.classList.remove("hide");
	userPage.classList.add("show");
});
username.addEventListener("submit", (e) => {
	e.preventDefault();

	startQuiz.classList.remove("hide");
	startQuiz.classList.add("show");
	userPage.classList.add("hide");
	userPage.style.display = "none";
});

// Listen when user submit answers
const userForm = document.getElementById("form");
userForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let answers = new FormData(userForm);
	compareAnswers(answers);
});

// Grade user using a range of <30%<=40%<=50%<70%<=80%<90%<=100%
let grading = (correctAns) => {
	let score = (correctAns / 12) * 100;
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
	return grade;
};

// Compare submitted answers
function compareAnswers(answers) {
	let score = 0;
	for (let answer of answers) {
		// SINGLE-SELECTION QUESTIONS
		if (answer[0].slice(0, 1) === "s") {
			if (singleSelection[answer[0]] == answer[1]) {
				score += 5;
			}
		}
		// MULTI-SELECTION QUESTIONS
		else if (answer[0].slice(0, 1) === "m") {
			if (multiSelection[answer[0]] == answer[1]) {
				score += 5;
			}
		}
		// INPUT QUESTIONS
		else if (answer[0].slice(0, 1) === "i") {
			if (inputQuiz[answer[0]] == answer[1]) {
				score += 5;
			}
		}
	}
	// document.querySelector(".correct").innerHTML = `Score: ${grading(score)}`;
}

function slider(e) {
	const slide = e.target.getAttribute("id");
	const active_quiz = document.getElementById("active");
	const next = active_quiz.nextElementSibling;
	const prev = active_quiz.previousElementSibling;

    if (slide === "next" && next !== null) {
        console.log(slide);
		if (next.classList.contains("question_set")) {
			active_quiz.style.display = "none";
			active_quiz.id = "inactive";
			next.id = "active";
			next.style.display = "block";
		}
	} else if (prev !== null && slide === "prev") {
        console.log(slide);
		if (prev.classList.contains("question_set")) {
			active_quiz.style.display = "none";
			active_quiz.id = "inactive";
			prev.id = "active";
			prev.style.display = "block";
		}
	}
}
