function validarInicioSesion() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email.trim() !== '' && password.trim() !== '') {
        return true; 
    } else {
        return false; 
    }
}
