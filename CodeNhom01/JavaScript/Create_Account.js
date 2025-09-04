const registeredEmails = JSON.parse(localStorage.getItem("registeredEmails")) || [];

document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const agree = document.getElementById("agree").checked;
    const errorMessage = document.getElementById("error-message");

    errorMessage.textContent = "";

    // Kiểm tra email đã tồn tại
    if (registeredEmails.includes(email)) {
        errorMessage.textContent = "Email đã được sử dụng. Vui lòng chọn email khác.";
        return;
    }

    // Kiểm tra mật khẩu trùng khớp
    if (password !== confirmPassword) {
        errorMessage.textContent = "Mật khẩu và xác nhận mật khẩu không khớp.";
        return;
    }

    // Kiểm tra checkbox đồng ý điều khoản
    if (!agree) {
        errorMessage.textContent = "Bạn phải đồng ý với điều khoản trước khi tiếp tục.";
        return;
    }

    // ✅ Lưu thông tin người dùng vào localStorage
    const users = JSON.parse(localStorage.getItem("users")) || {};
    users[email] = password;
    localStorage.setItem("users", JSON.stringify(users));

    // ✅ Lưu danh sách email để kiểm tra trùng lặp ở lần sau
    registeredEmails.push(email);
    localStorage.setItem("registeredEmails", JSON.stringify(registeredEmails));

    alert("Tạo tài khoản thành công!");
    window.location.href = "LOGIN.html";
});
