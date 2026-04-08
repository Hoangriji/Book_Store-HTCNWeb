const books = [
    { id: 1, img: '/imgs/categories/productBook1.png', alt: 'Thunmanhandiya',     title: 'Thunmanhandiya',     desc: 'Mahagamasekara',   price: '129.00', badge: 'Mới', showCart: true },
    { id: 2, img: '/imgs/categories/productBook2.png', alt: 'Modern Science',      title: 'Modern Science',      desc: 'John Carter',       price: '159.00', badge: 'Mới', showCart: true },
    { id: 3, img: '/imgs/categories/productBook3.png', alt: 'Economic World',      title: 'Economic World',      desc: 'Adam Smith',        price: '75.00',  badge: '',    showCart: true },
    { id: 4, img: '/imgs/categories/productBook4.png', alt: 'Technology Today',    title: 'Technology Today',    desc: 'Tech Expert',       price: '95.00',  badge: 'Mới', showCart: true },
    { id: 5, img: '/imgs/categories/productBook3.png', alt: 'Literature Classics', title: 'Literature Classics', desc: 'Classic Author',    price: '110.00', badge: 'Mới', showCart: true },
    { id: 6, img: '/imgs/categories/productBook2.png', alt: 'Business Management', title: 'Business Management', desc: 'Management Guru',   price: '135.00', badge: 'Mới', showCart: true },
];

document.addEventListener('DOMContentLoaded', function () {
    // carousel
    const carousel = document.getElementById('pageCarousel');
    if (carousel && typeof bootstrap !== 'undefined') {
        new bootstrap.Carousel(carousel, { interval: 3000, pause: false, ride: 'carousel' }).cycle();
    }

    // price range
    const minInput = document.getElementById('minPrice');
    const maxInput = document.getElementById('maxPrice');
    const rangeText = document.getElementById('priceRangeText');
    const rangeSlider = document.querySelector('.range-slider');

    let progress;
    if (rangeSlider) {
        progress = document.createElement('div');
        progress.classList.add('range-progress');
        rangeSlider.appendChild(progress);
    }

    function updateRange() {
        if (!minInput || !maxInput || !progress || !rangeText) return;
        let min = parseInt(minInput.value);
        let max = parseInt(maxInput.value);
        if (min > max) { [min, max] = [max, min]; minInput.value = min; maxInput.value = max; }
        progress.style.left = (min / minInput.max * 100) + '%';
        progress.style.width = ((max - min) / maxInput.max * 100) + '%';
        rangeText.textContent = `$${min} - $${max}`;
    }

    if (minInput && maxInput) {
        minInput.addEventListener('input', updateRange);
        maxInput.addEventListener('input', updateRange);
        updateRange();
    }

    // render cards
    renderCards('booksGrid', books);

    // update result text
    const resultsText = document.querySelector('.products-header__result');
    if (resultsText) resultsText.textContent = `Showing ${books.length} of ${books.length} results`;
});

function goToDetail(bookId) {
    window.location.href = `../detailProduct/detailProduct.html?id=${bookId}`;
}

function addToCart(event, bookId) {
    event.stopPropagation();
    console.log('Add to cart:', bookId);
}

window.goToDetail = goToDetail;
window.addToCart = addToCart;