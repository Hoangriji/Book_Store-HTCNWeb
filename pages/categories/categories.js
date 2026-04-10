let globalAllBooks = [];

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

function filterAndRender(minPrice, maxPrice) {
    if (!globalAllBooks.length) return;

    const allCondElement = document.getElementById('allCondition');
    const isAllSelected = allCondElement ? allCondElement.checked : true;
    const isNewSelected = document.getElementById('newBook').checked;

    const sortSelect = document.querySelector('.products-header__sort-select');
    const sortType = sortSelect ? sortSelect.value : 'Giá: Thấp đến Cao';

    let filtered = globalAllBooks.filter(book => {
        const matchPrice = book.price >= minPrice && book.price <= maxPrice;
        let matchCondition = true;
        if (!isAllSelected) {
            const hasNewBadge = book.id % 3 === 0; 
            matchCondition = isNewSelected ? hasNewBadge : !hasNewBadge;
        }
        return matchPrice && matchCondition;
    });

    if (sortType === 'Giá: Thấp đến Cao') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === 'Giá: Cao đến Thấp') {
        filtered.sort((a, b) => b.price - a.price);
    }

    const mappedBooks = filtered.map(book => ({
        ...book,
        img: getDirectDriveLink(book.image),
        price: book.price.toLocaleString('vi-VN') + "đ",
        badge: book.id % 3 === 0 ? 'Mới' : ''
    }));

    renderCards('booksGrid', mappedBooks);

    const resultsText = document.querySelector('.products-header__result');
    if (resultsText) {
        resultsText.textContent = `Hiển thị ${mappedBooks.length} kết quả`;
    }
}

function initCategoriesPage() {
    const allCondRadio = document.getElementById('allCondition');
    if (allCondRadio) allCondRadio.checked = true;

    const allBooks = getBooksFromStorage();
    if (allBooks.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');
    const cat = params.get('cat') ? decodeURIComponent(params.get('cat')) : null;

    let sortedBooks = [...allBooks];

    if (from === 'trending') {
        sortedBooks = [...allBooks.slice(0, 10), ...allBooks.slice(10)];
    } else if (from === 'sale') {
        sortedBooks = [...allBooks.slice(10, 18), ...allBooks.slice(0, 10), ...allBooks.slice(18)];
    } else if (from === 'category' && cat) {
        const matched = allBooks.filter(b => b.categories.includes(cat));
        const unmatched = allBooks.filter(b => !b.categories.includes(cat));
        sortedBooks = [...matched, ...unmatched];
        tickCategoryCheckbox(cat);
    }

    globalAllBooks = sortedBooks;
    filterAndRender(0, 600000);
}

function tickCategoryCheckbox(catName) {
    const allOptions = document.querySelectorAll('.filter-group__content .filter__option');
    allOptions.forEach(opt => {
        const label = opt.querySelector('.filter__option-label');
        const checkbox = opt.querySelector('.filter__option-input[type="checkbox"]');
        if (!label || !checkbox) return;
        if (label.textContent.trim() === catName) {
            checkbox.checked = true;
            allOptions.forEach(o => o.style.display = 'flex');
            const toggleBtn = document.querySelector('.filter-toggle-btn');
            if (toggleBtn) toggleBtn.textContent = 'Thu gọn ▴';
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('pageCarousel');
    if (carousel && typeof bootstrap !== 'undefined') {
        new bootstrap.Carousel(carousel, { interval: 3000 }).cycle();
    }

    const minInput = document.getElementById('minPrice');
    const maxInput = document.getElementById('maxPrice');
    const rangeText = document.getElementById('priceRangeText');
    const progress = document.getElementById('rangeProgress');
    const priceBtns = document.querySelectorAll('.price-btn');
    const conditionRadios = document.querySelectorAll('input[name="condition"]');
    const sortSelect = document.querySelector('.products-header__sort-select');

    function updateRangeLogic() {
        if (!minInput || !maxInput) return;
        let minVal = parseInt(minInput.value) * 6000;
        let maxVal = parseInt(maxInput.value) * 6000;
        if (minVal > maxVal) [minVal, maxVal] = [maxVal, minVal];
        if (progress) {
            progress.style.left = (minVal / 600000 * 100) + '%';
            progress.style.width = ((maxVal - minVal) / 600000 * 100) + '%';
        }
        if (rangeText) {
            rangeText.textContent = `${minVal.toLocaleString('vi-VN')}đ - ${maxVal.toLocaleString('vi-VN')}đ`;
        }
        filterAndRender(minVal, maxVal);
    }

    if (sortSelect) sortSelect.addEventListener('change', updateRangeLogic);
    conditionRadios.forEach(radio => radio.addEventListener('change', updateRangeLogic));

    if (minInput && maxInput) {
        minInput.addEventListener('input', updateRangeLogic);
        maxInput.addEventListener('input', updateRangeLogic);
    }

    priceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            priceBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            let min = 0, max = 600000;
            if (this.textContent.includes('Trên 100k')) min = 100000;
            minInput.value = min / 6000;
            maxInput.value = max / 6000;
            updateRangeLogic();
        });
    });

    const SHOW_COUNT = 2;
    const firstFilterGroup = document.querySelector('.filter-group__content');
    if (firstFilterGroup) {
        const filterOptions = firstFilterGroup.querySelectorAll('.filter__option');
        if (filterOptions.length > SHOW_COUNT) {
            filterOptions.forEach((opt, index) => { if (index >= SHOW_COUNT) opt.style.display = 'none'; });
            const toggleBtn = document.createElement('span');
            toggleBtn.className = 'filter-toggle-btn';
            toggleBtn.textContent = 'Xem thêm ▾';
            firstFilterGroup.appendChild(toggleBtn);
            let expanded = false;
            toggleBtn.addEventListener('click', () => {
                expanded = !expanded;
                filterOptions.forEach((opt, index) => { if (index >= SHOW_COUNT) opt.style.display = expanded ? 'flex' : 'none'; });
                toggleBtn.textContent = expanded ? 'Thu gọn ▴' : 'Xem thêm ▾';
            });
        }
    }

    const resetBtn = document.querySelector('.filter-reset');
    if (resetBtn) resetBtn.addEventListener('click', () => { location.reload(); });

    initCategoriesPage();
});

window.goToDetail = (bookId) => {
    window.location.href = `../detailProduct/detailProduct.html?id=${bookId}`;
};

window.addToCart = (event, bookId) => {
    event.stopPropagation();
    console.log('Đã thêm vào giỏ:', bookId);
};