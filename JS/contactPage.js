document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    const name = contactForm.querySelector("input[type='text']");
    const email = contactForm.querySelector("input[type='email']");

    const nameRegex = /^[A-ZÀ-Ỹ][a-zà-ỹ]*(\s[A-ZÀ-Ỹ][a-zà-ỹ]*)+$/u;
    const emailRegex = /^[^\s@]+@gmail\.com$/;

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Kiểm tra tên trước
      if (!nameRegex.test(name.value.trim())) {
        alert("Họ tên không hợp lệ!");
        return;
      }

      // Kiểm tra email sau
      if (!emailRegex.test(email.value.trim())) {
        alert("Email phải đúng định dạng @gmail.com!");
        return;
      }

      // ✅ Hợp lệ → gửi form
      const btn = contactForm.querySelector("button[type='submit']");
      const originalText = btn.innerText;

      btn.innerText = "Đang gửi...";
      btn.disabled = true;

      setTimeout(() => {
        showToast();
        contactForm.reset();
        btn.innerText = originalText;
        btn.disabled = false;
      }, 1500);
    });
  }
});

function showToast() {
  const toast = document.getElementById("toastMessage");
  toast.classList.add("show");
  setTimeout(() => closeToast(), 3500);
}

function closeToast() {
  const toast = document.getElementById("toastMessage");
  toast.classList.remove("show");
}