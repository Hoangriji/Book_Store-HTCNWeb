function createCardHTML(book) {
    const formattedPrice = typeof book.price === 'number' 
        ? book.price.toLocaleString('vi-VN') + "đ" 
        : book.price;

    const badgeBlock = book.badge
        ? `<div class="card-badge">${book.badge}</div>`
        : '';

    const priceBlock = book.saleStyle && book.originalPrice
        ? `<div class="card-price--group">
                <span class="card-price--sale">${formattedPrice}</span>
                <span class="card-price--discount">${book.badge}</span>
            </div>
            <div class="card-price--original-block">${book.originalPrice}</div>`
        : book.originalPrice
        ? `<div class="card-price">
                <span class="card-price--original">${book.originalPrice}</span>
                <span class="card-price--sale">${formattedPrice}</span>
            </div>`
        : `<div class="card-price">${formattedPrice}</div>`;

    const fixedSold = (book.id * 17) % 61;
    const fixedProgress = 20 + ((book.id * 11) % 71);

    const actionsBlock = `
        <div class="sold-progress-container">
            <div class="sold-progress-bar" style="width: ${fixedProgress}%"></div>
            <span class="sold-text">Đã bán ${fixedSold}</span>
        </div>
    `;

    const isHomePage = window.location.pathname === '/' 
        || window.location.pathname.includes('homePage')
        || window.location.pathname.endsWith('index.html');
    
    const detailLink = isHomePage
        ? `./pages/detailProduct/detailProduct.html?id=${book.id}`
        : `../detailProduct/detailProduct.html?id=${book.id}`;

    return `
        <div class="${book.saleStyle ? '' : 'col-auto'}">
            <div class="card-product${book.saleStyle ? ' card-product--sale' : ''}" 
                 data-id="${book.id}"
                 onclick="window.location.href='${detailLink}'">
                ${book.saleStyle ? '' : badgeBlock}
                <img class="card-img-top" src="${book.img}" alt="${book.title}" />
                <div class="card-product-body">
                    <div class="card-body-content">
                        <h4 class="card-title">${book.title}</h4>
                        <p class="card-text">${book.author || ''}</p>
                        ${priceBlock}
                    </div>
                    ${actionsBlock}
                </div>
            </div>
        </div>
    `;
}

function renderCards(containerId, books) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = books.map(book => createCardHTML(book)).join('');
}