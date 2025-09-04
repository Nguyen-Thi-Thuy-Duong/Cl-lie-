document.addEventListener('DOMContentLoaded', () => {
    // --- Các phần tử DOM ---
    const quantityDisplay = document.getElementById('quantity-display');
    const decreaseQuantityBtn = document.getElementById('decrease-quantity');
    const increaseQuantityBtn = document.getElementById('increase-quantity');
    const addToCartButton = document.getElementById('add-to-cart-button');
    const sizeOptions = document.querySelectorAll('.size-option'); // Lấy tất cả các nút kích cỡ

    // --- Biến trạng thái ---
    let quantity = 1; // Khởi tạo số lượng mặc định là 1

    // --- Hàm hỗ trợ ---

    // Hàm cập nhật số lượng hiển thị
    function updateQuantity(change) {
        quantity = Math.max(1, quantity + change); // Đảm bảo số lượng không nhỏ hơn 1
        quantityDisplay.textContent = quantity;
    }

    // Điều khiển tăng/giảm số lượng
    if (decreaseQuantityBtn && increaseQuantityBtn && quantityDisplay) {
        decreaseQuantityBtn.addEventListener('click', () => updateQuantity(-1));
        increaseQuantityBtn.addEventListener('click', () => updateQuantity(1));
    }

    // Xử lý chọn kích cỡ (chỉ mang tính tượng trưng, không ảnh hưởng đến giỏ hàng)
    sizeOptions.forEach(button => {
        button.addEventListener('click', () => {
            // Xóa lớp 'active' khỏi tất cả các nút kích cỡ
            sizeOptions.forEach(btn => btn.classList.remove('active'));
            // Thêm lớp 'active' vào nút được click
            button.classList.add('active');
        });
    });

    // Chức năng thêm vào giỏ hàng
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            console.log('Nút "Thêm vào giỏ hàng" đã được click.'); // Log để debug

            // Lấy chi tiết sản phẩm từ các thuộc tính data-* của nút
            const productId = addToCartButton.dataset.id;
            const productName = addToCartButton.dataset.name;
            const productPrice = parseFloat(addToCartButton.dataset.price);
            const productImage = addToCartButton.dataset.image;

            // --- ĐÃ BỎ LOGIC KIỂM TRA CHỌN KÍCH CỠ ---
            // Kích cỡ giờ đây hoàn toàn mang tính tượng trưng trên giao diện
            // và không được truyền vào đối tượng sản phẩm khi thêm vào giỏ hàng.

            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: quantity, // Sử dụng số lượng hiện tại từ biến trạng thái
                // Thuộc tính 'size' đã được loại bỏ khỏi đối tượng product
            };

            console.log('Thông tin sản phẩm chuẩn bị thêm:', product); // Log để debug

            // Gọi hàm addToCart (được định nghĩa trong booking.js)
            if (typeof addToCart === 'function') {
                addToCart(product);
                console.log('Hàm addToCart đã được gọi thành công.'); // Log để debug
            } else {
                console.error('Lỗi: Hàm addToCart không được định nghĩa. Đảm bảo booking.js được tải đúng cách.');
                if (typeof showToast === 'function') {
                    showToast('Lỗi: Không thể thêm sản phẩm vào giỏ hàng.', 'alert-danger');
                }
            }
        });
    }

    // Nút quay lại shop (nếu có)
    const returnToShopBtn = document.getElementById('return-to-shop-btn');
    if (returnToShopBtn) {
        returnToShopBtn.addEventListener('click', () => {
            window.location.href = 'shop.html';
        });
    }
});
