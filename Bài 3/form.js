class NV {
    ho_ten;
    ngay_sinh;
    so_dien_thoai;
    email;
    gender;
    address;
    constructor() {
        this.ho_ten = "";
        this.ngay_sinh = "";
        this.so_dien_thoai = "";
        this.email = "";
        this.gender = "";
        this.address = "";
    }
}
let NhanVien = new NV();
function validateName() {
    const nameInput = document.getElementById("name");
    const regex = /^([A-ZÀ-Ỹ][a-zà-ỹ]+)(\s[A-ZÀ-Ỹ][a-zà-ỹ]+)+$/; 
    if (!regex.test(nameInput.value)) {
        document.getElementById("name-error").innerHTML = "Họ và tên cần có 2 từ trở lên, viết hoa chữ cái đầu và không chứa ký tự đặc biệt";
        document.getElementById("name-error").style.display = "block";
    } else {
        document.getElementById("name-error").innerHTML = "";
        document.getElementById("name-error").style.display = "none";
        NhanVien.ho_ten = nameInput.value;
        fullValidate()
    }
}
function validateEmail() {
    const emailInput = document.getElementById("email");
    const regex = /^(?!.*\.\.)[a-zA-Z0-9][a-zA-Z0-9._%+-]*[a-zA-Z0-9]@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regex.test(emailInput.value)) {
        document.getElementById("email-error").innerHTML = "Email không hợp lệ";
        document.getElementById("email-error").style.display = "block";

    } else {
        document.getElementById("email-error").innerHTML = "";
        document.getElementById("email-error").style.display = "none";
        NhanVien.email = emailInput.value;
        fullValidate()
    }
}
function validatePhone() {
    const phoneInput = document.getElementById("phone");
    const regex = /(84|0[1|3|5|7|8|9])+([0-9]{8,9})\b/;
    if (!regex.test(phoneInput.value)) {
        document.getElementById("phone-error").innerHTML = "Số điện thoại không hợp lệ";
        document.getElementById("phone-error").style.display = "block";
    } else {
        document.getElementById("phone-error").innerHTML = "";
        document.getElementById("phone-error").style.display = "none";
        NhanVien.so_dien_thoai = phoneInput.value;
        fullValidate()
    }
}
function validateDOB() {
    const dobInput = document.getElementById("dob");
    if (!dobInput.value) return;

    const dob = new Date(dobInput.value + "T00:00:00");
    const today = new Date(); 
    const minDate = new Date(); 
    minDate.setFullYear(today.getFullYear() - 18); 

    if (dob > minDate) {
        document.getElementById("dob-error").innerHTML = "Ngày sinh không hợp lệ. Bạn phải đủ 18 tuổi.";
        document.getElementById("dob-error").style.display = "block";
    } else {
        document.getElementById("dob-error").innerHTML = "";
        document.getElementById("dob-error").style.display = "none";
        NhanVien.ngay_sinh = dob;
        fullValidate()
    }
}
function validateGender() {
    const genderInput = document.getElementById("gender");
    const genderValue = genderInput.value.trim().toLowerCase();

    const validGenders = ["nam", "nữ", "khác"];

    if (!validGenders.includes(genderValue)) {
        document.getElementById("gender-error").innerHTML= "Giới tính không hợp lệ. Vui lòng nhập Nam, Nữ hoặc Khác.";
        document.getElementById("gender-error").style.display = "block";
    }else {
        document.getElementById("gender-error").innerHTML = "";
        document.getElementById("gender-error").style.display = "none";
        NhanVien.gender = genderValue;
        fullValidate()
    }
}
function validateAddress(){
    const addressInput = document.getElementById("address");
    if(addressInput.value == ""){
        document.getElementById("address-error").innerHTML = "Vui lòng nhập địa chỉ";
        document.getElementById("address-error").style.display = "block";
    } else {
        document.getElementById("address-error").innerHTML = "";
        document.getElementById("address-error").style.display = "none";
        NhanVien.address = addressInput.value;
        fullValidate()
    }
}
function fullValidate(){
    if(!NhanVien.address=="" || !NhanVien.email=="" || !NhanVien.so_dien_thoai==""){
        if(!NhanVien.ho_ten=="" && !NhanVien.ngay_sinh=="" && !NhanVien.gender==""){
            console.log(NhanVien);
        }
    }
    if(!NhanVien.ho_ten=="" && !NhanVien.ngay_sinh=="" && !NhanVien.gender==""){
        console.log(NhanVien);
    } 
}



