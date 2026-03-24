/* Header */
const header = () => {
    const headerElement = document.querySelector(".inner-header");
    const headerTemplate = /* html */ `
        <div class="container">
            <div class="header-wrapper">
                <!-- logo -->
                <a class="logo" href="/">
                    <img src="/imgs/homePage/logo.png" alt="">
                    <h3>FiveH Book Store</h3>
                </a>

                <!-- hamburger btn -->
                <button class="hamburger-btn" aria-label="Toggle menu">
                    <i class="fa-solid fa-bars"></i>
                </button>

                <!-- overlay -->
                <div class="menu-overlay" style="display: none;"></div>

                <!-- menu -->
                <div class="menu">
                    <!-- close btn for mobile -->
                    <button class="close-menu-btn" aria-label="Close menu">
                        <i class="fa-solid fa-times"></i>
                    </button>

                    <!-- nav -->
                    <nav class="inner-nav">
                        <ul>
                            <li><a href="/"> Home</a></li>
                            <li><a href="/pages/categories/categories.html">Categories</a></li>
                            <li><a href="/pages/aboutPage/aboutPage.html">About Us</a></li>
                            <li><a href="/pages/contactPage/contactPage.html">Contact Us</a></li>
                        </ul>
                    </nav>

                    <!-- search -->
                    <div class="search-bar">
                        <input type="text" placeholder="Search for books...">
                        <button type="submit" class="search-btn btn-primary"><i class="fa-solid fa-search"></i></button>
                    </div>

                    <!-- user -->
                    <div class="user-actions">
                        <a href="/pages/cartPage/cart.html" class="user-actions-link">
                            <div class="user-actions-btn">
                                <i class="fa-solid fa-cart-shopping"></i>
                                <span class="cart-count">(0)</span>
                            </div>
                        </a>
                        <a href="/pages/login/login.html" class="user-actions-link">
                            <div class="user-actions-btn">
                                <i class="fa-solid fa-user"></i>
                                <span>Login</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    if (headerElement) {
        headerElement.innerHTML = headerTemplate;

        // hamburger
        const hamburgerBtn = headerElement.querySelector(".hamburger-btn");
        const closeBtn = headerElement.querySelector(".close-menu-btn");
        const menu = headerElement.querySelector(".menu");
        const menuLinks = headerElement.querySelectorAll(".menu a");

        // open menu
        if (hamburgerBtn && menu) {
            hamburgerBtn.addEventListener("click", () => {
                menu.classList.add("active");
                document.body.style.overflow = "hidden";
                const menuOverlay = headerElement.querySelector(".menu-overlay");
                if (menuOverlay) {
                    menuOverlay.style.display = "block";
                }
            });
        }

        // close menu
        if (closeBtn && menu) {
            closeBtn.addEventListener("click", () => {
                menu.classList.remove("active");
                document.body.style.overflow = "";
                const menuOverlay = headerElement.querySelector(".menu-overlay");
                if (menuOverlay) {
                    menuOverlay.style.display = "none";
                }
            });
        }

        // close menu when clicking on links
        menuLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 992) {
                    menu.classList.remove("active");
                    document.body.style.overflow = "";
                    const menuOverlay = headerElement.querySelector(".menu-overlay");
                    if (menuOverlay) {
                        menuOverlay.style.display = "none";
                    }
                }
            });
        });

        // close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (
                menu.classList.contains("active") &&
                !menu.contains(e.target) &&
                !hamburgerBtn.contains(e.target)
            ) {
                menu.classList.remove("active");
                document.body.style.overflow = "";
                const menuOverlay = headerElement.querySelector(".menu-overlay");
                if (menuOverlay) {
                    menuOverlay.style.display = "none";
                }
            }
        });

        // handle window resize
        window.addEventListener("resize", () => {
            if (window.innerWidth > 992) {
                menu.classList.remove("active");
                document.body.style.overflow = "";
                const menuOverlay = headerElement.querySelector(".menu-overlay");
                if (menuOverlay) {
                    menuOverlay.style.display = "none";
                }
            }
        });
    }
};

/* Footer */
const footer = () => {
    const footerElement = document.querySelector(".inner-footer");
    const footerTemplate = /* html */ `
                <div class="container">
                        <div class="footer-wrapper">
                                <div class="row g-4 footer-content">
                                        <div class="col-12 col-md-6 col-lg-5 footer-section">
                                                <img src="/imgs/homePage/logo.png" alt="">
                                                <h4 class="footer-section-title">FiveH Book Store</h4>
                                                <p>Your one-stop shop for all your reading needs. Discover, explore, and indulge in the world of books with us!</p>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg footer-section">
                                                <h4 class="footer-section-title">Contact Us</h4>
                                                <p>Email: contact@fivehbookstore.com</p>
                                                <p>Phone: +84 123 456 789</p>
                                                <p>Address: 12 Nguyen Van Bao Street, Ho Chi Minh City</p>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg footer-section">
                                                <h4 class="footer-section-title">Follow Us</h4>
                                                <div class="social-icons">
                                                        <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                                                        <a href="#"><i class="fa-brands fa-twitter"></i></a>
                                                        <a href="#"><i class="fa-brands fa-instagram"></i></a>
                                                </div>
                                        </div>

                                        <div class="col-12 col-md-6 col-lg footer-section">
                                                <h4 class="footer-section-title">Quick Links</h4>
                                                <ul>
                                                        <li><i class="fa-solid fa-arrow-right"></i><a href="index.html">Home</a></li>
                                                        <li><i class="fa-solid fa-arrow-right"></i><a href="/pages/categories/categories.html">Categories</a></li>
                                                        <li><i class="fa-solid fa-arrow-right"></i><a href="/pages/aboutPage/aboutPage.html">About Us</a></li>
                                                        <li><i class="fa-solid fa-arrow-right"></i><a href="/pages/contactPage/contactPage.html">Contact Us</a></li>
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

const main = () => {
    // render header
    header();

    // render footer
    footer();
}

main();