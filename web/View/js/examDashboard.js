let visibilityClass = 'open-visualizer-popup';

fetch('http://localhost/Routes/StorageRoutes.php/getExams')
    .then((response) => response.json())
    .then((examsData) => {
        for (let key in examsData) {
            let exam = JSON.parse(examsData[key]);
            let dataArray = new Array(exam.id, exam.name);
            addExamRow(dataArray);
        }

    });

function addExamRow(dataArray) {
    let examId = dataArray[0];
    let buttonsHTML = `<button class="action-button" onclick="visualizeExam('${examId}')">Visualizza</button>
            <button class="action-button" onclick="deleteExam('${examId}', this)">Elimina</button>
            <button class="action-button" onclick="goToEditPage('${examId}')">Modifica</button>
            <button class="action-button" onclick="visualizePrintOptions('${examId}')">Salva PDF</button>`;
    let table = document.getElementById("exam-table-list");
    let newRow = table.insertRow(-1);
    newRow.insertCell(0).innerHTML = dataArray[1];
    newRow.insertCell(1).innerHTML = buttonsHTML;
}

function deleteExam(examId, button){
    var table = document.getElementById('exam-table-list');
    var currentRow = (button).closest('tr');
    var rows = table.rows;

    for (i = 1; i < rows.length; i++) {
        var row = rows[i];
        if (row === currentRow) {

            console.log("ok");

            fetch(`http://localhost/Routes/StorageRoutes.php/removeExam/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(examId),
            }).then(() => {
                table.deleteRow(i);
            });
            return;
        }
    }

}

function goToEditPage(examId){
    window.location.href = `./examEditor.html?examid=${examId}`;
}

function visualizePrintOptions(){}

/// Exam Visualizer ///

let callerButtonLi;

function visualizeExam(examId) {
    fetch(`http://localhost/Routes/StorageRoutes.php/getSingleExam/${examId}`)
    .then((response) => response.json())
    .then((examData) => {
        document.getElementById("exam-visualizer").classList.add(visibilityClass);
        examData = JSON.parse(examData);
        
        document.getElementById("exam-title").innerText = examData.name;
        document.getElementById("section-list").innerHTML = "";
        Array.prototype.forEach.call(examData.sections, function (section) {
            addSection(section.name);
        });
        
        //You can't read and write an array at the same time
        let ulSection = document.getElementById("section-list").children;
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

function closeVisualizer(){
    document.getElementById("exam-visualizer").classList.remove(visibilityClass);
}

function addSection(name) {

    let ulSection = document.getElementById('section-list');
    //console.log(ulSection.children.length)
    let val = ulSection.children.length + 1;
    let sectionName = `Sezione #${val}`
    if (name !== null)
        sectionName = name;

    ulSection.innerHTML += `<li><div class="section">
            <div class="section-header">
              <p>${sectionName}</p>
            </div><ol class="exercises-list"></ol></li>`;
}

function selectExercise(exeId) {
    let exList = callerButtonLi.getElementsByClassName('exercises-list')[0];
    //console.log(exList.outerHTML);
    if (exeId.includes("ExM_")) {
        fetch(`http://localhost/Routes/StorageRoutes.php/getSingleExercise/${exeId}`)
            .then((response) => response.json())
            .then((data) => {

                data = JSON.parse(data);

                let htmlFormat = `<li>
                <div class="ex" id="${exeId}">
                  <div class="ex-header">
                    <p class="ex_name">${data.question}</p> <p>(${data.points} punti)</p>
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
        fetch(`http://localhost/Routes/StorageRoutes.php/getSingleExercise/${exeId}`)
            .then((response) => response.json())
            .then((data) => {

                data = JSON.parse(data);
                let htmlFormat = `<li>
                <div class="ex" id="${exeId}">
                  <div class="ex-header">
                    <p class="ex_name">${data.question}</p> <p>(${data.points} punti)</p>
                  </div>
                </div></li>`;
                exList.innerHTML += htmlFormat;
            });

    }
    callerButtonLi = null;
}