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

// ==================== PRICE RANGE ====================
const minInput = document.getElementById("minPrice");
const maxInput = document.getElementById("maxPrice");
const rangeText = document.getElementById("priceRangeText");

const progress = document.createElement("div");
progress.classList.add("range-progress");
const rangeSlider = document.querySelector(".range-slider");
if (rangeSlider) {
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

// Event listeners for price range
if (minInput && maxInput) {
    minInput.addEventListener("input", updateRange);
    maxInput.addEventListener("input", updateRange);
}

// ==================== RENDER BOOKS ====================
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

// ==================== NAVIGATION ====================
function goToDetail(bookId) {
    window.location.href = `book-detail.html?id=${bookId}`;
}

// ==================== ADD TO CART ====================
function addToCart(event, bookId) {
    event.stopPropagation();
    
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
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
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Visual feedback
    const btn = event.currentTarget;
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i>';
    btn.style.backgroundColor = '#10b981';
    
    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.backgroundColor = '';
    }, 1000);
}

function initializeCarousel() {
    const carousel = document.getElementById('pageCarousel');
    if (carousel && typeof bootstrap !== 'undefined') {
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 3000,
            pause: false,
            ride: 'carousel'
        });
        bsCarousel.cycle();
    }
}

function setupFilters() {
    // Category filters
    const categoryCheckboxes = document.querySelectorAll('.filter__option-input[type="checkbox"]');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log('Category:', this.nextElementSibling.textContent, 'Checked:', this.checked);
            // Add your filter logic here
        });
    });

    // Condition filters
    const conditionRadios = document.querySelectorAll('.filter__option-input[type="radio"]');
    conditionRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            console.log('Condition:', this.nextElementSibling.textContent);
        });
    });
}

function setupSort() {
    const sortSelect = document.querySelector('.products-header__sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            console.log('Sort by:', this.value);
            // Add your sorting logic here
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    updateRange();
    renderBooks(books);
    setupFilters();
    setupSort();
});

// Make functions available globally
window.goToDetail = goToDetail;
window.addToCart = addToCart;