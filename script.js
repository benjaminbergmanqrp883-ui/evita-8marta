// ===== Вопросы для квеста =====
const questions = [
    {
        q: "Какой цветок считается символом 8 марта?",
        options: ["Роза", "Тюльпан", "Подснежник", "Ромашка"],
        correct: 1,
        compliment: "Тюльпан — как ты: весенний и яркий! 🌷"
    },
    {
        q: "Что дарят женщинам чаще всего в этот праздник?",
        options: ["Инструменты", "Цветы и улыбки", "Гантели", "Отчёты"],
        correct: 1,
        compliment: "А я дарю тебе целый букет! 🌸"
    },
    {
        q: "Какое время года ассоциируется с 8 марта?",
        options: ["Зима", "Лето", "Весна", "Осень"],
        correct: 2,
        compliment: "Весна — твоё время года! 🌺"
    },
    {
        q: "Ёвита — это имя, которое звучит как…",
        options: ["Улыбка", "Гром", "Ветер", "Камень"],
        correct: 0,
        compliment: "Нежно и легко — прямо как ты! 💖"
    },
    {
        q: "Сколько цветов нужно собрать в этом квесте?",
        options: ["3", "5", "8", "100"],
        correct: 2,
        compliment: "Восемь — по одному за каждый твой плюс! 🌼"
    },
    {
        q: "Что делает мир красивее по мнению всех вокруг?",
        options: ["Космос", "Девушки like Ёвита", "Бетон", "Пыль"],
        correct: 1,
        compliment: "И это чистая правда! 🌻"
    },
    {
        q: "Лучший подарок на 8 марта — это…",
        options: ["Внимание и забота", "Ничего", "Сковорода", "Будильник"],
        correct: 0,
        compliment: "Забота — вот настоящий цветок! 💐"
    },
    {
        q: "Ёвита, ты готова получить свой сюрприз?",
        options: ["Да-да-да!", "Нет", "Может быть", "Что?"],
        correct: 0,
        compliment: "Тогда вперёд — он тебя ждёт! 🏵️"
    }
];

// ===== Состояние =====
let currentQuestion = 0;
let collectedCount = 0;

// ===== Падающие лепестки =====
function createPetals() {
    const container = document.getElementById('petals-container');
    const petals = ['🌸', '🌷', '🌹', '🌺', '🌼', '🌻', '💐', '🏵️', '💕'];
    
    for (let i = 0; i < 25; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 6 + 6) + 's';
        petal.style.animationDelay = Math.random() * 8 + 's';
        petal.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
        container.appendChild(petal);
    }
}

// ===== Переключение экранов =====
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// ===== Открытие конверта =====
function openCard() {
    const envelope = document.getElementById('envelope');
    envelope.classList.add('opened');
    setTimeout(() => {
        showScreen('message-screen');
    }, 700);
}

// ===== Начало квеста =====
function startQuest() {
    currentQuestion = 0;
    collectedCount = 0;
    document.querySelectorAll('.flower-icon').forEach(f => f.classList.remove('collected'));
    document.getElementById('collected').textContent = '0';
    showScreen('quest-screen');
    renderQuestion();
}

// ===== Отрисовка вопроса =====
function renderQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question-text').textContent = q.q;
    document.getElementById('q-num').textContent = currentQuestion + 1;
    
    const optionsContainer = document.getElementById('options-container');
    const feedback = document.getElementById('feedback');
    
    feedback.textContent = '';
    feedback.classList.remove('show', 'correct-fb', 'wrong-fb');
    optionsContainer.innerHTML = '';
    
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quest-option';
        btn.textContent = opt;
        btn.onclick = () => selectAnswer(i, btn);
        optionsContainer.appendChild(btn);
    });
}

// ===== Выбор ответа =====
function selectAnswer(index, btn) {
    const q = questions[currentQuestion];
    const allOptions = document.querySelectorAll('.quest-option');
    const feedback = document.getElementById('feedback');
    
    allOptions.forEach(o => o.classList.add('disabled'));
    
    if (index === q.correct) {
        btn.classList.add('correct');
        feedback.textContent = '✅ ' + q.compliment;
        feedback.classList.add('show', 'correct-fb');
        
        // Собираем цветок
        const flower = document.querySelector('.flower-icon[data-id="' + currentQuestion + '"]');
        if (flower) {
            flower.classList.add('collected');
        }
        collectedCount++;
        document.getElementById('collected').textContent = collectedCount;
        
        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                renderQuestion();
            } else {
                showFinal();
            }
        }, 2200);
    } else {
        btn.classList.add('wrong');
        // Показать правильный ответ
        allOptions[q.correct].classList.add('correct');
        feedback.textContent = '❌ Не совсем! Правильный ответ: ' + q.options[q.correct];
        feedback.classList.add('show', 'wrong-fb');
        
        setTimeout(() => {
            allOptions.forEach(o => o.classList.remove('disabled', 'wrong', 'correct'));
            renderQuestion();
        }, 2000);
    }
}

// ===== Финал =====
function showFinal() {
    showScreen('final-screen');
    launchConfetti();
}

// ===== Конфетти =====
function launchConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#e91e63', '#9c27b0', '#3f51b5', '#4caf50', '#ff9800', '#f06292'];
    const shapes = ['🌸', '🌷', '🌹', '💖', '✨', '🎉', '💕', '🌺'];
    
    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        if (Math.random() > 0.5) {
            confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
            confetti.style.fontSize = (Math.random() * 0.8 + 0.8) + 'rem';
            confetti.style.width = 'auto';
            confetti.style.height = 'auto';
        } else {
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        }
        
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 1.5 + 's';
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// ===== Перезапуск =====
function restart() {
    showScreen('card-screen');
    const envelope = document.getElementById('envelope');
    envelope.classList.remove('opened');
}

// ===== Инициализация =====
createPetals();
