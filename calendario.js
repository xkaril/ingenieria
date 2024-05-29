document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('modal');
    var daysContainer = document.getElementById('daysContainer');
    var closeBtn = document.querySelector('.close');
    var monthYear = document.getElementById('monthYear');
    var prevMonthBtn = document.getElementById('prevMonth');
    var nextMonthBtn = document.getElementById('nextMonth');
    var addEventBtn = document.getElementById('addEventBtn');
    var eventNameInput = document.getElementById('eventNameInput');
    var eventTimeInput = document.getElementById('eventTimeInput');
    var eventsList = document.getElementById('eventsList');

    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();
    var events = JSON.parse(localStorage.getItem('events')) || {};

    function generateCalendar() {
        var daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        var firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        var daysHtml = '';

        for (let i = 0; i < firstDayOfMonth; i++) {
            daysHtml += '<div class="day empty"></div>';
        }

        for (let i = 1; i <= daysInMonth; i++) {
            var event = events[currentYear + '-' + (currentMonth + 1) + '-' + i];
            daysHtml += '<div class="day" data-day="' + i + '">' + i + (event ? '<div class="event">' + event.name + ' - ' + event.time + '</div>' : '') + '</div>';
        }

        daysContainer.innerHTML = daysHtml;
        monthYear.textContent = getMonthName(currentMonth) + ' ' + currentYear;
    }

    function getMonthName(monthIndex) {
        var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return months[monthIndex];
    }

    function showEvents() {
        eventsList.innerHTML = '';
        for (var date in events) {
            var eventDate = new Date(date);
            if (
                eventDate.getMonth() === currentMonth &&
                eventDate.getFullYear() === currentYear
            ) {
                var day = eventDate.getDate();
                var month = eventDate.getMonth() + 1;
                var formattedMonth = month < 10 ? '0' + month : month;
                var formattedDate = day + '/' + formattedMonth;
                var event = events[date];
                eventsList.innerHTML +=
                    '<li data-date="' +
                    date +
                    '">' +
                    formattedDate +
                    ' - ' +
                    event.name +
                    ' - ' +
                    event.time +
                    ' <button class="editEventBtn">Editar</button> <button class="deleteEventBtn">Eliminar</button></li>';
            }
        }
    }
    showEvents();

    prevMonthBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar();
        showEvents();
    });

    nextMonthBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar();
        showEvents();
    });

    daysContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('day')) {
            modal.style.display = 'block';
            var day = event.target.getAttribute('data-day');
            addEventBtn.dataset.day = day;
        }
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    addEventBtn.addEventListener('click', function() {
        var day = addEventBtn.dataset.day;
        var eventName = eventNameInput.value.trim();
        var eventTime = eventTimeInput.value.trim();

        eventTime = eventTime.replace(/^(\d{2})?(\d{1,2})?$/, function(match, p1, p2) {
            return (p1 || "") + (p1 && p2 ? ":" : "") + (p2 || "");
        });

        if (eventName !== '' && isValidTime(eventTime)) {
            var dateKey = currentYear + '-' + (currentMonth + 1) + '-' + day;
            events[dateKey] = { name: eventName, time: formatTime(eventTime) };
            localStorage.setItem('events', JSON.stringify(events));
            generateCalendar();
            showEvents();
            modal.style.display = 'none';
        } else {
            alert('Por favor ingrese un nombre de evento válido y un horario en formato HH:MM.');
        }
    });

    function isValidTime(time) {
        var regex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
        return regex.test(time);
    }

    function formatTime(time) {
        var parts = time.split(':');
        return parts[0].padStart(2, '0') + ':' + parts[1].padStart(2, '0');
    }

    eventsList.addEventListener('click', function(event) {
        if (event.target.classList.contains('editEventBtn')) {
            var date = event.target.parentElement.dataset.date;
            var newName = prompt('Editar nombre del evento:', events[date].name);
            var newTime = prompt('Editar horario del evento:', events[date].time);
            
            if (newName !== null && newTime !== null) {
                events[date].name = newName.trim();
                events[date].time = formatTime(newTime.trim());
                localStorage.setItem('events', JSON.stringify(events));
                generateCalendar();
                showEvents();
            }
        }
    });

    eventsList.addEventListener('click', function(event) {
        if (event.target.classList.contains('deleteEventBtn')) {
            var date = event.target.parentElement.dataset.date;
            delete events[date];
            localStorage.setItem('events', JSON.stringify(events));
            generateCalendar();
            showEvents();
        }
    });
});
