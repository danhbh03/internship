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

