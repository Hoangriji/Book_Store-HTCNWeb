document.addEventListener("DOMContentLoaded", () => {
	const returnBtn = document.querySelector(".return");
	const loginForm = document.querySelector("form");
	const messageBox = document.getElementById("messageBox");

	// returnbtn
	if (returnBtn) {
		returnBtn.addEventListener("click", (event) => {
			event.preventDefault();
			window.location.href = "/index.html";
		});
	}

	if (!loginForm) {
		return;
	}

	// show message
	const showMessage = (message, type = "error") => {
		messageBox.className = `message-box ${type}`;
		messageBox.textContent = message;
		messageBox.style.display = "block";
		
		if (type === "success") {
			setTimeout(() => {
				messageBox.style.display = "none";
			}, 2000);
		}
	};

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

	// get data
	const getUsers = () => {
		try {
			const raw = localStorage.getItem("users");
			const users = raw ? JSON.parse(raw) : [];
			return Array.isArray(users) ? users : [];
		} catch (error) {
			return [];
		}
	};

	// handle login
	loginForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const usernameOrEmail = (document.querySelector("#username")?.value || "").trim();
		const password = document.querySelector("#password")?.value || "";

		// check empty
		if (!usernameOrEmail || !password) {
			showMessage("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.", "error");
			return;
		}

		// find data and check 
		const users = getUsers();
		const account = users.find((user) => {
			const input = usernameOrEmail.toLowerCase();
			return (
				(user.username || "").toLowerCase() === input ||
				(user.email || "").toLowerCase() === input
			);
		});

		if (!account) {
			showMessage("Tài khoản không tồn tại.", "error");
			return;
		}

		if (account.password !== password) {
			showMessage("Mật khẩu không chính xác.", "error");
			return;
		}

		// save data of obj currentUser
		const loggedUser = {
			id: account.id,
			fullname: account.fullname,
			username: account.username,
			email: account.email,
		};

		// load to local 
		localStorage.setItem("currentUser", JSON.stringify(loggedUser));
		showMessage("Đăng nhập thành công!", "success");
		setTimeout(() => {
			window.location.href = "/index.html";
		}, 1500);
	});
});
