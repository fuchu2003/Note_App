//call all save note to page
saveNoteShow();

//add all notes to local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let mainTitle = document.getElementById("title");
    let mainTxt = document.getElementById("mainTxt");
    if (mainTxt.value.length == "" && mainTitle.value.length == "") {
        alert("Empty Inputs Can Not Be Added");
        mainTitle.style.border = "1px groove red";
        mainTxt.style.border = "1px groove red";
    }else if(mainTitle.value.length == ""){
        alert("Must Add Your Title");
        mainTitle.style.border = "1px groove red";
        mainTxt.style.border = "";
    }else if(mainTxt.value.length == ""){
        alert("Add Your Note");
        mainTxt.style.border = "1px groove red";
        mainTitle.style.border = "";
    } else {
        let note = localStorage.getItem("note");

        if (note == null) {
            noteObj = [];
        } else {
            noteObj = JSON.parse(note);
        }
        let newNote = {
            title: mainTitle.value,
            note: mainTxt.value
        }
    
        noteObj.push(newNote);
        localStorage.setItem("note", JSON.stringify(noteObj));
        mainTitle.value = "";
        mainTxt.value = "";
        mainTitle.style.border = "";
        mainTxt.style.border = "";
        saveNoteShow();
    }
})

//note show to the page

function saveNoteShow() {
    let note = localStorage.getItem("note");

    if (note == null) {
        noteObj = [];
    } else {
        noteObj = JSON.parse(note);
    }

    let html = "";

    noteObj.forEach(function (element, index) {
        html += `
                    <div class="allNote">
                    <h3 id="noteHead">${element.title}</h3>
                    <p id="note-text"><pre>${element.note}</pre></p>
                    <button class="allBtn" id="${index}" onClick = deleteThis(this.id)>Delete</button>
                    </div>
                `;
    });
    let save = document.getElementById("savedNotes");

    if (noteObj.length > 0) {
        save.innerHTML = html;
    } else {
        save.innerHTML = `<p id="nothing">Nothing to show Please Type Something above</p>`
    }
}

//delete note

function deleteThis(index) {
    let note = localStorage.getItem("note");

    if (note == null) {
        noteObj = [];
    } else {
        noteObj = JSON.parse(note);
    }

    noteObj.splice(index, 1);
    localStorage.setItem("note", JSON.stringify(noteObj));
    saveNoteShow();
}

//search filter

let search = document.getElementById('searchTxt');
search.addEventListener("input", function() {

    let searchValue = search.value;
    let allSaveNote = document.getElementsByClassName("allNote");
    Array.from(allSaveNote).forEach(function(element) {
        let inTitle = element.getElementsByTagName('h3')[0].innerText;
        let inText = element.getElementsByTagName('p')[0].innerText;
        if (inTitle.includes(searchValue) || inText.includes(searchValue)){
            element.style.display = "flex";
        }else{
            element.style.display = "none";
        }
    })

})


