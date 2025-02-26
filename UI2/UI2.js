const phonenumber = "0987654330";
function processedPhonenumber(){
    if(phonenumber.length == 10){
        return "*******" + phonenumber.substring(7, 10);
    }else if(phonenumber.length == 11){
        return "*******" + phonenumber.substring(8, 11);
    }
}
hotlineNumber="0987654321"
function HotlineString(){
    document.getElementById("hotline").innerHTML = "Hỗ trợ kỹ thuật: "+hotlineNumber;
} 
function OTPString(){
    document.getElementById("sent-to").innerHTML = "Một mã OTP đã được gửi đến số điện thoại: "+processedPhonenumber();
}
window.addEventListener("load", OTPString);
window.addEventListener("load", HotlineString);
document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll(".otp-input");

    inputs.forEach((input, index) => {
        input.addEventListener("input", (event) => {
            let value = event.target.value;
            if (/^\d$/.test(value)) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            } else {
                event.target.value = "";
            }
        });

        input.addEventListener("keydown", (event) => {
            if (event.key === "Backspace" && !inputs[index].value && index > 0) {
                inputs[index - 1].focus();
            }
        });
    });
});

function English() {
    document.getElementById("sent-to").innerHTML = "An OTP has been sent to phone number: " + processedPhonenumber();
    document.getElementById("login-btn").innerHTML = "Login";
    document.getElementById("hotline").innerHTML = "Hotline: " + hotlineNumber;
    
    let engBtn = document.getElementById("English"); 
    let vieBtn = document.getElementById("Vietnamese");
    vieBtn.innerHTML = "Vietnamese";
    engBtn.innerHTML = "English";

    engBtn.classList.add("activating");
    engBtn.classList.remove("inactivating");
    vieBtn.classList.add("inactivating");
    vieBtn.classList.remove("activating");
}
function Vietnamese() {
    OTPString()
    HotlineString()
    document.getElementById("login-btn").innerHTML = "Đăng nhập";
    
    let engBtn = document.getElementById("English"); 
    let vieBtn = document.getElementById("Vietnamese");
    vieBtn.innerHTML = "Tiếng Việt";
    engBtn.innerHTML = "Tiếng Anh";

    vieBtn.classList.add("activating");
    vieBtn.classList.remove("inactivating");
    engBtn.classList.add("inactivating");
    engBtn.classList.remove("activating");
}