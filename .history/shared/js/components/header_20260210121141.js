export const header = () => {
  const headerElement = document.querySelector(".inner-header");
  const headerTemplate = /* html */ `
    <div class="container">
      <div class="header-wrapper">
        <!-- logo -->
        <a class="logo" href="/">
          <img src="imgs/homePage/logo.png" alt="">
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
              <li><a href="pages">Categories</a></li>
              <li><a href="#">New releases</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </nav>

          <!-- search -->
          <div class="search-bar">
            <input type="text" placeholder="Search for books...">
            <button type="submit"><i class="fa-solid fa-search"></i></button>
          </div>

          <!-- user -->
          <div class="user-actions">
            <a href="#" class="user-actions-link">
              <div class="user-actions-btn">
                <i class="fa-solid fa-cart-shopping"></i>
                <span class="cart-count">(0)</span>
              </div>
            </a>
            <a href="#" class="user-actions-link">
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
