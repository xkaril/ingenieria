document.addEventListener('DOMContentLoaded', function() {
    var applyBtn = document.getElementById('applyBtn');

    applyBtn.addEventListener('click', function() {
        applySettings();
    });

    loadSettings();
});

function applySettings() {
    var fontSize = document.getElementById('fontSize').value;
    var theme = document.getElementById('theme').value;
    var language = document.getElementById('language').value;

    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('theme', theme);
    localStorage.setItem('language', language);

    applyFontSize(fontSize);
    applyTheme(theme);
    applyLanguage(language);

    alert('Configuración aplicada correctamente.');
}

function applyFontSize(size) {
    document.body.style.fontSize = size;
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.style.backgroundColor = '#333';
        document.body.style.color = '#fff';
    } else {
        document.body.style.backgroundColor = '#f2f2f2';
        document.body.style.color = '#000';
    }
}

function applyLanguage(language) {
    switch (language) {
        case 'es':
            alert('Idioma cambiado a Español');
            break;
        case 'fr':
            alert('Langue changée en Français');
            break;
        case 'de':
            alert('Sprache auf Deutsch geändert');
            break;
        case 'it':
            alert('Lingua cambiata in Italiano');
            break;
        default:
            alert('Language changed to English');
            break;
    }
}

function loadSettings() {
    var fontSize = localStorage.getItem('fontSize');
    var theme = localStorage.getItem('theme');
    var language = localStorage.getItem('language');

    if (fontSize) {
        applyFontSize(fontSize);
    }

    if (theme) {
        applyTheme(theme);
    }

    if (language) {
        applyLanguage(language);
    }
}
