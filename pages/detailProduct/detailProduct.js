// Hàm xử lý link ảnh Drive
function getDirectDriveLink(url) {
    if (url && url.includes('drive.google.com')) {
        const fileId = url.split('id=')[1];
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
    return url;
}

document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const bookId = parseInt(params.get("id"));

    if (!bookId) return;

    try {
        // Fetch dữ liệu từ file JSON chung
        const response = await fetch('../../shared/sach.json');
        const data = await response.json();
        const allBooks = data.books;

        // Tìm sách theo ID
        const book = allBooks.find(b => b.id === bookId);
        if (!book) return;

        // Đổ dữ liệu vào HTML
        document.getElementById("detailImage").src = getDirectDriveLink(book.image);
        document.getElementById("detailTitle").textContent = book.title;
        document.getElementById("detailAuthor").textContent = book.author;
        document.getElementById("detailPrice").textContent = book.price.toLocaleString('vi-VN') + "đ";
        
        document.getElementById("breadcrumbTitle").textContent = book.title;
        document.getElementById("detailEdition").textContent = book.categories ? book.categories.join(" / ") : "Sách chọn lọc";

        if (book.originalPrice) {
            document.getElementById("originalPriceWrapper").style.display = "block";
            document.getElementById("detailOriginalPrice").textContent = book.originalPrice;
            document.getElementById("detailSaveBadge").textContent = "TIẾT KIỆM";
        }

        document.getElementById("detailDescription").innerHTML = `
            <p>${book.description}</p>
            <p>${book.summaryDoc || ''}</p>
        `;

        if (book.specs) {
            const specsHtml = `
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
            document.getElementById("detailSpecs").innerHTML = specsHtml;
        }

    } catch (error) {
        console.error("Lỗi khi tải dữ liệu chi tiết:", error);
    }
});