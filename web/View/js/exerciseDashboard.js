let visualizer = document.getElementById('popup-exer-visualizer');
let singleVisualizer = document.getElementById('exercise-visualizer-container-single');
let multipleVisualizer = document.getElementById('exercise-visualizer-container-multiple');
let visibilityClass = 'open-visualizer-popup';

function openExerciseVisualizer(exe_id) {
    let buttonHtml = `<button class="popup-action-button" id="popup-action-button" type="submit"
        onclick="closeExerciseVisualizer()">Chiudi</button><button class="popup-action-button" id="edit-ex-button" onclick="editExercise('${exe_id}')">Modifica</button>`
    document.getElementById("visualizer-options").innerHTML = (buttonHtml);

    if (exe_id.includes("ExM_")) {
        multipleVisualizer.classList.add(visibilityClass);
        document.getElementById('ex-uuid_M').innerText = exe_id;

        fetch(`http://localhost/Routes/StorageRoutes.php/getSingleExercise/${exe_id}`)
            .then((response) => response.json())
            .then((data) => {

                data = JSON.parse(data);
                console.log(data.question);
                let table = document.getElementById("exercise-multiple-visualizer-table");
                let dataRow = table.rows[1];

                let exerciseType = "Dom. Ris. Multipla";

                dataRow.cells[1].innerHTML = data.question;
                dataRow.cells[2].innerHTML = exerciseType;
                dataRow.cells[3].innerHTML = data.points;
                dataRow.cells[4].innerHTML = data.answer1;
                dataRow.cells[5].innerHTML = data.answer2;
                dataRow.cells[6].innerHTML = data.answer3;
                dataRow.cells[7].innerHTML = data.answer4;
                visualizer.classList.add(visibilityClass);
            });


    } else if (exe_id.includes("ExS_")) {
        singleVisualizer.classList.add(visibilityClass);
        document.getElementById('ex-uuid_S').innerText = exe_id;

        fetch(`http://localhost/Routes/StorageRoutes.php/getSingleExercise/${exe_id}`)
            .then((response) => response.json())
            .then((data) => {

                data = JSON.parse(data);
                console.log(data.question);
                let table = document.getElementById("exercise-single-visualizer-table");
                let dataRow = table.rows[1];

                let exerciseType = "Dom. Ris. Aperta";

                dataRow.cells[1].innerHTML = data.question;
                dataRow.cells[2].innerHTML = exerciseType;
                dataRow.cells[3].innerHTML = data.points;
                visualizer.classList.add(visibilityClass);
            });

    }

}

function closeExerciseVisualizer() {
    visualizer.classList.remove(visibilityClass);
    multipleVisualizer.classList.remove(visibilityClass);
    singleVisualizer.classList.remove(visibilityClass);
}

function editExercise(exId) {
    closeExerciseVisualizer();

    if (exId.includes("ExS_")) {
        //TODO - extract
        fetch(`http://localhost/Routes/StorageRoutes.php/getSingleExercise/${exId}`)
            .then((response) => response.json())
            .then((data) => {

                data = JSON.parse(data);
                let exerciseType = "Dom. Ris. Aperta";
                let dataArary = new Array(exId, data.question, exerciseType, data.points);

                openTemplateCreator("single", dataArary);
            });

    }
    if (exId.includes("ExM_")) {
        fetch(`http://localhost/Routes/StorageRoutes.php/getSingleExercise/${exId}`)
            .then((response) => response.json())
            .then((data) => {

                data = JSON.parse(data);
                let exerciseType = "Dom. Ris. Multiple";
                let dataArary = new Array(exId, data.question, exerciseType, data.points);

                openTemplateCreator("multiple", dataArary);
            });

    }
    //placeholder, request data to server

}

