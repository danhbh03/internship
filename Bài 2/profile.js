function loadAvatar() {
    let avatarUrl = localStorage.getItem('avatar');
    if (avatarUrl) {
        document.getElementById('avatar-display').src = avatarUrl;
    }
}
document.getElementById('avatar-display').addEventListener('click', function() {
    document.getElementById('avatar-upload').click();
});

document.getElementById('avatar-upload').addEventListener('change', function(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onloadend = function() {
            localStorage.setItem('avatar', reader.result);
            loadAvatar();
        };
        reader.readAsDataURL(file);
    }
});
document.getElementById('hobby').addEventListener('click', function() {
    if (document.getElementById('add').style.display === 'none') {
        document.getElementById('add').style.display = 'flex';
    }else {
        document.getElementById('add').style.display = 'none';
    }
});
loadAvatar();