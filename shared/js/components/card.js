function createCardHTML(book) {
    const badgeBlock = book.badge
        ? `<div class="card-badge">${book.badge}</div>`
        : '';

    const priceBlock = book.saleStyle && book.originalPrice
        ? `<div class="card-price--group">
                <span class="card-price--sale">${book.price}</span>
                <span class="card-price--discount">${book.badge}</span>
            </div>
            <div class="card-price--original-block">${book.originalPrice}</div>`
        : book.originalPrice
        ? `<div class="card-price">
                <span class="card-price--original">${book.originalPrice}</span>
                <span class="card-price--sale">${book.price}</span>
            </div>`
        : `<div class="card-price">${book.price}</div>`;

    const randomSold = Math.floor(Math.random() * 100) + 1;
    const progressWidth = Math.floor(Math.random() * 70) + 15;

    const actionsBlock = `
        <div class="sold-progress-container">
            <div class="sold-progress-bar" style="width: ${progressWidth}%"></div>
            <span class="sold-text">Đã bán ${randomSold}</span>
        </div>
    `;

    return `
        <div class="${book.saleStyle ? '' : 'col-auto'}">
            <div class="card-product${book.saleStyle ? ' card-product--sale' : ''}" 
                 onclick="window.location.href='/pages/detailProduct/detailProduct.html?id=${book.id}'">
                
                ${book.saleStyle ? '' : badgeBlock}
                <img class="card-img-top" src="${book.img}" alt="${book.alt}" />
                <div class="card-product-body">
                    <div class="card-body-content">
                        <h4 class="card-title">${book.title}</h4>
                        ${book.saleStyle ? '' : `<p class="card-text">${book.desc || ''}</p>`}
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