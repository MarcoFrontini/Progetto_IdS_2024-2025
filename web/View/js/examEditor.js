let visualizer = document.getElementById('popup-exer-visualizer');
let singleVisualizer = document.getElementById('exercise-visualizer-container-single');
let multipleVisualizer = document.getElementById('exercise-visualizer-container-multiple');
let exerciseContainer = document.getElementById('exercise-visualizer-container');
let visibilityClass = 'open-visualizer-popup';

/// ON LOAD ///

function tryGetData() {
    console.log("on load");
    let urlVar = new URLSearchParams(window.location.search).get("examid");
    if (urlVar === null)
        return;

    fetch(`http://localhost/Routes/StorageRoutes.php/getSingleExam/${urlVar}`)
        .then((response) => response.json())
        .then((examData) => {
            examData = JSON.parse(examData);

            document.getElementById("exam-title").value = examData.name;

            Array.prototype.forEach.call(examData.sections, function (section) {
                addSection(section.name);
            });

            //You can't read and write an array at the same time
            let ulSection = document.getElementById('section-list').children;
            let i = 0;
            Array.prototype.forEach.call(examData.sections, function (section) {
                Array.prototype.forEach.call(section.exercises, function (exercise) {
                    callerButtonLi = ulSection[i];
                    selectExercise(exercise.id);
                });
                i++;
            });

        });
}

/// SECTION ///
function moveSectionDown(sectionId, button) {
    ulMoveLiDown(button);
}

function moveSectionUp(sectionId, button) {
    ulMoveLiUp(button);
}

function addSection(name) {

    let ulSection = document.getElementById('section-list');
    //console.log(ulSection.children.length)
    let val = ulSection.children.length + 1;
    let sectionName = `Sezione #${val}`
    if (name !== null && name !== undefined)
        sectionName = name;

    ulSection.innerHTML += `<li><div class="section">
            <div class="section-header">
              <input type="text" placeholder="Nome Sezione" class="section-name" value="${sectionName}"></input><br><button class="option-button" type="submit" onclick="removeSection(this)">Rimuovi</button><button class="option-button" type="submit" onclick="moveSectionDown('',this)">Sposta giù</button><button class="option-button" type="submit" onclick="moveSectionUp('',this)">Sposta
                su</button><button class="option-button" type="submit" onclick="addExercise(this)"> Aggiungi
                Esercizio</button>
            </div><ol class="exercises-list"></ol></li>`;
}

function removeSection(button) {
    removeUlLi(button);
}

/// EXERCISE ///
function moveExerciseUp(button) {
    olMoveLiUp(button);
}

function moveExerciseDown(button) {
    olMoveLiDown(button);
}

let callerButtonLi;

function addExercise(button) {
    //open selector panel
    callerButtonLi = button.closest('li');
    openListContainer();
}

function removeExercise(button) {
    removeOlLi(button);
}

/// EXAM ///

