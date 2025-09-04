console.log("INDEX.js đã được tải và đang chạy!");
/* Thanh tìm kiếm --- */
document.addEventListener('DOMContentLoaded', function () {

    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');

    function performSearch() {
        const input = searchInput.value.trim();
        if (input) {
            alert('Đang tìm kiếm: ' + input);

        } else {
            alert('Vui lòng nhập từ khóa tìm kiếm.');
        }
    }

    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    } else {
        console.warn("Không tìm thấy nút tìm kiếm (.search-button)");
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
    } else {
        console.warn("Không tìm thấy ô input tìm kiếm (.search-input)");
    }

    /*"Thêm Nhanh"trên trang chủ */
    const quickAddButtons = document.querySelectorAll('.quick-add');

    quickAddButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const productCard = this.closest('.product-card');
            if (productCard) {
                // Lấy thông tin sản phẩm
                const productName = productCard.querySelector('h3')?.innerText || 'Sản phẩm không rõ tên';
                const productPriceText = productCard.querySelector('.price')?.innerText;
                const productImage = productCard.querySelector('img')?.getAttribute('src');


                const productId = productName.replace(/\s/g, '-').toLowerCase() + '-' + Math.random().toString(36).substring(2, 9);

                let productPrice = 0;
                if (productPriceText) {

                    productPrice = parseInt(productPriceText.replace(/\./g, '').replace('VND', ''));
                }

                const product = {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage
                };

               
                if (typeof addToCart === 'function') {
                    addToCart(product);

                } else {
                    console.error("Hàm addToCart không được định nghĩa. Đảm bảo booking.js được tải trước INDEX.js.");
                }
            } else {
                console.warn("Không tìm thấy thẻ sản phẩm cha (.product-card) cho nút quick-add.");
            }
        });
    });

    // Form Đăng ký nhận bản tin ---
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput ? emailInput.value.trim() : '';

            if (email) {
                alert(`Cảm ơn bạn đã đăng ký với địa chỉ email: ${email}!`);
                this.reset();
            } else {
                alert('Vui lòng nhập địa chỉ email của bạn.');
            }
        });
    } else {
        console.warn("Không tìm thấy form đăng ký nhận bản tin (.newsletter-form)");
    }
});