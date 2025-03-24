function changeFolderActivation() {
//     const folder=document.getElementById("folder");
//     const lib=document.getElementById("lib");
//     if(folder.classList.contains("inactivating")){
//         folder.classList.remove("inactivating");
//         folder.classList.add("activating");
//         lib.classList.remove("activating");
//         lib.classList.add("inactivating");
//     }
    window.location.href = "../UI3/UI3.html";
}

// function changeLibActivation() {
//     const folder=document.getElementById("folder");
//     const lib=document.getElementById("lib");
//     if(lib.classList.contains("inactivating")){
//         lib.classList.remove("inactivating");
//         lib.classList.add("activating");
//         folder.classList.remove("activating");
//         folder.classList.add("inactivating");
//     }
    
// }

function changeFullscreenActivation() {
    const fullscreen=document.getElementById("fullscreen");
    const splitscreen=document.getElementById("splitscreen");
    const leftPart = document.getElementById("left-part");
    const rightPart = document.getElementById("right-part");
    if(fullscreen.classList.contains("inactivating")){
        fullscreen.classList.remove("inactivating");
        fullscreen.classList.add("activating");
        splitscreen.classList.remove("activating");
        splitscreen.classList.add("inactivating");
        leftPart.classList.add("d-none");
        rightPart.classList.remove("col-8", "col-6", "col-4");
        rightPart.classList.add("col-12");
    }
}

