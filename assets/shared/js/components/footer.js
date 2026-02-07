export const footer = () => {
  const footerElement = document.querySelector(".inner-footer");
  const footerTemplate = /* html */ `
        <div class="container">
            <div class="footer-wrapper">
                <div class="footer-content">
                    <div class="footer-section">
                        <img src="assets/imgs/homePage/logo.png" alt="">
                        <h4 class="footer-section-title">FiveH Book Store</h4>
                        <p>Your one-stop shop for all your reading needs. Discover, explore, and indulge in the world of books with us!</p>
                    </div>

                    <div class="footer-section">
                        <h4 class="footer-section-title">Contact Us</h4>
                        <p>Email: contact@bookstore.com</p>
                        <p>Phone: +1 234 567 890</p>
                        <p>Address: 123 Book St, City, Country</p>
                    </div>

                    <div class="footer-section">
                        <h4 class="footer-section-title">Follow Us</h4>
                        <div class="social-icons">
                            <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                            <a href="#"><i class="fa-brands fa-twitter"></i></a>
                            <a href="#"><i class="fa-brands fa-instagram"></i></a>
                        </div>
                    </div>

                    <div class="footer-section">
                        <h4 class="footer-section-title">Quick Links</h4>
                        <ul>
                            <li><i class="fa-solid fa-arrow-right"></i><a href="index.html">Home</a></li>
                            <li><i class="fa-solid fa-arrow-right"></i><a href="#">Categories</a></li>
                            <li><i class="fa-solid fa-arrow-right"></i><a href="#">New releases</a></li>
                            <li><i class="fa-solid fa-arrow-right"></i><a href="#">About Us</a></li>
                            <li><i class="fa-solid fa-arrow-right"></i><a href="#">Contact Us</a></li>
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
};
