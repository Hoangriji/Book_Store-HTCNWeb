// Best Picks
const books = [
    { img: '/imgs/homePage/Book1.png', alt: 'The Great Gatsby',      title: 'The Great Gatsby',      desc: 'A classic American novel by F. Scott Fitzgerald', price: '15.99' },
    { img: '/imgs/homePage/Book2.png', alt: 'To Kill a Mockingbird', title: 'To Kill a Mockingbird', desc: "Harper Lee's Pulitzer Prize-winning novel",          price: '18.99' },
    { img: '/imgs/homePage/Book3.png', alt: '1984',                  title: '1984',                  desc: "George Orwell's dystopian masterpiece",             price: '14.99' },
    { img: '/imgs/homePage/Book4.png', alt: 'Pride and Prejudice',   title: 'Pride and Prejudice',   desc: "Jane Austen's beloved romantic novel",              price: '12.99' },
    { img: '/imgs/homePage/Book1.png', alt: 'The Great Gatsby',      title: 'The Great Gatsby',      desc: 'A classic American novel by F. Scott Fitzgerald', price: '15.99' },
    { img: '/imgs/homePage/Book2.png', alt: 'To Kill a Mockingbird', title: 'To Kill a Mockingbird', desc: "Harper Lee's Pulitzer Prize-winning novel",          price: '18.99' },
    { img: '/imgs/homePage/Book3.png', alt: '1984',                  title: '1984',                  desc: "George Orwell's dystopian masterpiece",             price: '14.99' },
    { img: '/imgs/homePage/Book4.png', alt: 'Pride and Prejudice',   title: 'Pride and Prejudice',   desc: "Jane Austen's beloved romantic novel",              price: '12.99' },
    { img: '/imgs/homePage/Book1.png', alt: 'The Great Gatsby',      title: 'The Great Gatsby',      desc: 'A classic American novel by F. Scott Fitzgerald', price: '15.99' },
    { img: '/imgs/homePage/Book2.png', alt: 'To Kill a Mockingbird', title: 'To Kill a Mockingbird', desc: "Harper Lee's Pulitzer Prize-winning novel",          price: '18.99' },
];

// Flash Sale
const saleBooks = [
    { img: '/imgs/homePage/Book1.png', alt: 'The Great Gatsby',      title: 'The Great Gatsby',      desc: 'A classic American novel by F. Scott Fitzgerald', price: '10.99', originalPrice: '15.99', badge: '-30%' },
    { img: '/imgs/homePage/Book2.png', alt: 'To Kill a Mockingbird', title: 'To Kill a Mockingbird', desc: "Harper Lee's Pulitzer Prize-winning novel",          price: '12.99', originalPrice: '18.99', badge: '-31%' },
    { img: '/imgs/homePage/Book3.png', alt: '1984',                  title: '1984',                  desc: "George Orwell's dystopian masterpiece",             price: '9.99',  originalPrice: '14.99', badge: '-33%' },
    { img: '/imgs/homePage/Book4.png', alt: 'Pride and Prejudice',   title: 'Pride and Prejudice',   desc: "Jane Austen's beloved romantic novel",              price: '8.99',  originalPrice: '12.99', badge: '-31%' },
    { img: '/imgs/homePage/Book1.png', alt: 'The Great Gatsby',      title: 'The Great Gatsby',      desc: 'A classic American novel by F. Scott Fitzgerald', price: '10.99', originalPrice: '15.99', badge: '-30%' },
    { img: '/imgs/homePage/Book2.png', alt: 'To Kill a Mockingbird', title: 'To Kill a Mockingbird', desc: "Harper Lee's Pulitzer Prize-winning novel",          price: '12.99', originalPrice: '18.99', badge: '-31%' },
    { img: '/imgs/homePage/Book3.png', alt: '1984',                  title: '1984',                  desc: "George Orwell's dystopian masterpiece",             price: '9.99',  originalPrice: '14.99', badge: '-33%' },
    { img: '/imgs/homePage/Book4.png', alt: 'Pride and Prejudice',   title: 'Pride and Prejudice',   desc: "Jane Austen's beloved romantic novel",              price: '8.99',  originalPrice: '12.99', badge: '-31%' },
];

const featuredCategories = [
    { name: "Sách Đại Cương", img: "/imgs/homePage/Book1.png" },
    { name: "Truyện Tranh", img: "/imgs/homePage/Book2.png" },
    { name: "Kinh Tế - Kinh Doanh", img: "/imgs/homePage/Book3.png" },
    { name: "Văn Học Nước Ngoài", img: "/imgs/homePage/Book4.png" },
    { name: "Kỹ Năng Sống", img: "/imgs/homePage/Book1.png" },
    { name: "Sách Thiếu Nhi", img: "/imgs/homePage/Book2.png" },
    { name: "Ngoại Ngữ", img: "/imgs/homePage/Book3.png" },
    { name: "Trinh Thám - Kinh Dị", img: "/imgs/homePage/Book4.png" }
];

function renderFeaturedCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;

    grid.innerHTML = featuredCategories.map(cat => `
        <div class="categories_item">
            <div class="categories_image-wrapper">
                <img src="${cat.img}" alt="${cat.name}" onerror="this.src='/imgs/homePage/Book1.png'">
            </div>
            <span class="categories_name">${cat.name}</span>
        </div>
    `).join('');
}

renderCards('booksGrid', books);
renderCards('saleGrid', saleBooks);
renderFeaturedCategories();

const track = document.getElementById('saleGrid');
const prevBtn = document.getElementById('salePrev');
const nextBtn = document.getElementById('saleNext');

if (prevBtn && nextBtn && track) {
    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -200, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: 200, behavior: 'smooth' });
    });
}