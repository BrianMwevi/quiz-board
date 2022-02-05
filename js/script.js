const takeQuiz = document.getElementById("take-quiz");
const username = document.querySelector(".user-form");

const homePage = document.querySelector(".home");
const userPage = document.querySelector(".user-detail");
const startQuiz = document.querySelector(".start");
const questions = document.querySelector(".questions")

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
