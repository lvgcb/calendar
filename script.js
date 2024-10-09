
const schedules = {
    'Пн': [
        "08:00 - Тарих",
        "08:45 - Физика ГШ",
        "09:35 - Математика",
        "10:20 - Информатика",
        "11:15 - Физика ЖР",
        "12:05 - Орыс тілі",
        "12:50 - Математика"
    ],
    'Вт': [
        "08:00 - Информатика",
        "08:45 - Математика",
        "09:35 - Математика",
        "10:20 - Физика",
        "11:15 - Дене шынықтыру",
        "12:05 - Биология ",
        "12:50 - Математика"
    ],
    'Ср': [
        "08:00 - Қазақ әдебиеті",
        "08:45 - Тарих",
        "09:35 - Ағылшын",
        "10:20 - Химия",
        "11:15 - Математика",
        "12:05 - Қазақ тілі",
        "12:50 - Биология"
    ],
    'Чт': [
        "08:00 - Тарих",
        "08:45 - Ағылшын",
        "09:35 - Қазақ тілі",
        "10:20 - Информатика",
        "11:15 - Математика",
        "12:05 - География",
        "12:50 - Физика"
    ],
    'Пт': [
        "08:00 - География",
        "08:45 - Дене шынықтыру",
        "09:35 - Орыс тілі",
        "10:20 - Физика",
        "11:15 - Химия",
        "12:05 - Ағылшын",
        "12:50 - Информатика"
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