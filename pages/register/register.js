document.addEventListener("DOMContentLoaded", () => {
	const returnBtn = document.querySelector(".return");
	if (!returnBtn) {
		return;
	}

	returnBtn.addEventListener("click", (event) => {
		event.preventDefault();

		if (window.history.length > 1) {
			window.history.back();
			return;
		}

		window.location.href = "/index.html";
	});
});
