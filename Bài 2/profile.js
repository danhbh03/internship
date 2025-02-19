function loadAvatar() {
    let avatarUrl = localStorage.getItem('avatar');
    if (avatarUrl) {
        document.getElementById('avatar-display').src = avatarUrl;
    }
}
document.getElementById('avatar-display').addEventListener('click', function() {
    document.getElementById('avatar-upload').click();
});
let defaultHobbies = ['Xem phim', 'Nghe nhạc', 'Đạp xe', 'Chơi game', 'Đọc sách'];
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
    if (document.getElementById('add-hobby').style.display === 'none') {
        document.getElementById('add-hobby').style.display = 'block';
        document.getElementById('hobby-input').style.display = 'block';
        document.getElementById('remove-hobby').style.display = 'block';
        document.getElementById('change-hobby').style.display = 'block';
    }else {
        document.getElementById('add-hobby').style.display = 'none';
        document.getElementById('hobby-input').style.display = 'none';
        document.getElementById('remove-hobby').style.display = 'none';
        document.getElementById('change-hobby').style.display = 'none';
        document.getElementById('hobby-input').value = '';
    }
});
document.getElementById('add-hobby').addEventListener('click', function() {
    let hobby = document.getElementById('hobby-input').value;
    if (hobby) {
        let hobbies = JSON.parse(localStorage.getItem('hobbies')) || defaultHobbies;
        hobbies.push(hobby);
        localStorage.setItem('hobbies', JSON.stringify(hobbies));
        loadHobbies();
        document.getElementById('hobby-input').value = '';
    }
});
function loadHobbies() {
    if (!localStorage.getItem('hobbies') || JSON.parse(localStorage.getItem('hobbies')).length === 0) {
        localStorage.setItem('hobbies', JSON.stringify(defaultHobbies));
    }
    let hobbies = JSON.parse(localStorage.getItem('hobbies'));
    if (hobbies) {
        let html = '';
        hobbies.forEach(function(hobby) {
            html += `<li>${hobby}</li>`;
        });
        document.getElementById('hobby-list').innerHTML = html;
    }
}

function changeHobby() {
    document.getElementById('hobby-list').addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            let hobbies = JSON.parse(localStorage.getItem('hobbies'));
            let hobby = event.target.innerText;
            let index = hobbies.indexOf(hobby);
            if (index !== -1) {
                event.target.innerHTML = `<input type="text" value="${hobby}" id="hobby-edit"><button id="change">Change</button>`;
                document.getElementById('hobby-edit').focus();
                document.getElementById('change').addEventListener('click', function() {
                    let newHobby = document.getElementById('hobby-edit').value;
                    if (newHobby) {
                        hobbies[index] = newHobby;
                        localStorage.setItem('hobbies', JSON.stringify(hobbies));
                        loadHobbies();
                    }
                });
            }
        }
    }, { once: true });
}

function deleteHobby() {
    document.getElementById('hobby-list').addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            let hobbies = JSON.parse(localStorage.getItem('hobbies'));
            let hobby = event.target.innerText;
            let index = hobbies.indexOf(hobby);
            if (index !== -1) {
                hobbies.splice(index, 1);
                localStorage.setItem('hobbies', JSON.stringify(hobbies));
                loadHobbies();
            }
        }
    }, { once: true });
}
loadAvatar();
loadHobbies();