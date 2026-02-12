document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Ngăn load lại trang

      const btn = contactForm.querySelector("button[type='submit']");
      const originalText = btn.innerText;

      // Hiệu ứng loading
      btn.innerText = "Đang gửi...";
      btn.disabled = true;

      // Giả lập gửi dữ liệu
      setTimeout(() => {
        alert("Cảm ơn bạn! Chúng tôi đã nhận được tin nhắn.");
        contactForm.reset();
        btn.innerText = originalText;
        btn.disabled = false;
      }, 1500);
    });
  }
});
