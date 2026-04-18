document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Ngăn load lại trang

      const btn = contactForm.querySelector("button[type='submit']");
      const originalText = btn.innerText;

      // 1. Hiệu ứng đang gửi (Loading)
      btn.innerText = "Đang gửi...";
      btn.disabled = true;

      // 2. Giả lập gửi dữ liệu sau 1.5 giây
      setTimeout(() => {
        // Gọi hàm hiển thị Toast Message Box
        showToast();

        // 3. Reset lại form và nút bấm
        contactForm.reset();
        btn.innerText = originalText;
        btn.disabled = false;
      }, 1500);
    });
  }
});

// Hàm hiển thị Toast
function showToast() {
  const toast = document.getElementById("toastMessage");
  toast.classList.add("show");

  // Tự động đóng sau 3.5 giây
  setTimeout(() => {
    closeToast();
  }, 3500);
}

// Hàm đóng Toast thủ công khi nhấn nút X
function closeToast() {
  const toast = document.getElementById("toastMessage");
  toast.classList.remove("show");
}
