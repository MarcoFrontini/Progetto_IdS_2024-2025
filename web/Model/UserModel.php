<?php
    if(!isset($_SESSION)) 
    { 
        session_start(); 
    }
class UserModel
{
    private $pdo;

    public function __construct()
    {
        include_once(__DIR__ . '/../Config/config.php');

        $this->pdo = $pdo;

        if (!$this->pdo) {
            die("Connection failed: " . $this->pdo);
        }
    }

    public function getUserFromCredential($email, $password)
    {
        $sql = "SELECT * FROM users WHERE email = :email";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['nome'] = $user['nome'];
            $_SESSION['cognome'] = $user['cognome'];
            return $user;
        }

        return null;
    }

    public function getUserData()
    {
        $userData = array('nome' => $_SESSION['nome'], 'cognome' => $_SESSION['cognome'], 'email' => $_SESSION['email']);
        return ($userData);
    }

}
