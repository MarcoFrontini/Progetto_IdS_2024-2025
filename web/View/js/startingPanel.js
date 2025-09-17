fetch('http://localhost/Routes/UserRoutes.php/getUserData')
    .then((response) => response.json())
    .then((userData) => {
            let name = userData.nome;
            let surname = userData.cognome;
            let email = userData.email;

            document.getElementById('user-name').innerText = name;
            document.getElementById('user-surname').innerText = surname;
            document.getElementById('user-email').innerText = email;
    });