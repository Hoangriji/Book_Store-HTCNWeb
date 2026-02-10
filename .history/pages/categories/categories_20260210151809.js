const books = [
    {
        image: "/imgs/categories/productBook1.png",
        badge: "Mới",
        title: "Thunmanhandiya",
        description: "Mahagamasekara",
        price: 129
    },
    {
        image: "/imgs/categories/productBook2.png",
        badge: "",
        title: "Modern Science",
        description: "John Carter",
        price: 159
    },
    {
        image: "/imgs/categories/productBook3.png",
        badge: "",
        title: "Economic World",
        description: "Adam Smith",
        price: 75
    },
    {
        image: "/imgs/categories/productBook4.png",
        badge: "",
        title: "Economic World",
        description: "Adam Smith",
        price: 75
    },
    {
        image: "/imgs/categories/productBook5.png",
        badge: "",
        title: "Economic World",
        description: "Adam Smith",
        price: 75
    },
    {
        image: "/imgs/categories/productBook6.png",
        badge: "",
        title: "Economic World",
        description: "Adam Smith",
        price: 75
    }
];

const minInput = document.getElementById("minPrice");
const maxInput = document.getElementById("maxPrice");
const rangeText = document.getElementById("priceRangeText");

const progress = document.createElement("div");
progress.classList.add("range-progress");
document.querySelector(".range-slider").appendChild(progress);

function renderBooks(bookList) {
    const booksGrid = document.getElementById("booksGrid");
    booksGrid.innerHTML = "";

    bookList.forEach(book => {
        booksGrid.innerHTML += `
            <div class="col-auto">
                <div class="book-card">
                    <div class="book-card__image-wrapper">
                        <img src="${book.image}" class="book-card__image">
                        ${book.badge ? `<span class="book-card__badge">${book.badge}</span>` : ""}
                    </div>

                    <div class="book-card__body">
                        <div class="book-card__content">
                            <h4 class="book-card__title">${book.title}</h4>
                            <p class="book-card__description">${book.description}</p>
                            <div class="book-card__price-wrapper">
                                <span class="book-card__price">${book.price}.000 đ</span>
                            </div>
                        </div>

                        <div class="book-card__actions">
                            <button class="btn btn-primary book-card__detail-btn">
                                Xem chi tiết
                            </button>

                            <button class="book-card__cart-btn">
                                <i class="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    document.querySelector(".products-header__result").textContent =
        `Hiển thị ${bookList.length} trong ${books.length} kết quả`;
}

function updateRange() {
    let min = parseInt(minInput.value);
    let max = parseInt(maxInput.value);

    const percentMin = (min / minInput.max) * 100;
    const percentMax = (max / maxInput.max) * 100;

    progress.style.left = percentMin + "%";
    progress.style.width = (percentMax - percentMin) + "%";

    rangeText.textContent = `$${min} - $${max}`;
}

minInput.addEventListener("input", updateRange);
maxInput.addEventListener("input", updateRange);

updateRange();
renderBooks(books);
