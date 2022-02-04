const takeQuiz = document.getElementById("take-quiz");
takeQuiz.addEventListener("click", (e) => {
	e.preventDefault();
	let homePage = document.querySelector(".home");
	let userPage = document.querySelector(".user-detail");
	homePage.classList.add("hide");
	homePage.style.display = "none";
	userPage.classList.remove("hide");
	userPage.classList.add("show");
});
const userForm = document.querySelector(".user-form");
userForm.addEventListener("submit", (e) => {
	e.preventDefault();

	// document.querySelector(".user-detail").style.display = "block";
});
