function validarFormulario() {
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var celular = document.getElementById('celular').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

    var errorNombre = document.getElementById('error-nombre');
    var errorEmail = document.getElementById('error-email');
    var errorCelular = document.getElementById('error-celular');
    var errorPassword = document.getElementById('error-password');
    var errorConfirmPassword = document.getElementById('error-confirm-password');

    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var regexCelular = /^\d{9}$/;

    var isValid = true;

    if (nombre.trim() === '') {
        errorNombre.innerText = 'Por favor ingrese su nombre completo.';
        isValid = false;
    } else {
        errorNombre.innerText = '';
    }

    if (!regexEmail.test(email)) {
        errorEmail.innerText = 'Por favor ingrese un correo electrónico válido.';
        isValid = false;
    } else {
        errorEmail.innerText = '';
    }

    if (!regexCelular.test(celular)) {
        errorCelular.innerText = 'Por favor ingrese un número de celular válido (9 dígitos sin espacios ni guiones).';
        isValid = false;
    } else {
        errorCelular.innerText = '';
    }

    if (password.length < 8) {
        errorPassword.innerText = 'La contraseña debe tener al menos 8 caracteres.';
        isValid = false;
    } else {
        errorPassword.innerText = '';
    }

    if (confirmPassword !== password) {
        errorConfirmPassword.innerText = 'Las contraseñas no coinciden.';
        isValid = false;
    } else {
        errorConfirmPassword.innerText = '';
    }

    return isValid;
}
function toggleMenu() {
    var menuList = document.getElementById("menuList");
    menuList.classList.toggle("active");
}
