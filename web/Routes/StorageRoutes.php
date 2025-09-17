<?php

if (!isset($_SESSION)) {
    session_start();
}

include_once(__DIR__ . '/../Presenter/StoragePresenter.php');

//Presenter
$userId = $_SESSION['user_id'];
$storagePresenter = new StoragePresenter($userId);

//Percorso richiesto
$request = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
//echo $request[2];


switch ($request[2]) {
    case 'getExercises':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $storagePresenter->getExercises();
        }
        break;
    case 'getSingleExercise':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            if (isset($request[3])) {
                $exerciseId = $request[3];
            }
            $storagePresenter->getSingleExercise($exerciseId);
        }
        break;
    case 'getExams':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $storagePresenter->getExams();
        }
        break;
    case 'getSingleExam';
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            if (isset($request[3])) {
                $examId = $request[3];
            }
            $storagePresenter->getSingleExam($examId);
        }
        break;
    case 'removeExercise':
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $exerciseId  = json_decode(file_get_contents('php://input'), true);
            $storagePresenter->removeExercise($exerciseId);
        }
        break;
    case 'removeExam':
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $examId  = json_decode(file_get_contents('php://input'), true);
            $storagePresenter->removeExam($examId);
        }
        break;
    case 'addExercise':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $exerciseData = json_decode(file_get_contents('php://input'), true);
            $storagePresenter->addExercise($exerciseData['id'], $exerciseData);
        }
        break;
    case 'addExam':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $examData  = json_decode(file_get_contents('php://input'), true);
            $storagePresenter->addExam($examData['id'], $examData);
        }
        break;
    case 'updateExercise':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $exerciseData = json_decode(file_get_contents('php://input'), true);
            $storagePresenter->updateExercise($exerciseData['id'], $exerciseData);
        }
        break;
    case 'updateExam':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $examData  = json_decode(file_get_contents('php://input'), true);
            $storagePresenter->updateExam($examData['id'], $examData);
        }
        break;
    default:
        echo json_encode(['success' => false, 'message' => 'Storage Route not found']);
        break;
}