function deleteExercise(exe_id, button) {
    console.log(exe_id);

    var table = document.getElementById('exercise-list-table');
    var currentRow = (button).closest('tr');
    var rows = table.rows;

    for (i = 1; i < rows.length; i++) {
        var row = rows[i];
        if (row === currentRow) {

            console.log("ok");

            fetch(`http://localhost/Routes/StorageRoutes.php/removeExercise/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(exe_id),
            }).then((data) => {
                console.log(data.text());
                table.deleteRow(i);
            });
            return;
        }
    }
}

let typeSelectorHTML = "<select name=\"exType\" id=\"exType\"><option value=\"ExS_\">Risposta Aperta</option>"
    + "<option value=\"ExM_\">Risposta Multipla</option></select>";


function saveExercise(isNew) {
    let uuid = document.getElementById('template_ex_uuid').innerText;
    if (uuid.includes("ExM_")) {
        if (isNew)
            createExerciseMultiple();
        else
            updateExerciseMultiple();
    } else if (uuid.includes("ExS_")) {
        if (isNew)
            createExerciseSingle();
        else
            updateExerciseSingle();
    }
    closeTemplateCreator();
}

function updateExerciseMultiple() {
    var table = document.getElementById('exercise-data-container-multiple');
    let dataArray = table.rows[1].cells;

    let htmlStrippedData = {};
    for (let i = 0; i < dataArray.length; i++) {
        switch (i) {
            case 0:
                htmlStrippedData.id = dataArray[i].innerText;
                break;
            case 1:
                htmlStrippedData.question = dataArray[i].children[0].value;
                break;
            case 3:
                htmlStrippedData.points = dataArray[i].children[0].value;
                break;
            case 4:
                htmlStrippedData.answer1 = dataArray[i].children[0].value;
                break;
            case 5:
                htmlStrippedData.answer2 = dataArray[i].children[0].value;
                break;
            case 6:
                htmlStrippedData.answer3 = dataArray[i].children[0].value;
                break;
            case 7:
                htmlStrippedData.answer4 = dataArray[i].children[0].value;
                break;
            default:
                break;
        }
    }

    fetch(`http://localhost/Routes/StorageRoutes.php/updateExercise/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(htmlStrippedData),
    }).then(() => {
        location.reload();
    });
}

function updateExerciseSingle() {
    var table = document.getElementById('exercise-data-container-single');
    let dataArray = table.rows[1].cells;

    let htmlStrippedData = {};
    for (let i = 0; i < dataArray.length; i++) {
        switch (i) {
            case 0:
                htmlStrippedData.id = dataArray[i].innerText;
                break;
            case 1:
                htmlStrippedData.question = dataArray[i].children[0].value;
                break;
            case 3:
                htmlStrippedData.points = dataArray[i].children[0].value;
                break;
            /*case 4:
                htmlStrippedData.answer1 = dataArray[i].children[0].value;
                break;
            case 5:
                htmlStrippedData.answer2 = dataArray[i].children[0].value;
                break;
            case 6:
                htmlStrippedData.answer3 = dataArray[i].children[0].value;
                break;
            case 7:
                htmlStrippedData.answer4 = dataArray[i].children[0].value;
                break;*/
            default:
                break;
        }
    }

    fetch(`http://localhost/Routes/StorageRoutes.php/updateExercise/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(htmlStrippedData),
    }).then(() => {
        location.reload();
    });
}

function createExerciseMultiple() {
    var table = document.getElementById('exercise-data-container-multiple');
    let dataArray = table.rows[1].cells;
    console.log("Multipel table = " + dataArray);
    addNewExercise(dataArray);
}

function createExerciseSingle() {
    var table = document.getElementById('exercise-data-container-single');
    let dataArray = table.rows[1].cells;

    addNewExercise(dataArray);
}

function addNewExercise(dataArray) {
    let htmlStrippedData = {};
    for (let i = 0; i < dataArray.length; i++) {
        switch (i) {
            case 0:
                htmlStrippedData.id = dataArray[i].innerText;
                break;
            case 1:
                htmlStrippedData.question = dataArray[i].children[0].value;
                break;
            case 3:
                htmlStrippedData.points = dataArray[i].children[0].value;
                break;
            case 4:
                htmlStrippedData.answer1 = dataArray[i].children[0].value;
                break;
            case 5:
                htmlStrippedData.answer2 = dataArray[i].children[0].value;
                break;
            case 6:
                htmlStrippedData.answer3 = dataArray[i].children[0].value;
                break;
            case 7:
                htmlStrippedData.answer4 = dataArray[i].children[0].value;
                break;
            default:
                break;
        }
    }

    console.log(htmlStrippedData);

    fetch(`http://localhost/Routes/StorageRoutes.php/addExercise/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(htmlStrippedData),
    }).then(() => {
        addExerciseRowHtml(dataArray);
    });

}

//TODO - Check a for Fix first col (display none on cell cannot write)
function addExerciseRowHtml(dataArray) {
    let buttonHTML = `<button class="action-button" type="submit" onclick="openExerciseVisualizer('${dataArray[0].innerText}')">Visualizza</button><br><button class="action-button" onclick="deleteExercise('${dataArray[0].innerText}',this)">Elimina</button>`;
    //buttonHTML = buttonHTML.replaceAll("$$$", dataArray[0].innerText);

    let table = document.getElementById('exercise-list-table');
    let newRow = table.insertRow(table.rows.length);
    //newRow.insertCell(0).innerHTML = dataArray[0].innerText;
    newRow.insertCell(1 - 1).innerHTML = dataArray[1].children[0].value;
    newRow.insertCell(2 - 1).innerHTML = dataArray[2].innerText;
    newRow.insertCell(3 - 1).innerHTML = dataArray[3].children[0].value;
    newRow.insertCell(4 - 1).innerHTML = buttonHTML;
}

