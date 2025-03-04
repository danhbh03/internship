function changeFolderActivation() {
    const folder=document.getElementById("folder");
    const lib=document.getElementById("lib");
    if(folder.classList.contains("inactivating")){
        folder.classList.remove("inactivating");
        folder.classList.add("activating");
        lib.classList.remove("activating");
        lib.classList.add("inactivating");
    }
}

function changeLibActivation() {
    const folder=document.getElementById("folder");
    const lib=document.getElementById("lib");
    if(lib.classList.contains("inactivating")){
        lib.classList.remove("inactivating");
        lib.classList.add("activating");
        folder.classList.remove("activating");
        folder.classList.add("inactivating");
    }
}

function changeFullscreenActivation() {
    const fullscreen=document.getElementById("fullscreen");
    const splitscreen=document.getElementById("splitscreen");
    if(fullscreen.classList.contains("inactivating")){
        fullscreen.classList.remove("inactivating");
        fullscreen.classList.add("activating");
        splitscreen.classList.remove("activating");
        splitscreen.classList.add("inactivating");
    }
}

function changeSplitscreenActivation() {
    const fullscreen=document.getElementById("fullscreen");
    const splitscreen=document.getElementById("splitscreen");
    if(splitscreen.classList.contains("inactivating")){
        splitscreen.classList.remove("inactivating");
        splitscreen.classList.add("activating");
        fullscreen.classList.remove("activating");
        fullscreen.classList.add("inactivating");
    }
}

function changeDashboardActivation() {
    const dashboard=document.getElementById("dashboard");
    if(dashboard.classList.contains("inactivating")){
        dashboard.classList.remove("inactivating");
        dashboard.classList.add("activating");
        
    }else{
        dashboard.classList.remove("activating");
        dashboard.classList.add("inactivating");
    }
}

function swapOption(selected) {
    let button = document.getElementById("menu");
    let dropdownList = document.getElementById("dropdown-list");
    let selectedText = selected.innerText;

    button.innerText = selectedText;
    dropdownList.innerHTML = "";
    let allOptions = ["Option 1", "Option 2", "Option 3", "Master (K1, K2)"];
    allOptions.forEach(option => {
        if (option !== selectedText) {
            let li = document.createElement("li");
            li.innerHTML = `<a class="dropdown-item" onclick="swapOption(this)">${option}</a>`;
            dropdownList.appendChild(li);
        }
    });
}



const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileInput');
const chooseFileBtn = document.getElementById('chooseFileBtn');
chooseFileBtn.addEventListener('click', () => {
    fileInput.click();
});
fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        alert(`Bạn đã chọn ${files.length} file!`);
    }
});
dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('highlight');
});
dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('highlight');
});
dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.classList.remove('highlight');

    const files = event.dataTransfer.files;
    if (files.length > 0) {
        alert(`Bạn đã kéo thả ${files.length} file!`);
    }
});

const case_list=document.getElementById("case-list");
const error_list=document.getElementById("error-list");
case_list.addEventListener('click',()=> {
    if(case_list.classList.contains("nav-inactive")){
        case_list.classList.remove("nav-inactive");
        error_list.classList.remove("nav-active");
        case_list.classList.add("nav-active");
        error_list.classList.add("nav-inactive");
    }
});
error_list.addEventListener('click',()=> {
    if(error_list.classList.contains("nav-inactive")){
        error_list.classList.remove("nav-inactive");
        case_list.classList.remove("nav-active");
        error_list.classList.add("nav-active");
        case_list.classList.add("nav-inactive");
    }
});

let cases = [];
const n = 1000;
let perPage = parseInt(document.getElementById("per-page").innerText, 10) || 1;
let currentPage = parseInt(document.getElementById("current-page").innerText, 10) || 1;
let maxPage = Math.ceil(n / perPage);

