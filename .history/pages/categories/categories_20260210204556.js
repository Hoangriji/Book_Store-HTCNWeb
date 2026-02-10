// ================= BOOK DATA =================
const books = [
    {
        id: 1,
        image: "/imgs/categories/productBook1.png",
        badge: "Mới",
        title: "Thunmanhandiya",
        description: "Mahagamasekara",
        price: 129
    },
    {
        id: 2,
        image: "/imgs/categories/productBook2.png",
        badge: "Mới",
        title: "Modern Science",
        description: "John Carter",
        price: 159
    },
    {
        id: 3,
        image: "/imgs/categories/productBook3.png",
        badge: "",
        title: "Economic World",
        description: "Adam Smith",
        price: 75
    },
    {
        id: 4,
        image: "/imgs/categories/productBook4.png",
        badge: "Mới",
        title: "Technology Today",
        description: "Tech Expert",
        price: 95
    },
    {
        id: 5,
        image: "/imgs/categories/productBook5.png",
        badge: "Mới",
        title: "Literature Classics",
        description: "Classic Author",
        price: 110
    },
    {
        id: 6,
        image: "/imgs/categories/productBook6.png",
        badge: "Mới",
        title: "Business Management",
        description: "Management Guru",
        price: 135
    }
];

// ================= DOM READY =================
document.addEventListener("DOMContentLoaded", function () {

    // ===== Carousel Init =====
    const carousel = document.getElementById("pageCarousel");
    if (carousel && typeof bootstrap !== "undefined") {
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 3000,
            pause: false,
            ride: "carousel"
        });
        bsCarousel.cycle();
    }

    // ===== Range Elements =====
    const minInput = document.getElementById("minPrice");
    const maxInput = document.getElementById("maxPrice");
    const rangeText = document.getElementById("priceRangeText");
    const rangeSlider = document.querySelector(".range-slider");

    let progress;

    if (rangeSlider) {
        progress = document.createElement("div");
        progress.classList.add("range-progress");
        rangeSlider.appendChild(progress);
    }

    function updateRange() {
        if (!minInput || !maxInput || !progress || !rangeText) return;

        let min = parseInt(minInput.value);
        let max = parseInt(maxInput.value);

        if (min > max) {
            [min, max] = [max, min];
            minInput.value = min;
            maxInput.value = max;
        }

        const percentMin = (min / minInput.max) * 100;
        const percentMax = (max / maxInput.max) * 100;

        progress.style.left = percentMin + "%";
        progress.style.width = (percentMax - percentMin) + "%";

        rangeText.textContent = `$${min} - $${max}`;
    }

    if (minInput && maxInput) {
        minInput.addEventListener("input", updateRange);
        maxInput.addEventListener("input", updateRange);
        updateRange();
    }

    // ===== Render Books =====
    renderBooks(books);
});

// ================= RENDER FUNCTION =================
function renderBooks(bookList) {
    const booksGrid = document.getElementById("booksGrid");
    if (!booksGrid) return;

    booksGrid.innerHTML = "";

    bookList.forEach(book => {
        booksGrid.innerHTML += `
            <div class="col-auto">
                <div class="book-card" data-book-id="${book.id}">
                    <div class="book-card__image-wrapper">
                        <img src="${book.image}" class="book-card__image" alt="${book.title}">
                        ${book.badge ? `<span class="book-card__badge">${book.badge}</span>` : ""}
                    </div>

                    <div class="book-card__body">
                        <div class="book-card__content">
                            <h4 class="book-card__title">${book.title}</h4>
                            <p class="book-card__description">${book.description}</p>
                            <div class="book-card__price-wrapper">
                                <span class="book-card__price">$${book.price}.00</span>
                            </div>
                        </div>

                        <div class="book-card__actions">
                            <button class="btn btn-primary book-card__detail-btn" onclick="goToDetail(${book.id})">
                                View Details
                            </button>

                            <button class="book-card__cart-btn" onclick="addToCart(event, ${book.id})">
                                <i class="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    const resultsText = document.querySelector(".products-header__result");
    if (resultsText) {
        resultsText.textContent = `Showing ${bookList.length} of ${books.length} results`;
    }
}

// ================= DETAIL PAGE =================
function goToDetail(bookId) {
    window.location.href = `book-detail.html?id=${bookId}`;
}

// ================= ADD TO CART =================
function addToCart(event, bookId) {
    event.stopPropagation();

    const book = books.find(b => b.id === bookId);
    if (!book) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(item => item.id === book.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: book.id,
            title: book.title,
            price: book.price,
            image: book.image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    const btn = event.currentTarget;
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-check"></i>';
    btn.style.backgroundColor = "#10b981";

    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.backgroundColor = "";
    }, 1000);
}


window.goToDetail = goToDetail;
window.addToCart = addToCart;
