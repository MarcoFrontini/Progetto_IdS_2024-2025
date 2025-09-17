<?php

class StorageModel
{
    private $user_path = __DIR__ . '/../UsersData';

    private $examsJsonDataList = [];
    private $exercisesSingleJsonDataList = [];
    private $exercisesMultipleJsonDataList = [];

    //TODO -> Check if path exists, if not makedir

    public function __construct($userId)
    {
        $this->user_path =  $this->user_path . '/' . $userId . '/';

        $this->updateLists();
    }

    private function updateLists()
    {
        $this->examsJsonDataList = $this->fillJsonList($this->user_path . 'exams/');
        $this->exercisesSingleJsonDataList = $this->fillJsonList($this->user_path . 'exercises/single');
        $this->exercisesMultipleJsonDataList = $this->fillJsonList($this->user_path . 'exercises/multiple');
    }

    private function fillJsonList($filesPath)
    {
        $jsonList = [];

        $dir = new DirectoryIterator($filesPath);
        foreach ($dir as $fileinfo) {
            if (!$fileinfo->isDot()) {
                $strippedFileName = str_replace(".json", "", $fileinfo->getFilename());
                $jsonList[$strippedFileName] = file_get_contents($fileinfo->getRealPath());
            }
        }

        /*$examsFileNameList = glob($filesPath);

        if(empty($examsFileNameList))
            return $jsonList;

        foreach ($examsFileNameList as $examFileName) {
            $examFilePath = $filesPath . $examFileName;
            $examFileName = str_replace(".json", "", $examFileName);
            $jsonList[$examFileName] = file_get_contents($examFilePath);
        }*/

        return $jsonList;
    }

    public function getExercises()
    {
        $this->updateLists();
        $exercises = [];
        $exercises = array_merge($this->exercisesMultipleJsonDataList, $this->exercisesSingleJsonDataList);
        return $exercises;
    }

    public function getSingleExercise($exerciseId)
    {
        if (str_contains($exerciseId, "ExS_")) {
            return $this->exercisesSingleJsonDataList[$exerciseId];
        } else if (str_contains($exerciseId, "ExM_")) {
            return $this->exercisesMultipleJsonDataList[$exerciseId];
        }

        return null;
    }

    public function getExams()
    {
        $this->updateLists();
        return $this->examsJsonDataList;
    }

    public function getSingleExam($examId)
    {
        return $this->examsJsonDataList[$examId];
    }

    public function removeExercise($exerciseId)
    {
        $path = $this->user_path . "exercises/";

        if (str_contains($exerciseId, "ExS_")) {
            unset($this->exercisesSingleJsonDataList[$exerciseId]);
            $path = $path . "single/" . $exerciseId . ".json";
        } else if (str_contains($exerciseId, "ExM_")) {
            unset($this->exercisesMultipleJsonDataList[$exerciseId]);
            $path = $path . "multiple/" . $exerciseId . ".json";
        }

        if (str_contains($path, ".json"))
            unlink($path);
    }

    public function removeExam($examId)
    {
        $path = $this->user_path . "exams/" . $examId . ".json";

        unset($this->examsJsonDataList[$examId]);

        if (str_contains($path, ".json"))
            unlink($path);
    }

    public function addExercise($exerciseId, $exerciseData)
    {
        $this->updateExercise($exerciseId, $exerciseData);
    }

    public function addExam($examId, $examData)
    {
        $this->updateExam($examId, $examData);
    }

    public function updateExercise($exerciseId, $exerciseData)
    {
        $folder = "";

        if (str_contains($exerciseId, "ExS_")) {
            $folder = "single";
            $this->exercisesSingleJsonDataList[$exerciseId] = $exerciseData;
        } else if (str_contains($exerciseId, "ExM_")) {
            $folder = "multiple";
            $this->exercisesMultipleJsonDataList[$exerciseId] = $exerciseData;
        }

        $dirPath = $this->user_path . "exercises/" . $folder;
        $examFilePath = $dirPath . "/" . $exerciseId . ".json";

        if (!file_exists($dirPath)) {
            mkdir($dirPath, 0777, true);
        }

        file_put_contents($examFilePath, json_encode($exerciseData));
    }

    public function updateExam($examId, $examData)
    {
        $this->examsJsonDataList[$examId] = $examData;
        $dirPath = $this->user_path . "exams";
        $examFilePath = $dirPath . "/" . $examId . ".json";

        if (!file_exists($dirPath)) {
            mkdir($dirPath, 0777, true);
        }

        file_put_contents($examFilePath, json_encode($examData));
    }
}
