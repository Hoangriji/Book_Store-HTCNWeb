
// get data 
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// get fullname
document.getElementById("userNameDisplay").textContent = currentUser.fullname;

// load data
const loadUserData = () => {
    const userData = JSON.parse(localStorage.getItem(`user_${currentUser.id}`)) || {
        fullname: currentUser.fullname || "",
        phone: "",
        addresses: []
    };
    return userData;
};

const saveUserData = (data) => {
    localStorage.setItem(`user_${currentUser.id}`, JSON.stringify(data));
};

// create user
let userData = loadUserData();

document.getElementById("fullname").value = userData.fullname;
document.getElementById("username").value = currentUser.username;
document.getElementById("email").value = currentUser.email;
document.getElementById("phone").value = userData.phone || "";

const displayAddresses = () => {
    const addressList = document.getElementById("addressList");
    addressList.innerHTML = "";

    if (!userData.addresses || userData.addresses.length === 0) {
        addressList.innerHTML = '<div class="text-center text-muted py-5"><p><i class="fa-solid fa-inbox me-2"></i>Chưa có địa chỉ nào</p></div>';
        return;
    }

    userData.addresses.forEach((address, index) => {
        const addressHTML = `
            <div class="address-item">
                <div class="address-item-content">
                    <p class="fw-bold">${address.country}</p>
                    <p class="mb-1">${address.province}, ${address.ward}</p>
                    <p class="text-muted">${address.street}</p>
                </div>
                <div class="address-item-actions">
                    <button class="btn btn-sm btn-outline-danger delete-address" data-index="${index}">
                        <i class="fa-solid fa-trash me-1"></i>Xóa
                    </button>
                </div>
            </div>
        `;
        addressList.innerHTML += addressHTML;
    });

    // add delete 
    document.querySelectorAll(".delete-address").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const index = parseInt(btn.dataset.index);
            userData.addresses.splice(index, 1);
            saveUserData(userData);
            displayAddresses();
        });
    });
};

displayAddresses();

// nav
const navButtons = document.querySelectorAll(".nav-btn");
const contentSections = document.querySelectorAll(".content-section");

navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const sectionId = btn.dataset.section;
        
        navButtons.forEach((b) => b.classList.remove("active"));
        contentSections.forEach((s) => s.classList.remove("active"));
        
        btn.classList.add("active");
        document.getElementById(`${sectionId}-section`).classList.add("active");
    });
});

// submit form profile
document.getElementById("profileForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const phone = document.getElementById("phone").value.trim();
    const successMsg = document.getElementById("profile-success");
    const fullnameError = document.getElementById("fullname-error");
    const emailError = document.getElementById("email-error");
    const phoneError = document.getElementById("phone-error");

    // error messages
    fullnameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";

    // validation
    let hasError = false;

    if (fullname.length < 2) {
        fullnameError.textContent = "Họ và tên phải có ít nhất 2 ký tự.";
        hasError = true;
    }

    // check validation mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = "Email không đúng định dạng.";
        hasError = true;
    } else {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const emailExists = users.some((u) => u.email.toLowerCase() === email && u.id !== currentUser.id);
        if (emailExists) {
            emailError.textContent = "Email này đã được đăng ký.";
            hasError = true;
        }
    }

    if (phone && !/^[0-9]{10,11}$/.test(phone.replace(/\D/g, ""))) {
        phoneError.textContent = "Số điện thoại không hợp lệ.";
        hasError = true;
    }

    if (hasError) return;

    // update userData
    userData.fullname = fullname;
    userData.phone = phone;
    saveUserData(userData);

    // update in users array
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((u) => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex].fullname = fullname;
        users[userIndex].email = email;
        localStorage.setItem("users", JSON.stringify(users));
    }

    // update currentUser
    currentUser.fullname = fullname;
    currentUser.email = email;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    document.getElementById("userNameDisplay").textContent = fullname;

    // success message
    successMsg.textContent = "Lưu thay đổi thành công!";
    setTimeout(() => {
        successMsg.textContent = "";
    }, 3000);
});

// submit form address
document.getElementById("addressForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const addressData = {
        country: document.getElementById("country").value.trim(),
        province: document.getElementById("province").value.trim(),
        ward: document.getElementById("ward").value.trim(),
        street: document.getElementById("street").value.trim()
    };

    // error
    Object.keys(addressData).forEach((key) => {
        const errorMsg = document.getElementById(`${key}-error`);
        if (errorMsg) errorMsg.textContent = "";
    });

    // validation
    let hasError = false;
    Object.entries(addressData).forEach(([key, value]) => {
        if (!value) {
            const errorMsg = document.getElementById(`${key}-error`);
            if (errorMsg) {
                errorMsg.textContent = "Trường này là bắt buộc.";
                hasError = true;
            }
        }
    });

    if (hasError) return;

    // save 
    if (!userData.addresses) userData.addresses = [];
    userData.addresses.push(addressData);
    saveUserData(userData);

    // reset form
    document.getElementById("addressForm").reset();

    // success message
    const successMsg = document.getElementById("address-success");
    successMsg.textContent = "Thêm địa chỉ thành công!";
    setTimeout(() => {
        successMsg.textContent = "";
    }, 3000);

    // refresh address list
    displayAddresses();
});

// submit form pass
document.getElementById("passwordForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // error messages
    document.getElementById("currentPassword-error").textContent = "";
    document.getElementById("newPassword-error").textContent = "";
    document.getElementById("confirmPassword-error").textContent = "";

    let hasError = false;

    // acc verification
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userInArray = users.find((u) => u.id === currentUser.id);
    const actualPassword = userInArray ? userInArray.password : currentUser.password;

    // verify current pass
    if (currentPassword !== actualPassword) {
        document.getElementById("currentPassword-error").textContent = "Mật khẩu hiện tại không chính xác.";
        hasError = true;
    }

    // validate new pass
    if (newPassword.length < 6) {
        document.getElementById("newPassword-error").textContent = "Mật khẩu mới phải có ít nhất 6 ký tự.";
        hasError = true;
    }

    if (!/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) {
        document.getElementById("newPassword-error").textContent = "Mật khẩu phải có cả chữ lẫn số.";
        hasError = true;
    }

    if (newPassword !== confirmPassword) {
        document.getElementById("confirmPassword-error").textContent = "Xác nhận mật khẩu không khớp.";
        hasError = true;
    }

    if (hasError) return;

    // update pass in array
    const users2 = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users2.findIndex((u) => u.id === currentUser.id);
    if (userIndex !== -1) {
        users2[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(users2));
    }

    // update currentUser password
    currentUser.password = newPassword;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // reset form
    document.getElementById("passwordForm").reset();

    // success message
    const successMsg = document.getElementById("password-success");
    successMsg.textContent = "Cập nhật mật khẩu thành công!";
    setTimeout(() => {
        successMsg.textContent = "";
    }, 3000);
});

// logout
document.getElementById("sidebarLogoutBtn").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/HTML/homepage.html";
});