for (let index = 0; index < n; index++) {
    cases.push(index % 3 === 0
        ? ["Nguyen Van Hinh", "1084321153", "1989", "Nam", "01/01/2018", "Chụp XQuang Ngực"]
        : index % 3 === 1
        ? ["Nguyen Cong Tu", "1084321153", "1989", "Nam", "01/01/2018", "Chụp XQuang Ngực"]
        : ["Bui Hoang Danh", "1084321153", "2003", "Nam", "01/01/2018", "Chụp XQuang Ngực"]);
}

function pageList() {
    let pageList = document.getElementById("page-list");
    pageList.innerHTML = "";
    let allOptions = Array.from({ length: maxPage }, (_, i) => i + 1);
    allOptions.forEach(option => {
        if (option !== currentPage) {
            let li = document.createElement("li");
            li.innerHTML = `<a class="dropdown-item" onclick="changePage(this)">${option}</a>`;
            pageList.appendChild(li);
        }
    });
}
function selectTr(id) {
    let tableBody = document.getElementById("table-body");

    
    let rows = tableBody.querySelectorAll("tr");
    let targetRow = rows[id];

    if (targetRow.classList.contains("active-tr")) {
        targetRow.classList.remove("active-tr");
        targetRow.querySelectorAll("td").forEach(td => {
            td.classList.remove("active-td");
        });
    }else{
        tableBody.querySelectorAll("tr").forEach(row => {
            row.classList.remove("active-tr");
            row.querySelectorAll("td").forEach(td => td.classList.remove("active-td"));
        });
        targetRow.classList.add("active-tr");
        targetRow.querySelectorAll("td").forEach(td => {
            td.classList.add("active-td");
        });
    }
}
function displayPatient() {
    let body = document.getElementById("table-body");
    body.innerHTML = ""; 
    let start = perPage * (currentPage - 1);
    let end = Math.min(start + perPage, cases.length);

    let fragment = document.createDocumentFragment();

    for (let i = start; i < end; i++) {
        let row = document.createElement("tr"); 
        row.innerHTML = `<td>${cases[i][0]}</td><td>${cases[i][1]}</td><td>${cases[i][2]}</td>
                         <td>${cases[i][3]}</td><td>${cases[i][4]}</td><td>${cases[i][5]}</td>`;
        row.addEventListener("click", function () {
            selectTr(i);
        });           
        fragment.appendChild(row);
    }
    body.appendChild(fragment);
}

function pageSwapOption(selected) {
    let button = document.getElementById("per-page");
    let dropdownList = document.getElementById("per-page-menu");
    let selectedText = selected.innerText;

    button.innerText = selectedText;
    perPage = parseInt(selectedText, 10);
    maxPage = Math.ceil(n / perPage);
    
    pageList();
    displayPatient();

    dropdownList.innerHTML = "";
    ["50", "100", "150", "200"].forEach(option => {
        if (option !== selectedText) {
            let li = document.createElement("li");
            li.innerHTML = `<a class="dropdown-item" onclick="pageSwapOption(this)">${option}</a>`;
            dropdownList.appendChild(li);
        }
    });
}

function changePage(selected){
    let button = document.getElementById("current-page");
    let selectedText = selected.innerText;
    
    button.innerText = selectedText;
    currentPage = parseInt(selectedText, 10);
    
    displayPatient();
    pageList();
}
function changeByPage(page){
    let button = document.getElementById("current-page");
    
    button.innerText = page;
    currentPage = page;
    
    displayPatient();
    pageList();
}
function increase(){
    if(currentPage<maxPage){
        changeByPage(currentPage+1)
    }
}
function decrease(){
    if(currentPage>1){
        changeByPage(currentPage-1)
    }
}
function totalCases() {
    let totalCasesElement = document.getElementById("total-case");
    if (totalCasesElement) { 
        totalCasesElement.textContent = `Tổng số ca: ${n}`;
    }
}
totalCases();
displayPatient();
pageList();