const headerElement = document.querySelector(".inner-header");

// check log acc
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// 2 state: btn login and user
const userButton = currentUser
// trạng thái của nút khi đã đăng nhập
  ? `
        <div class="user-actions-dropdown">
            <div class="user-actions-btn">
                <i class="fa-solid fa-user"></i>
                <span class="action-label">Tài khoản</span>
            </div>
            <div class="dropdown-menu">
                <a href="/HTML/userDetailPage.html" class="dropdown-item">Trang cá nhân</a>
                <button id="logoutBtn" class="dropdown-item logout-item">Đăng xuất</button>
            </div>
        </div>
    `
// trạng thái của nút khi chưa đăng nhập
  : `
        <a href="/HTML/login.html" class="user-actions-link">
            <div class="user-actions-btn">
                <i class="fa-solid fa-user"></i>
                <span class="action-label">Đăng nhập</span>
            </div>
        </a>
    `;

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
                            <li><a href="/HTML/homepage.html">Trang chủ</a></li>
                            <li><a href="/HTML/categories.html">Sản phẩm</a></li>
                            <li><a href="/HTML/aboutPage.html">Về chúng tôi</a></li>
                            <li><a href="/HTML/contactPage.html">Liên hệ</a></li>
                        </ul>
                    </nav>

                    <!-- search -->
                    <div class="search-bar">
                        <input type="text" placeholder="Tìm kiếm sách...">
                        <button type="submit" class="search-btn btn-primary"><i class="fa-solid fa-search"></i></button>
                    </div>

                    <!-- user -->
                    <div class="user-actions">
                        <a href="/HTML/cart.html" class="user-actions-link">
                            <div class="user-actions-btn">
                                <i class="fa-solid fa-cart-shopping"></i>
                                <span class="action-label">Giỏ hàng</span>
                            </div>
                        </a>
                        ${userButton}
                    </div>
                </div>
            </div>
        </div>
    `;

if (headerElement) {
    headerElement.innerHTML = headerTemplate;

    // add logout
    const logoutBtn = headerElement.querySelector("#logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
        localStorage.removeItem("currentUser");
        window.location.href = "/HTML/homepage.html";
        });
    }

    // handle dropdown menu
    const userDropdown = headerElement.querySelector(".user-actions-dropdown");
    if (userDropdown) {
        const dropdownMenu = userDropdown.querySelector(".dropdown-menu");
        const userBtn = userDropdown.querySelector(".user-actions-btn");

        userBtn.addEventListener("click", (e) => {
        dropdownMenu.style.display =
            dropdownMenu.style.display === "block" ? "none" : "block";
        });

        // close dropdown when clicking outside
        document.addEventListener("click", (e) => {
        if (!userDropdown.contains(e.target)) {
            dropdownMenu.style.display = "none";
        }
        });
    }



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

  // close menu when click active
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

  // close menu when click outside
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
