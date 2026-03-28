document.addEventListener("DOMContentLoaded", () => {
	const returnBtn = document.querySelector(".return");
	const loginForm = document.querySelector("form");

	if (returnBtn) {
		returnBtn.addEventListener("click", (event) => {
			event.preventDefault();
			window.location.href = "/index.html";
		});
	}

	if (!loginForm) {
		return;
	}

	const syncFilledState = (input) => {
		if (!input) {
			return;
		}

		input.classList.toggle("has-value", input.value.length > 0);
	};

	const loginInputs = loginForm.querySelectorAll(".form-control");
	loginInputs.forEach((input) => {
		syncFilledState(input);
		input.addEventListener("input", () => syncFilledState(input));
		input.addEventListener("blur", () => syncFilledState(input));
	});

	const getUsers = () => {
		try {
			const raw = localStorage.getItem("users");
			const users = raw ? JSON.parse(raw) : [];
			return Array.isArray(users) ? users : [];
		} catch (error) {
			return [];
		}
	};

	loginForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const usernameOrEmail = (document.querySelector("#username")?.value || "").trim();
		const password = document.querySelector("#password")?.value || "";

		if (!usernameOrEmail || !password) {
			alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
			return;
		}

		const users = getUsers();
		const account = users.find((user) => {
			const input = usernameOrEmail.toLowerCase();
			return (
				(user.username || "").toLowerCase() === input ||
				(user.email || "").toLowerCase() === input
			);
		});

		if (!account) {
			alert("Tài khoản không tồn tại.");
			return;
		}

		if (account.password !== password) {
			alert("Mật khẩu không chính xác.");
			return;
		}

		const loggedUser = {
			id: account.id,
			fullname: account.fullname,
			username: account.username,
			email: account.email,
		};

		localStorage.setItem("currentUser", JSON.stringify(loggedUser));
		alert("Đăng nhập thành công!");
		window.location.href = "/index.html";
	});
});
