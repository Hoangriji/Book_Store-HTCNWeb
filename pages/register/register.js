document.addEventListener("DOMContentLoaded", () => {
	const returnBtn = document.querySelector(".return");
	const registerForm = document.querySelector("form");

	if (returnBtn) {
		returnBtn.addEventListener("click", (event) => {
			event.preventDefault();
			window.location.href = "/index.html";
		});
	}

	if (!registerForm) {
		return;
	}

	const syncFilledState = (input) => {
		if (!input) {
			return;
		}

		input.classList.toggle("has-value", input.value.length > 0);
	};

	const registerInputs = registerForm.querySelectorAll(".form-control");
	registerInputs.forEach((input) => {
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

	const saveUsers = (users) => {
		localStorage.setItem("users", JSON.stringify(users));
	};

	const validateRegisterData = (data, users) => {
		const errors = [];
		const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const hasLetter = /[A-Za-z]/.test(data.password);
		const hasNumber = /\d/.test(data.password);

		if (data.fullname.length < 2) {
			errors.push("Họ và tên phải có ít nhất 2 ký tự.");
		}

		if (!usernameRegex.test(data.username)) {
			errors.push("Tên đăng nhập gồm 4-20 ký tự, chỉ chứa chữ, số hoặc dấu gạch dưới (_).");
		}

		if (!emailRegex.test(data.email)) {
			errors.push("Email không đúng định dạng.");
		}

		if (data.password.length < 6 || !hasLetter || !hasNumber) {
			errors.push("Mật khẩu tối thiểu 6 ký tự và phải có cả chữ lẫn số.");
		}

		if (data.password !== data.confirmPassword) {
			errors.push("Xác nhận mật khẩu không khớp.");
		}

		const isUsernameExists = users.some(
			(user) => user.username.toLowerCase() === data.username.toLowerCase(),
		);
		if (isUsernameExists) {
			errors.push("Tên đăng nhập đã tồn tại.");
		}

		const isEmailExists = users.some(
			(user) => user.email.toLowerCase() === data.email.toLowerCase(),
		);
		if (isEmailExists) {
			errors.push("Email đã được sử dụng.");
		}

		return errors;
	};

	registerForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const formData = {
			fullname: document.querySelector("#fullname")?.value.trim() || "",
			username: document.querySelector("#username")?.value.trim() || "",
			email: (document.querySelector("#email")?.value || "").trim().toLowerCase(),
			password: document.querySelector("#password")?.value || "",
			confirmPassword: document.querySelector("#confirmPassword")?.value || "",
		};

		const users = getUsers();
		const errors = validateRegisterData(formData, users);

		if (errors.length > 0) {
			alert(errors.join("\n"));
			return;
		}

		const newUser = {
			id: Date.now(),
			fullname: formData.fullname,
			username: formData.username,
			email: formData.email,
			password: formData.password,
			createdAt: new Date().toISOString(),
		};

		users.push(newUser);
		saveUsers(users);

		alert("Đăng ký thành công! Mời bạn đăng nhập.");
		window.location.href = "../login/login.html";
	});
});
