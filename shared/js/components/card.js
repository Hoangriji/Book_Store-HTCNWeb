function createCardHTML(book) {
    const badgeBlock = book.badge
        ? `<div class="card-badge">${book.badge}</div>`
        : '';

    const priceBlock = book.originalPrice
        ? `<div class="card-price">
               <span class="card-price--original">$${book.originalPrice}</span>
               <span class="card-price--sale">$${book.price}</span>
           </div>`
        : `<div class="card-price">$${book.price}</div>`;

    const actionsBlock = book.showCart
        ? `<div class="card-actions">
               <button class="btn btn-primary card-btn" onclick="goToDetail(${book.id})">See details</button>
               <button class="card-cart-btn" onclick="addToCart(event, ${book.id})">
                   <i class="fas fa-shopping-cart"></i>
               </button>
           </div>`
        : `<button class="btn btn-primary card-btn">See details</button>`;

    return `
        <div class="col-auto">
            <div class="card-product">
                ${badgeBlock}
                <img class="card-img-top" src="${book.img}" alt="${book.alt}" />
                <div class="card-product-body">
                    <div class="card-body-content">
                        <h4 class="card-title">${book.title}</h4>
                        <p class="card-text">${book.desc}</p>
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