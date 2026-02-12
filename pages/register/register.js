document.addEventListener("DOMContentLoaded", () => {
	const returnBtn = document.querySelector(".return");
	if (!returnBtn) {
		return;
	}

	returnBtn.addEventListener("click", (event) => {
		event.preventDefault();

		window.location.href = "/index.html";
	});
});
