<?php
    if(!isset($_SESSION)) 
    { 
        session_start(); 
    }

include_once('../Presenter/UserPresenter.php');

$userPresenter = new UserPresenter();

//$request = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
$request = ltrim($_SERVER['REQUEST_URI'], '/Routes/UserRoutes.php');

//echo $request;

switch ($request) {
	case 'login':
		if ($_SERVER['REQUEST_METHOD'] === 'POST')
			$userPresenter->login();
		break;
	case 'logout':
		if ($_SERVER['REQUEST_METHOD'] === 'POST')
			$userPresenter->logoutUser();
		break;
	case 'getUserData':
		if ($_SERVER['REQUEST_METHOD'] === 'GET') {
			$userPresenter->getUserData();
		}
		break;
	default:
		//header("HTTP/1.0 404 Not Found");
		echo json_encode(array('error' => 'Route not found'));
		break;
}
