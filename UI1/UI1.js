const phonenumber = "0987654330";
function processedPhonenumber(){
    if(phonenumber.length == 10){
        return "*******" + phonenumber.substring(7, 9);
    }else if(phonenumber.length == 11){
        return "*******" + phonenumber.substring(8, 10);
    }
}
document.getElementById("sent-to").innerHTML = "Một mã OTP đã được gủi đến số điện thoại: "+processedPhonenumber;