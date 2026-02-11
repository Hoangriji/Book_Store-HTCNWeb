document.addEventListener("DOMContentLoaded", function () {
    const books = [
        {
            id: 1,
            image: "/imgs/categories/productBook1.png",
            title: "Thunmanhandiya",
            description: "Mahagamasekara",
            price: 129
        },
        {
            id: 2,
            image: "/imgs/categories/productBook2.png",
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
            image: "/imgs/categories/productBook3.png",
            badge: "Mới",
            title: "Literature Classics",
            description: "Classic Author",
            price: 110
        },
        {
            id: 6,
            image: "/imgs/categories/productBook2.png",
            badge: "Mới",
            title: "Business Management",
            description: "Management Guru",
            price: 135
        }
    ];

    const params = new URLSearchParams(window.location.search);
    const bookId = parseInt(params.get("id"));

    const book = books.find(b => b.id === bookId);
    if (!book) return;

    document.getElementById("detailImage").src = book.image;
    document.getElementById("detailTitle").textContent = book.title;
    document.getElementById("detailAuthor").textContent = "by " + book.description;
    document.getElementById("detailPrice").textContent = `$${book.price}.00`;
});
