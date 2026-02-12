const popup = document.getElementById("checkoutPopup");

// mở popup
function openPopup(){
    popup.style.display = "flex";
}

// đóng popup
function closePopup(){
    popup.style.display = "none";
}

/*         clear cart         */
const clearBtn = document.getElementById("clearCart");
const cartBook = document.querySelector(".cart-book");
const total = document.getElementById("total");

clearBtn.addEventListener("click", function(){

    // xóa toàn bộ sản phẩm
    cartBook.innerHTML = `
        <div class="cart-empty">
            Your cart is empty 
            <i class="fa-solid fa-cart-shopping"></i>
        </div>
    `;
    // reset total
    total.textContent = "$0";
});
