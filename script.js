document.addEventListener('DOMContentLoaded', () => {

    const questions = [
        {
            question: "Какое государство является самым большим по площади в мире, не имеющим выхода к Мировому океану?",
            answers: ["Боливия", "Монголия", "Чад", "Казахстан"],
            correct: 3
        },
        {
            question: "Какая река является самой длинной в мире по современным гидрологическим измерениям?",
            answers: ["Янцзы", "Миссисипи", "Нил", "Амазонка"],
            correct: 3
        },
        {
            question: "Какой пролив отделяет остров Мадагаскар от Африканского континента?",
            answers: ["Дрейка пролив", "Гибралтарский пролив", "Мозамбикский пролив", "Баб-эль-Мандебский пролив"],
            correct: 2
        },
        {
            question: "На территории какой современной страны находится высочайшая вершина Африки — вулкан Килиманджаро?",
            answers: ["Кения", "Танзания", "Эфиопия", "Уганда"],
            correct: 1
        },
        {
            question: "Какое море является самым соленым среди морей Мирового океана?",
            answers: ["Средиземное море", "Мёртвое море", "Чёрное море", "Красное море"],
            correct: 3
        }
    ];

    const startBtn = document.querySelector('#start-btn');
    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const text = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const timerElement = document.querySelector('#timer');
    
    let questionIndex = 0;
    let score = 0;
    let timeLeft = 20;
    let timerInterval = null;


    startBtn.addEventListener('click', startQuiz);

    function startQuiz() {
        startScreen.style.display = 'none';
        quizScreen.style.display = 'block'; 
        showQuestion(questions[questionIndex]);
    }

    function startTimer() {
        clearInterval(timerInterval);
        timeLeft = 20;
        timerElement.textContent = `Время: ${timeLeft}s`;

        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Время: ${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                nextQuestion();
            }
        }, 1000);
    }

    function showQuestion(question) {
        answersContainer.innerHTML = '';
        text.innerHTML = question.question;

        for (let i = 0; i < question.answers.length; i++) {
            const button = document.createElement('button');
            button.innerHTML = question.answers[i];
            button.classList.add('answer-btn');

            button.addEventListener('click', () => {
                checkAnswer(i);
            });

            answersContainer.appendChild(button);
        }

        startTimer();
    }

    function checkAnswer(answerIndex) {
        clearInterval(timerInterval);
        
        if (answerIndex === questions[questionIndex].correct) {
            score++;
        }

        nextQuestion();
    }

    function nextQuestion() {
        questionIndex++;

        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResults();
        }
    }

    function showResults() {
        clearInterval(timerInterval);
        timerElement.style.display = 'none';

        const percentage = Math.round((score / questions.length) * 100);
        text.innerHTML = `Конец!<br>Ваш результат: ${score} из ${questions.length} (${percentage}%)`;
        answersContainer.innerHTML = '';
    }
});