let templateContainer = document.getElementById("popup-exercise-template-container");
let templateSingle = document.getElementById("exercise-single-template");
let templateMultiple = document.getElementById("exercise-multiple-template")

function openTemplateCreator(templateType, dataArray) {
    console.log(dataArray);
    templateContainer.classList.add(visibilityClass);
    closeTypeSelectorPopup();//TODO - Remove

    let value = false;

    if (templateType === 'single') {
        templateSingle.classList.add(visibilityClass);

        if (dataArray === undefined || dataArray.length === 0) {
            dataArray = new Array("ExS_" + Date.now());
            value = true;
        }

        fillTemplateData(templateType, dataArray)
    } else if (templateType === 'multiple') {
        templateMultiple.classList.add(visibilityClass);

        if (dataArray === undefined || dataArray.length === 0) {
            dataArray = new Array("ExM_" + Date.now());
            value = true;
        }

        fillTemplateData(templateType, dataArray);
    }

    let buttons = `<button class="popup-action-button" id="popup-action-button" type="submit"
        onclick="closeTemplateCreator()">Annulla</button>
      <button class="popup-action-button" onclick="saveExercise(${value})">Salva</button>`

    document.getElementById("edit-mode-buttons").innerHTML = buttons;

}

function closeTemplateCreator() {
    templateContainer.classList.remove(visibilityClass);
    templateSingle.classList.remove(visibilityClass);
    templateMultiple.classList.remove(visibilityClass);
}

function openTypeSelector() {
    let selectorVisualizer = document.getElementById('popup-exercise-type-selector');
    selectorVisualizer.classList.add(visibilityClass);
}

function closeTypeSelectorPopup() {
    let selectorVisualizer = document.getElementById('popup-exercise-type-selector');
    selectorVisualizer.classList.remove(visibilityClass);
}

//TODO - Beautify
function fillTemplateData(templateType, dataArray) {
    document.getElementById("template_ex_uuid").innerText = dataArray[0];
    let isMultiple;
    if (templateType === 'multiple')
        isMultiple=true;
    else
        isMultiple=false;

    if (isMultiple) {
        let uuidM = document.getElementById('ex-uuid_M_');
        uuidM.innerText = dataArray[0];
    } else {
        let uuidM = document.getElementById('ex-uuid_S_');
        uuidM.innerText = dataArray[0];
    }

    if (dataArray.length == 1) return;

    if (isMultiple) {
        let question = document.getElementById('question_multiple');
        let exType = document.getElementById('ex_type_multiple');
        let points = document.getElementById('points_multiple');

        question.value = dataArray[1];
        exType.innerHTML.innerText = dataArray[2];
        points.value = dataArray[3];

    } else {
        let question = document.getElementById('question_single');
        let exType = document.getElementById('ex_type_single');
        let points = document.getElementById('points_single');

        question.value = dataArray[1];
        exType.innerHTML.innerText = dataArray[2];
        points.value = dataArray[3];
    }

    if (dataArray.length <= 4) return;

    if (isMultiple) {
        let answer1 = document.getElementById('answ_1');
        let answer2 = document.getElementById('answ_2');
        let answer3 = document.getElementById('answ_3');
        let answer4 = document.getElementById('answ_4');

        answer1.value = dataArray[4];
        answer2.value = dataArray[5];
        answer3.value = dataArray[6];
        answer4.value = dataArray[7];
    }
}

//////////////////

fetch('http://localhost/Routes/StorageRoutes.php/getExercises')
    .then((response) => response.json())
    .then((exercisesData) => {

        for (let key in exercisesData) {
            let exerciseType = "error";
            let exercise = JSON.parse(exercisesData[key]);

            if (exercise.id.includes("ExS_"))
                exerciseType = "Domanda risposta aperta";
            else if (exercise.id.includes("ExM_"))
                exerciseType = "Domanda risposta multipla";

            let exerciseDataArray = new Array(exercise.id, exercise.question, exerciseType, exercise.points);
            addExerciseRow(exerciseDataArray);
        }

    });

//Todo - Merge with HTMLType
function addExerciseRow(dataArray) {
    let buttonHTML = "<button class=\"action-button\" type=\"submit\" onclick=\"openExerciseVisualizer('$$$')\">Visualizza</button>\n<button class=\"action-button\" onclick=\"deleteExercise('$$$',this)\">Elimina</button>";
    buttonHTML = buttonHTML.replaceAll("$$$", dataArray[0]);

    let table = document.getElementById('exercise-list-table');
    let newRow = table.insertRow(-1);
    //newRow.insertCell(0).innerHTML = dataArray[0].innerText;
    newRow.insertCell(1 - 1).innerHTML = dataArray[1];
    newRow.insertCell(2 - 1).innerHTML = dataArray[2];
    newRow.insertCell(3 - 1).innerHTML = dataArray[3];
    newRow.insertCell(4 - 1).innerHTML = buttonHTML;


}