function handleEmailClick() {
    const email = prompt("📧 Vui lòng nhập địa chỉ email của bạn:");

    if (email) {
        alert("✅ Cảm ơn! Chúng tôi sẽ liên hệ với bạn qua email: " + email + "\nChúng tôi rất mong được phục vụ bạn!");

    } else {

        alert("❌ Bạn đã hủy hoặc không nhập email.\nVui lòng thử lại nếu bạn muốn liên hệ với chúng tôi.");
    }
}


  
    function openContactModal() {
        document.getElementById("contactModal").classList.remove("d-none");
    }

    function closeContactModal() {
        document.getElementById("contactModal").classList.add("d-none");
    }

    function submitContactForm(event) {
        event.preventDefault(); 
        const form = document.getElementById("contactForm");
        if (form.checkValidity()) {
            alert("Gửi liên hệ thành công!");
            form.reset();
            closeContactModal();
        }
    }


function handleRegisterClick(){
    const email=document.getElementById("m").value;
    if(email){
        alert("Cảm ơn bạn đã tham gia cộng đồng của chúng tôi! Bạn sẽ là người đầu tiên nhận được tin tức, cập nhật sản phẩm và các chương trình khuyến mãi độc quyền từ Clélie qua "+ email +".Hãy cùng chờ đón những thông tin thú vị sắp tới nhé!");
    }
    else{
        alert("Vui lòng nhập email");
    }
    
}
