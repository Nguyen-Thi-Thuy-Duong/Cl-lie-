// Hàm lấy giỏ hàng từ localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Hàm lưu giỏ hàng vào localStorage VÀ CẬP NHẬT SỐ LƯỢNG TRÊN HEADER
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCountDisplay();
}

// Hàm thêm sản phẩm vào giỏ
function addToCart(product) {
    let cart = getCart();
    const index = cart.findIndex(item => item.id === product.id);
    if (index !== -1) {

        cart[index].quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    saveCart(cart);
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
} 


function updateQuantity(id, quantity) {
    let cart = getCart();
    const index = cart.findIndex(item => item.id === id);

    if (index !== -1) {
        cart[index].quantity = quantity;
        saveCart(cart);
        renderCart();
    }
}

// Hàm xóa sản phẩm khỏi giỏ
function removeItem(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    renderCart();
}

// Hàm định dạng giá tiền
function formatPrice(number) {
    if (typeof number !== 'number') return number;
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function updateCartCountDisplay() {
    const cart = getCart();
    const cartCountSpan = document.querySelector('.cart-count');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCountSpan) {
        cartCountSpan.textContent = totalItems;

        cartCountSpan.style.backgroundColor = 'red';
        cartCountSpan.style.transform = 'scale(1.1)';
        setTimeout(() => {
            cartCountSpan.style.transform = 'scale(1)';
            cartCountSpan.style.backgroundColor = '';
        }, 150);
    } else {
        console.warn("Không tìm thấy phần tử hiển thị số lượng giỏ hàng (.cart-count)");
    }
}

function renderCart() {
    const cart = getCart();
    const container = document.getElementById('cart-items');
    if (!container) return;

    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p>Giỏ hàng của bạn đang trống.</p>';
        document.getElementById('total-price').textContent = '0 VND';
        document.getElementById('tax-info').textContent = 'Bao gồm 0 VND tiền thuế';
        return;
    }

    let totalPrice = 0;
    cart.forEach(item => {
        const price = item.price * item.quantity;
        totalPrice += price;

        const div = document.createElement('div');
        div.classList.add('d-flex', 'align-items-center', 'mb-3', 'cart-item');

        div.innerHTML = `
            <div class="position-relative me-3">
                <img src="${item.image}" width="60" height="60" class="rounded" alt="${item.name}"/>
                <div class="qty-circle">${item.quantity}</div>
            </div>
            <div class="flex-grow-1">
                <div class="fw-semibold">${item.name}</div>
                <div class="text-muted small">Giá: ${formatPrice(item.price)} VND</div>
                <div class="mt-1">
                    <input type="number" min="1" value="${item.quantity}" class="form-control qty-input" data-id="${item.id}" />
                </div>
            </div>
            <div class="ms-3 fw-bold">${formatPrice(price)} VND</div>
            <div class="ms-2 remove-btn" data-id="${item.id}" title="Xóa sản phẩm"><i class="bi bi-x-circle"></i></div>
        `;

        container.appendChild(div);
    });

    document.getElementById('total-price').textContent = formatPrice(totalPrice) + ' VND';
    document.getElementById('tax-info').textContent = `Bao gồm ${formatPrice(Math.floor(totalPrice * 0.1))} VND tiền thuế (ước tính 10%)`;


    document.querySelectorAll('.qty-input').forEach(input => {
        input.addEventListener('change', e => {
            const id = e.target.getAttribute('data-id');
            let newQty = parseInt(e.target.value);
            if (isNaN(newQty) || newQty < 1) {
                newQty = 1;
                e.target.value = 1;
            }
            updateQuantity(id, newQty);
        });
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = e.target.closest('.remove-btn').getAttribute('data-id');
            removeItem(id);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {

    updateCartCountDisplay();


    if (document.getElementById('cart-items')) {
        renderCart();
    }


    const clearBtn = document.getElementById('clear-cart');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
                localStorage.removeItem('cart');
                renderCart();
                updateCartCountDisplay();
            }
        });
    }
});
