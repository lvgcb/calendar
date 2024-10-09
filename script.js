let currentDate = new Date();

const schedules = {
    'Пн': [
        "08:00 - Математика",
        "08:45 - Физика",
        "09:35 - Литература",
        "10:15 - Химия",
        "11:00 - История",
        "12:05 - Информатика",
        "12:50 - Отдых"
    ],
    'Вт': [
        "09:00 - Английский",
        "10:00 - Биология",
        "11:00 - География",
        "12:00 - Математика",
        "13:00 - Музыка",
        "14:00 - Физкультура"
    ],
    'Ср': [
        "09:00 - Химия",
        "10:00 - История",
        "11:00 - Литература",
        "12:00 - Информатика",
        "13:00 - Математика",
        "14:00 - Физика"
    ],
    'Чт': [
        "09:00 - Русский язык",
        "10:00 - Математика",
        "11:00 - Физика",
        "12:00 - Английский",
        "13:00 - История",
        "14:00 - Литература"
    ],
    'Пт': [
        "09:00 - География",
        "10:00 - Биология",
        "11:00 - Физкультура",
        "12:00 - Музыка",
        "13:00 - Математика",
        "14:00 - Химия"
    ],
    'Сб': [
        "09:00 - Искусство",
        "10:00 - Физика",
        "11:00 - Математика",
        "12:00 - Химия",
        "13:00 - Информатика",
        "14:00 - Английский"
    ],
    'Вс': [
        "09:00 - Отдых",
        "10:00 - Спорт",
        "11:00 - Чтение",
        "12:00 - Прогулка",
        "13:00 - Развлечения",
        "14:00 - Семейное время"
    ]
};

function renderCalendar() {
    const monthYear = document.getElementById("month-year");
    const daysContainer = document.getElementById("days");
    daysContainer.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYear.innerText = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
        const emptyDay = document.createElement("div");
        daysContainer.appendChild(emptyDay);
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.innerText = i;
        dayElement.onclick = () => openModal(`${i}.${month + 1}.${year}`, getDayName(firstDayOfMonth.getDay() + i - 1));
        daysContainer.appendChild(dayElement);
    }
}

function getDayName(index) {
    const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    return daysOfWeek[index % 7];
}

document.getElementById("prev-month").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
};

document.getElementById("next-month").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
};

function openModal(date, day) {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");

    modalTitle.innerText = `Расписание на ${date}`;
    modalDescription.innerHTML = schedules[day].map((item, index) => `
        <div class="homework-input">
            <label>${item}</label>
            <input type="text" placeholder="Введите ДЗ" id="hw-${day}-${index}">
        </div>
    `).join('');
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

function saveHomework() {
    const day = document.getElementById("modal-title").innerText.split(' ')[2];
    schedules[day].forEach((_, index) => {
        const homeworkInput = document.getElementById(`hw-${day}-${index}`);
        // Здесь вы можете сохранить ДЗ в локальное хранилище или отправить на сервер
        console.log(`ДЗ для ${day} (${schedules[day][index]}): ${homeworkInput.value}`);
    });
    alert("ДЗ сохранено!");
}

// Закрытие модального окна при нажатии вне его
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Инициализация календаря
renderCalendar();