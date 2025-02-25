const phonenumber = "0987654330";
function processedPhonenumber(){
    if(phonenumber.length == 10){
        return "*******" + phonenumber.substring(7, 10);
    }else if(phonenumber.length == 11){
        return "*******" + phonenumber.substring(8, 11);
    }
}  
function OTPString(){
    document.getElementById("sent-to").innerHTML = "Một mã OTP đã được gửi đến số điện thoại: "+processedPhonenumber();
}
window.addEventListener("load", OTPString);
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

