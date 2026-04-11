// Chuyển link Google Drive sang link ảnh trực tiếp
function getDirectDriveLink(url) {
    // Kiểm tra tồn tại, phải drive khong
    if (url && url.includes('drive.google.com')) {
        // Tách lấy phần sau chữ "id=" -> field
        const fileId = url.split('id=')[1];
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
    return url;
}

// Lấy danh sách sách từ localStorage
function getBooksFromStorage() {
    const data = localStorage.getItem('allBooks');
    return data ? JSON.parse(data) : [];
}

// Khởi tạo toàn bộ nội dung trang Home
async function initHomePage() {
    try {
        // Lấy toàn bộ sách từ localStorage
        const allBooks = getBooksFromStorage();
        if (allBooks.length === 0) return;

        const trendingBooks = allBooks.slice(0, 10).map(book => ({
            ...book,
            img: getDirectDriveLink(book.image), // Chuyển link ảnh
            desc: book.author  // Hiển thị tác giả 
        }));
        renderCards('booksGrid', trendingBooks); // render

        const saleBooks = allBooks.slice(10, 18).map(book => ({
            ...book,
            img: getDirectDriveLink(book.image),
            saleStyle: true,
            badge: "-20%",
            originalPrice: (book.price * 1.2).toLocaleString('vi-VN') + "đ"
        }));
        renderCards('saleGrid', saleBooks);

        const featuredCategories = [
            { name: "Triết Học",  img: getDirectDriveLink(allBooks[0].image) },
            { name: "Giáo Trình", img: getDirectDriveLink(allBooks[5].image) },
            { name: "Công Nghệ",  img: getDirectDriveLink(allBooks[10].image) },
            { name: "Kinh Tế",    img: getDirectDriveLink(allBooks[15].image) },
            { name: "Tâm Lý Học", img: getDirectDriveLink(allBooks[20].image) },
            { name: "Văn Học",    img: getDirectDriveLink(allBooks[40].image) },
            { name: "Ngoại Ngữ",  img: getDirectDriveLink(allBooks[35].image) },
            { name: "Kỹ Năng",    img: getDirectDriveLink(allBooks[45].image) }
        ];
        renderFeaturedCategories(featuredCategories);

        const viewMoreBtn = document.querySelector('.section-viewmore-btn');
        if (viewMoreBtn) {
            viewMoreBtn.href = `/pages/categories/categories.html?from=trending`;
        }

        const viewAllBtn = document.querySelector('.sale_section-viewall');
        if (viewAllBtn) {
            viewAllBtn.href = `/pages/categories/categories.html?from=sale`;
        }

    } catch (error) {
        console.error(error);
    }
}

// Render danh mục nổi bật
// Mỗi ô là link dẫn sang trang categories với param ?from=category&cat=TênDanhMục
function renderFeaturedCategories(categories) {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;

    grid.innerHTML = categories.map(cat => `
        <a class="categories_item"
           href="/pages/categories/categories.html?from=category&cat=${encodeURIComponent(cat.name)}">
            <div class="categories_image-wrapper">
                <img src="${cat.img}" alt="${cat.name}" onerror="this.src='/imgs/homePage/Book1.png'">
                 // Nếu ảnh Drive lỗi -> sang ảnh mặc định
            </div>
            <span class="categories_name">${cat.name}</span>
        </a>
    `).join(''); // Nối tất cả thành 1 chuỗi HTML rồi gán vào grid
}

// Khi trang load xong
document.addEventListener('DOMContentLoaded', () => {
    initHomePage();

    const track = document.getElementById('saleGrid');
    const prevBtn = document.getElementById('salePrev');
    const nextBtn = document.getElementById('saleNext');

    if (prevBtn && nextBtn && track) {
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -800, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: 800, behavior: 'smooth' });
        });
    }
});