
<?php
    if(!isset($_SESSION)) 
    { 
        session_start(); 
    }

include_once(__DIR__ . '/../Model/UserModel.php');

class UserPresenter
{
	private $model;

	public function __construct()
	{
		$this->model = new UserModel();
	}

	public function login()
	{
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$email = $_POST['email'];
			$password = $_POST['password'];

			$user = $this->model->getUserFromCredential($email, $password);

			if ($user) {
                echo "<script>window.location.href = '../../View/html/startingPanel.html';</script>";
            }
            else {
                echo "<script>alert('Credenziali errate');window.location.href = '/';</script>";
            }
            exit();
		}
	}



	// Metodo per effettuare il logout di un utente
	public function logoutUser()
	{
		session_unset();
		session_destroy();
		echo "<script>window.location.href = '../../../';</script>";
	}

	public function getUserData(){
		$result = $this->model->getUserData();
		echo json_encode($result);
	}
}
?>