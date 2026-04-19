const footerElement = document.querySelector(".inner-footer");
const footerTemplate = /* html */ `          
<div class="container">
<div class="footer-wrapper">
    <div class="row g-4 footer-content">
    <div class="col-12 col-md-6 col-lg-5 footer-section">
        <img src="/imgs/homePage/logo.png" alt="" />
        <h4 class="footer-section-title">FiveH Book Store</h4>
        <p>
        Nơi đáp ứng mọi nhu cầu đọc sách của bạn. Khám phá, trải nghiệm và đắm
        chìm trong thế giới sách cùng chúng tôi!
        </p>
    </div>

    <div class="col-12 col-md-6 col-lg footer-section">
        <h4 class="footer-section-title">Liên hệ:</h4>
        <p>Email: contact@fivehbookstore.com</p>
        <p>Số điện thoại: +84 123 456 789</p>
        <p>Địa chỉ: 12 Đường Nguyễn Văn Bảo, Thành phố Hồ Chí Minh</p>
    </div>

    <div class="col-12 col-md-6 col-lg footer-section">
        <h4 class="footer-section-title">Theo dõi chúng tôi</h4>
        <div class="social-icons">
        <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="#"><i class="fa-brands fa-twitter"></i></a>
        <a href="#"><i class="fa-brands fa-instagram"></i></a>
        </div>
    </div>

    <div class="col-12 col-md-6 col-lg footer-section">
        <h4 class="footer-section-title">Liên kết nhanh</h4>
        <ul>
        <li>
            <i class="fa-solid fa-arrow-right"></i
            ><a href="/HTML/homepage.html">Trang chủ</a>
        </li>
        <li>
            <i class="fa-solid fa-arrow-right"></i
            ><a href="/HTML/categories.html">Danh mục</a>
        </li>
        <li>
            <i class="fa-solid fa-arrow-right"></i
            ><a href="/HTML/aboutPage.html">Về chúng tôi</a>
        </li>
        <li>
            <i class="fa-solid fa-arrow-right"></i
            ><a href="/HTML/contactPage.html">Liên hệ</a>
        </li>
        </ul>
    </div>
    </div>

    <div class="footer-bottom">
    <p>&copy; 2024 FiveH Book Store. All rights reserved.</p>
    </div>
</div>
</div>
    `;

if (footerElement) {
    footerElement.innerHTML = footerTemplate;
}