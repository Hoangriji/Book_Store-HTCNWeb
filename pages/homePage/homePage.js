function getDirectDriveLink(url) {
    if (url && url.includes('drive.google.com')) {
        const fileId = url.split('id=')[1];
        return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
    return url;
}

async function initHomePage() {
    try {
        const response = await fetch('/shared/sach.json');
        const data = await response.json();
        const allBooks = data.books;

        const trendingBooks = allBooks.slice(0, 10).map(book => ({
            ...book,
            img: getDirectDriveLink(book.image),
            desc: book.author
        }));
        renderCards('booksGrid', trendingBooks);

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

        // xem them
        const viewMoreBtn = document.querySelector('.section-viewmore-btn');
        if (viewMoreBtn) {
            viewMoreBtn.href = `/pages/categories/categories.html?from=trending`;
        }

        // xem tat ca
        const viewAllBtn = document.querySelector('.sale_section-viewall');
        if (viewAllBtn) {
            viewAllBtn.href = `/pages/categories/categories.html?from=sale`;
        }

    } catch (error) {
        console.error(error);
    }
}

function renderFeaturedCategories(categories) {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;

    grid.innerHTML = categories.map(cat => `
        <a class="categories_item"
           href="/pages/categories/categories.html?from=category&cat=${encodeURIComponent(cat.name)}">
            <div class="categories_image-wrapper">
                <img src="${cat.img}" alt="${cat.name}" onerror="this.src='/imgs/homePage/Book1.png'">
            </div>
            <span class="categories_name">${cat.name}</span>
        </a>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    initHomePage();

    const track = document.getElementById('saleGrid');
    const prevBtn = document.getElementById('salePrev');
    const nextBtn = document.getElementById('saleNext');

    if (prevBtn && nextBtn && track) {
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -250, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: 250, behavior: 'smooth' });
        });
    }
});