function changeSplitscreenActivation() {
    const fullscreen=document.getElementById("fullscreen");
    const splitscreen=document.getElementById("splitscreen");
    const leftPart = document.getElementById("left-part");
    const rightPart = document.getElementById("right-part");
    if(splitscreen.classList.contains("inactivating")){
        splitscreen.classList.remove("inactivating");
        splitscreen.classList.add("activating");
        fullscreen.classList.remove("activating");
        fullscreen.classList.add("inactivating");
        leftPart.classList.remove("d-none");
        rightPart.classList.replace("col-12","col-8")
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

function swapOption(selected, buttonId, dropdownId) {
    let button = document.getElementById(buttonId);
    let dropdownList = document.getElementById(dropdownId);
    let selectedText = selected.innerText;
    
    let allOptions = Array.from(document.querySelectorAll(`#${dropdownId} .dropdown-item`))
                          .map(option => option.innerText);
    allOptions.push(button.innerText);
    allOptions.sort();
    button.innerText = selectedText;

    dropdownList.innerHTML = "";

    allOptions.forEach(option => {
        if (option !== selectedText) {
            let li = document.createElement("li");
            li.innerHTML = `<a class="dropdown-item" onclick="swapOption(this, '${buttonId}', '${dropdownId}')">${option}</a>`;
            dropdownList.appendChild(li);
        }
    });
}
function changeOption(option) { 
    let allButtonGroups = document.querySelectorAll('.proportion-btn-group');
    allButtonGroups.forEach(group => {
        let buttons = group.querySelectorAll('.proportion-btn');
        buttons.forEach(button => {
            button.classList.remove("activation");
        });

        let text = group.closest('.col-4')?.querySelector('.proportion');
        if (text) {
            text.classList.remove("active-text");
        }
    });

    let buttons = option.querySelectorAll('.proportion-btn');
    buttons.forEach(button => {
        button.classList.add("activation");
    });

    let parentCol = option.closest('.col-4');

    let proportionText = parentCol.querySelector('.proportion');
    proportionText.classList.add('active-text');
}


function changeProportion() {
    const leftPart = document.getElementById("left-part");
    const rightPart = document.getElementById("right-part");
    const infomation = document.getElementById("infomation");
    const brief = document.getElementById("brief");
    const history = document.getElementById("history");
    const buttons = document.querySelectorAll(".proportion-btn");
    const activeButtons = Array.from(buttons).filter(button => button.classList.contains("activation"));

    if (activeButtons.length === 0) {
        console.warn("Không có tỷ lệ nào được chọn!");
        return;
    }
    const activeId = activeButtons[0].id;
    leftPart.classList.remove("col-8", "col-6", "col-4", "col-2", "d-none");
    rightPart.classList.remove("col-8", "col-6", "col-4", "col-10", "d-none");

    if (activeId === "60-40") {
        leftPart.classList.add("col-8");
        rightPart.classList.add("col-4");
    } else if (activeId === "50-50") {
        leftPart.classList.add("col-6");
        rightPart.classList.add("col-6");
    } else if (activeId === "40-60") {
        leftPart.classList.add("col-4");
        rightPart.classList.add("col-8");
    } else {
        console.warn("Không khớp tỷ lệ nào!");
    }
}

let cases = JSON.parse(localStorage.getItem("cases")) || [];
const n = 1000;
let perPage = parseInt(document.getElementById("per-page").innerText, 10) || 1;
let currentPage = parseInt(document.getElementById("current-page").innerText, 10) || 1;
let maxPage = Math.ceil(n / perPage);
let status=["Chưa đọc","Đã duyệt","Đã in"]
let selectedList = [];
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 
function randomModality() {
    const modality = ['CT','XA'];
    return modality[Math.floor(Math.random() * modality.length)];
}
if (cases.length === 0) {
    for (let index = 0; index < n; index++) {
        cases.push(index % 3 === 0
            ? [randomInt(0, 2),"Nguyen Van Hinh", "1084321153", "1989", "Nam", "01/01/2018", "Chụp XQuang Ngực",randomModality()]
            : index % 3 === 1
            ? [randomInt(0, 2),"Nguyen Cong Tu", "1084321153", "1989", "Nam", "01/01/2018", "Chụp XQuang Ngực",randomModality()]
            : [randomInt(0, 2),"Bui Hoang Danh", "1084321153", "2003", "Nam", "01/01/2018", "Chụp XQuang Ngực",randomModality()]);
    }
    localStorage.setItem("cases", JSON.stringify(cases));
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
    let addCD = document.getElementById("addCD");
    let saveCD = document.getElementById("saveCD");
    let confirm = document.getElementById("confirm");
    let printAndConfirm = document.getElementById("print-and-confirm");
    let print = document.getElementById("print");
    let quickPrint = document.getElementById("quick-print");
    let changeCD = document.getElementById("change-predict");
    let rows = tableBody.querySelectorAll("tr");
    let targetRow = rows[id];

    if (targetRow.classList.contains("active-tr")) {
        targetRow.classList.remove("active-tr");
        targetRow.querySelectorAll("td").forEach(td => {
            td.classList.remove("active-td");
        });
        addCD.disabled = true;
        saveCD.disabled = true;
        confirm.disabled = true;
        printAndConfirm.disabled = true;
        print.disabled = true;
        changeCD.disabled = true;
        quickPrint.disabled = true;
        confirm.onclick = null;
        changeCD.onclick = null;
        quickPrint.onclick = null;
        printAndConfirm.onclick = null;
        print.onclick = null;
    }else{
        tableBody.querySelectorAll("tr").forEach(row => {
            row.classList.remove("active-tr");
            row.querySelectorAll("td").forEach(td => td.classList.remove("active-td"));
        });
        targetRow.classList.add("active-tr");
        targetRow.querySelectorAll("td").forEach(td => {
            td.classList.add("active-td");
        });
        addCD.disabled = false;
        saveCD.disabled = false;
        confirm.disabled = false;
        printAndConfirm.disabled = false;
        if(cases[id][0]!==1){
            print.disabled = true;
        }else{
            print.disabled = false;
            print.onclick = function() {
                printAction(id);
            };
        }
        changeCD.disabled = false;
        quickPrint.disabled = false;
        confirm.onclick = function() {
            confirmAction(id);
        };
        
        changeCD.onclick = function() {
            change(id);
        };
        quickPrint.onclick = function() {
            quickPrintAction(id);
        };
        printAndConfirm.onclick = function() {
            printAndConfirmAction(id);
        };
    }
}
function confirmAction(id) {
    if (id >= 0 && id < cases.length) {
        cases[id][0] = 1;

        localStorage.setItem("cases", JSON.stringify(cases));

        displayPatient();
    }else {
            alert("ID không hợp lệ!");
    }
}
function printAction(id) {
    if (id >= 0 && id < cases.length && cases[id][0] === 1) {
        console.log("---- Thông tin ca bệnh ----");
        console.log("Tên bệnh nhân:", cases[id][1]);
        console.log("Số CMND:", cases[id][2]);
        console.log("Năm sinh:", cases[id][3]);
        console.log("Giới tính:", cases[id][4]);
        console.log("Ngày vào viện:", cases[id][5]);
        console.log("Loại chụp:", cases[id][6]);
        console.log("Modality:", cases[id][7]);
        console.log("----------------------------");
        cases[id][0] = 2;
        localStorage.setItem("cases", JSON.stringify(cases));
        displayPatient();
    } else {
        alert("ID không hợp lệ!");
    }
}
function printAndConfirmAction(id) {
    confirmAction(id);
    printAction(id);
}
function quickPrintAction(id) {
    if (id >= 0 && id < cases.length) {
        console.log("---- Thông tin ca bệnh ----");
        console.log("Tên bệnh nhân:", cases[id][1]);
        console.log("Số CMND:", cases[id][2]);
        console.log("Năm sinh:", cases[id][3]);
        console.log("Giới tính:", cases[id][4]);
        console.log("Ngày vào viện:", cases[id][5]);
        console.log("Loại chụp:", cases[id][6]);
        console.log("Modality:", cases[id][7]);
        console.log("----------------------------");
    } else {
        alert("ID không hợp lệ!");
    }
}
function change(id){

}
function updateActionButtons() {
    let addCD = document.getElementById("addCD");
    let saveCD = document.getElementById("saveCD");
    let confirm = document.getElementById("confirm");
    let printAndConfirm = document.getElementById("print-and-confirm");
    let print = document.getElementById("print");
    let quickPrint = document.getElementById("quick-print");
    let changeCD = document.getElementById("change-predict");

    if (selectedList.length === 0) {
        confirm.disabled = true;
        print.disabled = true;
        quickPrint.disabled = true;
        printAndConfirm.disabled = true;
        changeCD.disabled = true;

        confirm.onclick = null;
        changeCD.onclick = null;
        quickPrint.onclick = null;
        printAndConfirm.onclick = null;
        print.onclick = null;
    } else {
        confirm.disabled = false;
        print.disabled = false;
        quickPrint.disabled = false;
        printAndConfirm.disabled = false;
        changeCD.disabled = false;

        confirm.onclick = function() {
            selectedList.forEach(id => {
                confirmAction(id);
            });
            selectedList = [];
        };

        changeCD.onclick = function() {
            selectedList.forEach(id => {
                change(id);
            });
            selectedList = [];
        };

        quickPrint.onclick = function() {
            selectedList.forEach(id => {
                quickPrintAction(id);
            });
            selectedList = [];
        };

        printAndConfirm.onclick = function() {
            selectedList.forEach(id => {
                printAndConfirmAction(id);
            });
            selectedList = [];
        };

        print.onclick = function() {
            selectedList.forEach(id => {
                printAction(id);
            });
            selectedList = [];
        };
    }
}

function bindCheckboxEvents() {
    const rowCheckboxes = document.querySelectorAll(".row-checkbox");
    const selectAllCheckbox = document.getElementById("selectAll");

    rowCheckboxes.forEach(cb => {
        cb.addEventListener("change", () => {
            const id = parseInt(cb.getAttribute("data-id"), 10);

            if (cb.checked) {
                if (!selectedList.includes(id)) {
                    selectedList.push(id);
                }
            } else {
                selectedList = selectedList.filter(item => item !== id);
            }

            console.log("Danh sách đã chọn:", selectedList);

            updateActionButtons();

            const total = rowCheckboxes.length;
            const checked = document.querySelectorAll(".row-checkbox:checked").length;
            selectAllCheckbox.checked = (checked === total);
        });
    });

    selectAllCheckbox.addEventListener("change", () => {
        const isChecked = selectAllCheckbox.checked;
        selectedList = [];

        rowCheckboxes.forEach(cb => {
            cb.checked = isChecked;
            const id = parseInt(cb.getAttribute("data-id"), 10);
            if (isChecked) {
                selectedList.push(id);
            }
        });

        console.log("Danh sách đã chọn:", selectedList);

        updateActionButtons();
    });
}
function displayPatient() {
    let body = document.getElementById("table-body");
    body.innerHTML = "";

    let start = perPage * (currentPage - 1);
    let end = Math.min(start + perPage, cases.length);

    let fragment = document.createDocumentFragment();

    for (let i = start; i < end; i++) {
        let row = document.createElement("tr"); 
        row.setAttribute("data-id", i);

        row.innerHTML = `
            <td>
                <input class="form-check-input row-checkbox" type="checkbox" data-id="${i}">
                ${status[cases[i][0]]}
            </td>
            <td>${cases[i][1]}</td>
            <td>${cases[i][2]}</td>
            <td>${cases[i][3]}</td>
            <td>${cases[i][4]}</td>
            <td><i class="fa fa-envelope"></i></td>
            <td>${cases[i][5]}</td>
            <td>${cases[i][6]}</td>
            <td>${cases[i][7]}</td>`;

        row.addEventListener("click", function (e) {
            if (e.target && e.target.classList.contains('row-checkbox')) return;
            const rowId = parseInt(this.getAttribute("data-id"), 10);
            selectTr(rowId);
        });

        fragment.appendChild(row);
    }

    body.appendChild(fragment);

    const selectAllCheckbox = document.getElementById("selectAll");
    selectAllCheckbox.checked = false;

    bindCheckboxEvents();
    updateActionButtons();
    similarPatient();
}



function similarPatient() {
    let secondTableBody = document.getElementById("second-table-body");
    let checkedCheckboxes = document.querySelectorAll("#table-body .row-checkbox:checked");

    secondTableBody.innerHTML = "";

    let start = 0;
    let end = 4;

    if (checkedCheckboxes.length > 0) {
        let selectedRowIndex = checkedCheckboxes[0].parentNode.parentNode.rowIndex - 1;
        let selectedPatientName = cases[selectedRowIndex][1];

        let similarByName = cases.filter(patient => patient[1] === selectedPatientName);

        let fragment = document.createDocumentFragment();

        for (let i = start; i < end && i < similarByName.length; i++) {
            let row = document.createElement("tr");

            row.innerHTML = `
                <td><input class="form-check-input row-checkbox" type="checkbox">${status[similarByName[i][0]]}</td>
                <td>${similarByName[i][1]}</td>
                <td>${similarByName[i][2]}</td>
                <td>${similarByName[i][3]}</td>
                <td>${similarByName[i][4]}</td>
                <td><i class="fa fa-envelope"></i></td>
                <td>${similarByName[i][5]}</td>
                <td>${similarByName[i][6]}</td>
                <td>${similarByName[i][7]}</td>
            `;

            fragment.appendChild(row);
        }

        secondTableBody.appendChild(fragment);

    } else {
        let fragment = document.createDocumentFragment();

        for (let i = start; i < end && i < cases.length; i++) {
            let row = document.createElement("tr");

            row.innerHTML = `
                <td><input class="form-check-input row-checkbox" type="checkbox">${status[cases[i][0]]}</td>
                <td>${cases[i][1]}</td>
                <td>${cases[i][2]}</td>
                <td>${cases[i][3]}</td>
                <td>${cases[i][4]}</td>
                <td><i class="fa fa-envelope"></i></td>
                <td>${cases[i][5]}</td>
                <td>${cases[i][6]}</td>
                <td>${cases[i][7]}</td>
            `;

            fragment.appendChild(row);
        }

        secondTableBody.appendChild(fragment);
    }
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
function selectAll() {
    const selectAllCheckbox = document.getElementById("selectAll");
    const rowCheckboxes = document.querySelectorAll("#table-body .row-checkbox");

    rowCheckboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
}
totalCases();
displayPatient();
pageList();
similarPatient();
document.addEventListener('keydown', function(event) {
    
    if (event.altKey && event.key.toLowerCase() === 'n') {
      document.getElementById('addCD').click();
    }

    if (event.altKey && event.key.toLowerCase() === 'd') {
      document.getElementById('saveCD').click();
    }
    
    if (event.altKey && event.key.toLowerCase() === 'c') {
      document.getElementById('confirm').click();
    }
    if (event.altKey && event.key.toLowerCase() === 'v') {
      document.getElementById('show-img').click();
    }
});
document.getElementById('addCD').addEventListener('click', function() {
    alert('Đã bấm Thêm CD!');
});
document.getElementById('saveCD').addEventListener('click', function() {
    alert('Đã bấm Lưu nháp!');
});
document.getElementById('confirm').addEventListener('click', function() {
    alert('Đã bấm Xác nhận!');
});
document.getElementById('print').addEventListener('click', function() {
    alert('Đã bấm In!');
});
document.getElementById('quick-print').addEventListener('click', function() {
    alert('Đã bấm In nhanh!');
});
document.getElementById('change-predict').addEventListener('click', function() {
    alert('Đã bấm Thay đổi dự đoán!');
});
document.getElementById('print-and-confirm').addEventListener('click', function() {
    alert('Đã bấm In và xác nhận!');
});
const items = document.querySelectorAll('.image-item');

  items.forEach(item => {
    item.addEventListener('click', () => {
      // items.forEach(i => i.classList.remove('selected'));
      item.classList.toggle('selected');
    });
  });
  document.querySelector('.btn-primary').addEventListener('click', () => {
    alert('Đang chụp ảnh...');
  });