document.addEventListener('DOMContentLoaded', function() {
    var messagesContainer = document.querySelector('.messages');
    var messageInput = document.getElementById('messageInput');
    var sendMessageBtn = document.getElementById('sendMessageBtn');
    var fileInput = document.getElementById('fileInput');
    var sendFileBtn = document.getElementById('sendFileBtn');

    var defaultDoctorResponses = [
        'Entiendo. ¿Hay algo más que quieras compartir?',
        'Gracias por tu información. ¿Experimentaste algún otro síntoma recientemente?',
        'Me alegra escuchar eso. ¿Cómo te sientes en general?',
        'Por favor, manténme informado sobre cualquier cambio. Estoy aquí para ayudarte.',
        '¿Has notado alguna mejora desde la última vez que hablamos?',
        '¿Estás siguiendo correctamente el tratamiento que te he recomendado?',
        'Recuerda mantener una dieta equilibrada y beber suficiente agua.',
        'La actividad física regular puede ser beneficiosa para tu salud. ¿Estás haciendo ejercicio regularmente?',
        'Es importante que descanses lo suficiente para permitir que tu cuerpo se recupere.'
    ];

    function displayMessages() {
        messagesContainer.innerHTML = '';
        messages.forEach(function(message) {
            var messageElement = document.createElement('div');
            messageElement.classList.add('message', message.sender);
            messageElement.textContent = message.content;
            if (message.file) {
                var link = document.createElement('a');
                link.href = message.file;
                link.textContent = 'Archivo adjunto';
                messageElement.appendChild(link);
            }
            messagesContainer.appendChild(messageElement);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    var messages = [
        { sender: 'doctor', content: 'Hola, ¿cómo te sientes hoy?' }
    ];

    displayMessages();

    function sendMessage() {
        var messageContent = messageInput.value.trim();
        if (messageContent !== '') {
            messages.push({ sender: 'patient', content: messageContent });
            displayMessages();
            messageInput.value = '';
            setTimeout(function() {
                var responseIndex = Math.floor(Math.random() * defaultDoctorResponses.length);
                var doctorResponse = defaultDoctorResponses[responseIndex];
                messages.push({ sender: 'doctor', content: doctorResponse });
                displayMessages();
            }, 1000);
        }
    }

    function sendFile() {
        var file = fileInput.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(event) {
                var fileUrl = event.target.result;
                messages.push({ sender: 'patient', content: 'Archivo adjunto', file: fileUrl });
                displayMessages();
            };
            reader.readAsDataURL(file);
            fileInput.value = '';
        }
    }

    sendMessageBtn.addEventListener('click', sendMessage);

    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    sendFileBtn.addEventListener('click', sendFile);
});
