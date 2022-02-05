const takeQuiz = document.getElementById("take-quiz");
const userForm = document.querySelector(".user-form");

let homePage = document.querySelector(".home");
let userPage = document.querySelector(".user-detail");
let startQuiz = document.querySelector(".start");
takeQuiz.addEventListener("click", (e) => {
	e.preventDefault();
    homePage.classList.add("hide");
    homePage.style.display="none"
	userPage.classList.remove("hide");
	userPage.classList.add("show");
});
userForm.addEventListener("submit", (e) => {
	e.preventDefault();

	startQuiz.classList.remove("hide");
	startQuiz.classList.add("show");
	userPage.classList.add("hide");
    userPage.style.display = "none";
});