function saveExam() {
    let examId;
    let urlVar = new URLSearchParams(window.location.search).get("examid");
    if (urlVar === null)
        examId = "Exa_" + Date.now();
    else
        examId = urlVar;

    var obj = {};

    obj.id = examId;
    obj.name = document.getElementById("exam-title").value;

    let sections = {};
    //TODO - Get List -> get first item in the list = first section
    let sectionList = document.getElementById("section-list").children;
    let i = 0;
    Array.prototype.forEach.call(sectionList, function (section) {
        let name = section.getElementsByClassName("section-name")[0].value;

        let sectionObj = {};
        sectionObj.name = name;

        let exerciseList = section.getElementsByClassName("exercises-list")[0].children;
        let exerciseListObj = {};
        let j = 0;

        Array.prototype.forEach.call(exerciseList, function (exercise) {
            let exerciseObj = {};
            exerciseObj.id = exercise.getElementsByClassName("ex")[0].id
            exerciseListObj[`${j}`] = exerciseObj;
            j++;
        });


        sectionObj.exercises = exerciseListObj;

        sections[`${i}`] = sectionObj;
        i++;
    });

    obj.sections = sections
    let jsonFormat = JSON.stringify(obj);

    fetch(`http://localhost/Routes/StorageRoutes.php/addExam/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonFormat,
    }).then(() => {
        cancel();
    });

}
//TODO GET DATA FROM EDIT
function cancel() {
    window.location.href = "./examDashboard.html";
}

/// GENERAL ///

function LiMover(liParent) {
    this.kids = liParent.children;
    this.move = (index, beforeIndex = null) => {
        const k = this.kids, e = k[index];
        if (beforeIndex === null) {
            liParent.appendChild(e)
        }
        else {
            liParent.insertBefore(e, k[beforeIndex]);
        }
        return this;
    }
}

function getUlLiIndex(ul, li) {
    for (let i = 0; i < ul.children.length; i++) {
        if (ul.children[i] === li)
            return i;
    }

    return 0;
}

function ulMoveLiDown(button) {
    let ulElement = button.closest('ul');
    let liElement = button.closest('li');

    let liIndex = getUlLiIndex(ulElement, liElement);

    const liMover = new LiMover(ulElement);
    liMover.move(liIndex, liIndex + 2);
}

function ulMoveLiUp(button) {
    let ulElement = button.closest('ul');
    let liElement = button.closest('li');

    let liIndex = getUlLiIndex(ulElement, liElement);

    const liMover = new LiMover(ulElement);
    liMover.move(liIndex, liIndex - 1);
}

function removeUlLi(button) {
    let ulElement = button.closest('ul');
    let liElement = button.closest('li');

    if (ulElement.children.length > 1)
        ulElement.removeChild(liElement);
}

function olMoveLiDown(button) {
    let olElement = button.closest('ol');
    let liElement = button.closest('li');

    let liIndex = getUlLiIndex(olElement, liElement);

    const liMover = new LiMover(olElement);
    liMover.move(liIndex, liIndex + 2);
}

function olMoveLiUp(button) {
    let olElement = button.closest('ol');
    let liElement = button.closest('li');

    let liIndex = getUlLiIndex(olElement, liElement);

    const liMover = new LiMover(olElement);
    liMover.move(liIndex, liIndex - 1);
}

function removeOlLi(button) {
    let olElement = button.closest('ol');
    let liElement = button.closest('li');

    olElement.removeChild(liElement);
}

/// /// Exercise List Container /// ///

function closeListContainer() {
    document.getElementById("exercise-visualizer-container").classList.remove(visibilityClass);
}

function openListContainer() {
    console.log("executed");
    fetch('http://localhost/Routes/StorageRoutes.php/getExercises')
        .then((response) => response.json())
        .then((exercisesData) => {

            if (document.getElementById("exercise-list-table").rows.length <= 1)
                for (let key in exercisesData) {
                    let exerciseType = "error";
                    let exercise = JSON.parse(exercisesData[key]);
                    console.log(exercise.id);
                    if (exercise.id.includes("ExS_"))
                        exerciseType = "Domanda risposta aperta";
                    else if (exercise.id.includes("ExM_"))
                        exerciseType = "Domanda risposta multipla";

                    let exerciseDataArray = new Array(exercise.id, exercise.question, exerciseType, exercise.points);

                    addExerciseRow(exerciseDataArray);

                }
            document.getElementById("exercise-visualizer-container").classList.add(visibilityClass);
        });
}

function addExerciseRow(dataArray) {
    let buttonHTML = `<button class="option-button" type="submit" onclick="openExerciseVisualizer('${dataArray[0]}')">Visualizza</button>`;
    //buttonHTML = buttonHTML.replaceAll("$$$", dataArray[0]);

    let table = document.getElementById('exercise-list-table');
    let newRow = table.insertRow(-1);
    //newRow.insertCell(0).innerHTML = dataArray[0].innerText;
    newRow.insertCell(1 - 1).innerHTML = dataArray[1];
    newRow.insertCell(2 - 1).innerHTML = dataArray[2];
    newRow.insertCell(3 - 1).innerHTML = dataArray[3];
    newRow.insertCell(4 - 1).innerHTML = buttonHTML;
}

function openExerciseVisualizer(exe_id) {
    let buttonHtml = `<button class="popup-option-button" id="popup-option-button" type="submit"
        onclick="closeExerciseVisualizer()">Chiudi</button><button class="popup-option-button" id="edit-ex-button" onclick="selectExercise('${exe_id}')">Seleziona</button>`
    document.getElementById("visualizer-options").innerHTML = (buttonHtml);

    /*if (exe_id.includes("ExM_")) {
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

    }*/

    fetch(`http://localhost/Routes/StorageRoutes.php/getSingleExercise/${exe_id}`)
        .then((response) => response.json())
        .then((data) => {

            data = JSON.parse(data);
            console.log(data.question);
            let table;
            let isMultiple;
            if (exe_id.includes("ExS_")) {
                singleVisualizer.classList.add(visibilityClass);
                table = document.getElementById("exercise-single-visualizer-table");
                isMultiple = false;
            }
            else if (exe_id.includes("ExM_")) {
                multipleVisualizer.classList.add(visibilityClass);
                table = document.getElementById("exercise-multiple-visualizer-table");
                isMultiple = true;
            }

            console.log(isMultiple === true)

            let dataRow = table.rows[1];

            let exerciseType
            if (isMultiple)
                exerciseType = "Dom. Ris. Multipla";
            else
                exerciseType = "Dom. Ris. Aperta";

            dataRow.cells[1].innerHTML = data.question;
            dataRow.cells[2].innerHTML = exerciseType;
            dataRow.cells[3].innerHTML = data.points;

            if (isMultiple) {
                dataRow.cells[4].innerHTML = data.answer1;
                dataRow.cells[5].innerHTML = data.answer2;
                dataRow.cells[6].innerHTML = data.answer3;
                dataRow.cells[7].innerHTML = data.answer4;
            }
            visualizer.classList.add(visibilityClass);
        });

}

function selectExercise(exeId) {
    let exList = callerButtonLi.getElementsByClassName('exercises-list')[0];
    if (exeId.includes("ExM_")) {
        multipleVisualizer.classList.add(visibilityClass);

        fetch(`http://localhost/Routes/StorageRoutes.php/getSingleExercise/${exeId}`)
            .then((response) => response.json())
            .then((data) => {

                data = JSON.parse(data);

                let htmlFormat = `<li>
                <div class="ex" id="${exeId}">
                  <div class="ex-header">
                    <p class="ex_name">${data.question}</p> <p>(${data.points} punti)</p>
                    <div class="exercise-buttons-options-inner html-only"><button class="option-button" type="submit"
                        onclick="moveExerciseUp(this)">Sposta su</button><button class="option-button" type="submit"
                        onclick="moveExerciseDown(this)">Sposta giù</button><button class="option-button" type="submit"
                        onclick="removeExercise(this)">Rimuovi</button>
                    </div>
                  </div>
                  <ol type="a">
                    <li>
                      ${data.answer1}
                    </li>
                    <li>
                      ${data.answer2}
                    </li>
                    <li>
                      ${data.answer3}
                    </li>
                    <li>
                      ${data.answer4}
                    </li>
                  </ol>
                </div></li>`;

                exList.innerHTML += htmlFormat;
            });


    } else if (exeId.includes("ExS_")) {
        singleVisualizer.classList.add(visibilityClass);

        fetch(`http://localhost/Routes/StorageRoutes.php/getSingleExercise/${exeId}`)
            .then((response) => response.json())
            .then((data) => {

                data = JSON.parse(data);
                let htmlFormat = `<li>
                <div class="ex" id="${exeId}">
                  <div class="ex-header">
                    <p class="ex_name">${data.question}</p> <p>(${data.points} punti)</p>
                    <div class="exercise-buttons-options-inner html-only"><button class="option-button" type="submit"
                        onclick="moveExerciseUp(this)">Sposta su</button><button class="option-button" type="submit"
                        onclick="moveExerciseDown(this)">Sposta giù</button><button class="option-button" type="submit"
                        onclick="removeExercise(this)">Rimuovi</button>
                    </div>
                  </div>
                </div></li>`;
                exList.innerHTML += htmlFormat;
            });

    }
    callerButtonLi = null;
    closeExerciseVisualizer();
}

function closeExerciseVisualizer() {
    exerciseContainer.classList.remove(visibilityClass);
    visualizer.classList.remove(visibilityClass);
    multipleVisualizer.classList.remove(visibilityClass);
    singleVisualizer.classList.remove(visibilityClass);
}
