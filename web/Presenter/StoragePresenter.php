<?php
include_once(__DIR__ . '/../Model/StorageModel.php');

class StoragePresenter
{
    private $storageModel;

    public function __construct($userId)
    {
        $this->storageModel = new StorageModel($userId);
    }

    public function getExercises()
    {
        $exercises = $this->storageModel->getExercises();
        echo json_encode($exercises);
    }

    public function getSingleExercise($exerciseId){
        $exercise = $this->storageModel->getSingleExercise($exerciseId);
        echo json_encode($exercise);
    }

    public function getExams()
    {
        $exams = $this->storageModel->getExams();
        echo json_encode($exams);
    }

    public function getSingleExam($examId){
        $exam = $this->storageModel->getSingleExam($examId);
        echo json_encode($exam);
    }

    public function removeExercise($exerciseId)
    {
        $this->storageModel->removeExercise($exerciseId);
    }

    public function removeExam($examId)
    {
        $this->storageModel->removeExam($examId);
    }

    public function addExercise($exerciseId, $exerciseData)
    {
        $this->storageModel->addExercise($exerciseId, $exerciseData);
    }

    public function addExam($examId, $examData)
    {
        $this->storageModel->addExam($examId, $examData);
    }

    public function updateExercise($exerciseId, $exerciseData){
        $this->storageModel->updateExercise($exerciseId, $exerciseData);
    }

    public function updateExam($examId, $exerciseData){
        $this->storageModel->updateExam($examId,$exerciseData);
    }
}
