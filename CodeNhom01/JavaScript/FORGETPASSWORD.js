document.getElementById('forgotPasswordForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim().toLowerCase();
    const messageDiv = document.getElementById('message');

    messageDiv.textContent = '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        messageDiv.textContent = 'Vui lòng nhập email hợp lệ.';
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (!users[email]) {
        messageDiv.textContent = 'Email này chưa được đăng ký.';
        return;
    }

    // ✅ Cấp lại mật khẩu trực tiếp
    const recoveredPassword = users[email];
    alert(`Mật khẩu của bạn là: ${recoveredPassword}`);
    emailInput.value = '';
});
