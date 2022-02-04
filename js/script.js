const takeQuiz = document.getElementById("take-quiz");
takeQuiz.addEventListener("click", (e) => {
	e.preventDefault();
	document.querySelector(".home").style.display = "none";
	document.querySelector(".user-detail").style.display = "block";
});
