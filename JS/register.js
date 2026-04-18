const returnBtn = document.querySelector(".return");
const registerForm = document.querySelector("form");
const messageBox = document.getElementById("messageBox");

// returnbtn
if (returnBtn) {
	returnBtn.addEventListener("click", (event) => {
		window.location.href = "/HTML/homepage.html";
	});
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

// get data
const getUsers = () => {
	try {
		const raw = localStorage.getItem("users");
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
};

// save data
const saveUsers = (users) => {
	localStorage.setItem("users", JSON.stringify(users));
};

const validateRegisterData = (data, users) => {
	// validation 
	const errors = [];
	const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const hasLetter = /[A-Za-z]/.test(data.password);
	const hasNumber = /\d/.test(data.password);

	// check validation and return errors 
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

// handle register
registerForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const formData = {
		fullname: document.getElementById("fullname")?.value.trim() || "",
		username: document.getElementById("username")?.value.trim() || "",
		email: (document.getElementById("email")?.value || "").trim().toLowerCase(),
		password: document.getElementById("password")?.value || "",
		confirmPassword: document.getElementById("confirmPassword")?.value || "",
	};

	// get users and validate data
	const users = getUsers();
	const errors = validateRegisterData(formData, users);

	// if have error => show message and return
	if (errors.length > 0) {
		showMessage(errors.join("\n"), "error");
		return;
	}

	// create new user and save to local
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

	showMessage("Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...", "success");
	setTimeout(() => {
		window.location.href = "/HTML/login.html";
	}, 1500);
});