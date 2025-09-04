document.getElementById('signInForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    errorMessage.textContent = '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        errorMessage.textContent = 'Email không hợp lệ.';
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};
    const storedPassword = users[email];

    if (!storedPassword) {
        errorMessage.textContent = 'Email chưa được đăng ký.';
        return;
    }

    if (password !== storedPassword) {
        errorMessage.textContent = 'Mật khẩu không đúng.';
        return;
    }

    // Nếu thành công
    alert('Đăng nhập thành công!');
    window.location.href = 'INDEX.html'; // Chuyển trang
});