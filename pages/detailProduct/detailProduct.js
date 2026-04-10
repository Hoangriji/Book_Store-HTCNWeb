function getDirectDriveLink(url) {
    if (url && url.includes('drive.google.com')) {
        const fileId = url.split('id=')[1];
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
    return url;
}

function getBooksFromStorage() {
    const data = localStorage.getItem('allBooks');
    return data ? JSON.parse(data) : [];
}

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const bookId = parseInt(params.get("id"));

    if (!bookId) return;

    try {
        const allBooks = getBooksFromStorage();
        const book = allBooks.find(b => b.id === bookId);
        
        if (!book) return;

        document.getElementById("detailImage").src = getDirectDriveLink(book.image);
        document.getElementById("detailTitle").textContent = book.title;
        document.getElementById("detailAuthor").textContent = book.author;
        document.getElementById("detailPrice").textContent = book.price.toLocaleString('vi-VN') + "đ";
        document.getElementById("breadcrumbTitle").textContent = book.title;
        
        document.getElementById("detailEdition").textContent = book.categories
            ? book.categories.join(" / ")
            : "Sách chọn lọc";

        if (book.originalPrice) {
            document.getElementById("originalPriceWrapper").style.display = "block";
            document.getElementById("detailOriginalPrice").textContent = book.originalPrice;
            document.getElementById("detailSaveBadge").textContent = "TIẾT KIỆM";
        }

        document.getElementById("detailDescription").innerHTML = `
            <p>${book.description || ''}</p>
            <p>${book.summaryDoc || ''}</p>
        `;

        if (book.specs) {
            document.getElementById("detailSpecs").innerHTML = `
                <div class="product-specs__card">
                    <span class="product-specs__label">ISBN-13</span>
                    <span class="product-specs__value">${book.specs.isbn || 'N/A'}</span>
                </div>
                <div class="product-specs__card">
                    <span class="product-specs__label">Ngôn Ngữ</span>
                    <span class="product-specs__value">${book.specs.language || 'Tiếng Việt'}</span>
                </div>
                <div class="product-specs__card">
                    <span class="product-specs__label">Nhà Xuất Bản</span>
                    <span class="product-specs__value">${book.specs.publisher || 'N/A'}</span>
                </div>
                <div class="product-specs__card">
                    <span class="product-specs__label">Số Trang</span>
                    <span class="product-specs__value">${book.specs.pages || 'N/A'}</span>
                </div>
                <div class="product-specs__card">
                    <span class="product-specs__label">Ngày Xuất Bản</span>
                    <span class="product-specs__value">${book.specs.publishDate || 'N/A'}</span>
                </div>
                <div class="product-specs__card">
                    <span class="product-specs__label">Kích Thước</span>
                    <span class="product-specs__value">${book.specs.dimensions || 'N/A'}</span>
                </div>
            `;
        }

        const related = allBooks
            .filter(b => b.id !== bookId)
            .sort(() => Math.random() - 0.5)
            .slice(0, 5)
            .map(b => ({
                ...b,
                img: getDirectDriveLink(b.image),
                price: b.price.toLocaleString('vi-VN') + "đ",
                badge: b.id % 3 === 0 ? 'Mới' : ''
            }));

        renderCards('relatedGrid', related);

    } catch (error) {
        console.error(error);
    }
});

function updateQty(change) {
    const input = document.getElementById('qtyInput');
    let val = parseInt(input.value) + change;
    if (val < 1) val = 1;
    input.value = val;
}