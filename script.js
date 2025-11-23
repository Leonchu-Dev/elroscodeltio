document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        { letter: "A", question: "Empieza con A: Bebida mágica que convierte a Palito en cantante, filósofo, bailarín y, a veces, todo eso al mismo tiempo.", answer: "Alcohol", status: 0 },
        { letter: "B", question: "Empieza con B: Palabra que utiliza Pablo Lemus para nombrar a Ade (cuando no hay confianza)", answer: "Boludo", status: 0 },
        { letter: "C", question: "Contiene la C: Condimento que le pone el tio Palito a la comida para después ir a mear tocarse el miembro viril", answer: "Picante", status: 0 },
        { letter: "D", question: "Empieza con D: Perrita que tuvieron los hermanos Lemus cuando eran chiquitos", answer: "Diamela", status: 0 },
        { letter: "E", question: "Empieza con E: Banda musical en la cual el tio Palito tuvo un rol por mucho tiempo", answer: "Esquejes", status: 0 },
        { letter: "F", question: "Empieza con F: Combustible oficial del tio Palito que se mezcla con gaseosa y potencia el habla y el sabor del asado", answer: "Fernet", status: 0 },
        { letter: "G", question: "Contiene la G: Estilo musical que te espera, igual que el Peronismo.", answer: "Tango", status: 0 },
        { letter: "H", question: "Contiene la H: Vehículo legendario de 4 ruedas que tuvo el tio Palito.", answer: "Mehari", status: 0 },
        { letter: "I", question: "Contiene la I: Arte milenario del tío Palito de explicar algo… a su manera única.", answer: "Ilustracion", status: 0 },
        { letter: "J", question: "Empieza con J: Religión política oficial de Palito, capaz de activarse con solo escuchar la palabra impuestos o robo", answer: "Justicialismo", status: 0 },
        { letter: "L", question: "Empieza con L: Encuentro legendario de primos, que sucedio en el año 2016. Ubicado en la zona norte de Mar del Plata.", answer: "La Casualidad", status: 0 },
        { letter: "M", question: "Contiene la M: La abuelita perruna de Palito, cieguita pero con GPS integrado para ubicar su cama y a su dueño.", answer: "Ami", status: 0 },
        { letter: "N", question: "Empieza con N: Político que Palito menciona como si fuera su héroe.", answer: "Nestor Kirchner", status: 0 },
        { letter: "O", question: "Contiene la O: Instrumento de percusion que aparece automáticamente cuando Leon saca la guitarra", answer: "Bombo", status: 0 },
        { letter: "P", question: "Empieza con P: La banda del tío Palito, expertos en contar dólares.", answer: "Peronismo", status: 0 },
        { letter: "Q", question: "Empieza con Q: Apodo eterno a la madrina del tio Palito", answer: "Queque", status: 0 },
        { letter: "R", question: "Contiene la R: Calle en la cual vive el tio Palito", answer: "Gutemberg", status: 0 },
        { letter: "S", question: "Empieza con S: Título o apodo que define a Palito cuando se manda alguna cagada o habla alguna boludez", answer: "Salamin", status: 0 },
        { letter: "T", question: "Empieza con T: El hijo del tío Palito: donde cae, arma quilombo.", answer: "Tomi", status: 0 },
        { letter: "U", question: "Empieza con U: Fruta sagrada que Palito respeta tanto que solo la consume en forma líquida", answer: "Uva", status: 0 },
        { letter: "V", question: "Empieza con V: Instrumento de cuerdas que Palito ama escuchar (no es la guitarra)", answer: "Violin", status: 0 },
        { letter: "W", question: "Empieza con W: Bebida alcohólica que te te hace creer que estás bien... hasta que parás", answer: "Whisky", status: 0 },
        { letter: "X", question: "Contiene la X: Animal anfibio que tuvo el tio un tiempo", answer: "Axolote", status: 0 },
        { letter: "Y", question: "Contiene la Y: Empresa de software en la cual el tio trabaja.", answer: "Quality Soft", status: 0 },
        { letter: "Z", question: "Empieza con Z: Persona cabezadura, que no afloja jamás en una discusión. Si no la gana, la empata", answer: "Zapata", status: 0 }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let fails = 0;
    let gameQuestions;
    let timer;
    let timeLeft = 100;

    const roscoElement = document.querySelector('.rosco');
    const questionDisplay = document.getElementById('question-display');
    const answerInput = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-answer');
    const pasapalabraButton = document.getElementById('pasapalabra');
    const errorMessage = document.getElementById('error-message');
    const timerDisplay = document.getElementById('timer');

    function initializeGame() {
        gameQuestions = JSON.parse(JSON.stringify(questions));
        currentQuestionIndex = 0;
        score = 0;
        fails = 0;
        stopTimer();
        startTimer();
    }

    function startTimer() {
        timeLeft = 100;
        timerDisplay.textContent = timeLeft;
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 10) {
                timerDisplay.parentElement.classList.add('low-time');
            } else {
                timerDisplay.parentElement.classList.remove('low-time');
            }
            if (timeLeft <= 0) {
                endGame("¡Se acabó el tiempo!");
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    function setupRosco() {
        roscoElement.innerHTML = ''; // Limpiar rosco anterior
        const roscoSize = roscoElement.offsetWidth;
        const radius = roscoSize * 0.45; // 45% del contenedor
        const centerX = roscoSize / 2;
        const centerY = roscoSize / 2;
        const angleStep = (2 * Math.PI) / questions.length;

        gameQuestions.forEach((q, i) => {
            const angle = i * angleStep - (Math.PI / 2);
            
            // Ajustar para que el centro del círculo de la letra esté en la circunferencia
            const letterSize = roscoSize * 0.1; // Letra es 10% del tamaño del rosco
            const x = centerX + radius * Math.cos(angle) - (letterSize / 2);
            const y = centerY + radius * Math.sin(angle) - (letterSize / 2);

            const letterElement = document.createElement('div');
            letterElement.classList.add('letter');
            letterElement.id = `letter-${q.letter}`;
            letterElement.textContent = q.letter;
            letterElement.style.width = `${letterSize}px`;
            letterElement.style.height = `${letterSize}px`;
            letterElement.style.fontSize = `${letterSize * 0.6}px`;
            letterElement.style.left = `${x}px`;
            letterElement.style.top = `${y}px`;
            roscoElement.appendChild(letterElement);
        });
    }

    function updateTeamDisplay() {
        document.getElementById('score').textContent = score;
        document.getElementById('fails').textContent = fails;
    }

    function showQuestion() {
        submitButton.style.display = 'inline-block';
        pasapalabraButton.style.display = 'inline-block';
        answerInput.style.display = 'inline-block';
        errorMessage.textContent = '';

        const questionData = gameQuestions[currentQuestionIndex];
        questionDisplay.textContent = questionData.question;
        
        document.querySelectorAll('.letter').forEach(l => l.classList.remove('active'));
        document.getElementById(`letter-${questionData.letter}`).classList.add('active');
        answerInput.focus();
    }

    function findNextQuestion() {
        const initialIndex = currentQuestionIndex;
        let questionsAvailable = false;
        do {
            if (gameQuestions.some(q => q.status === 0)) {
                questionsAvailable = true;
            } else {
                return false; // No quedan preguntas sin responder
            }
            currentQuestionIndex = (currentQuestionIndex + 1) % gameQuestions.length;
        } while (gameQuestions[currentQuestionIndex].status !== 0);
        return true;
    }

    function checkAnswer() {
        const userAnswer = answerInput.value.trim().toLowerCase();
        const currentQuestion = gameQuestions[currentQuestionIndex];
        const letterElement = document.getElementById(`letter-${currentQuestion.letter}`);

        if (!userAnswer) {
            errorMessage.textContent = "Debes introducir una respuesta.";
            answerInput.classList.add('animate-shake');
            setTimeout(() => {
                answerInput.classList.remove('animate-shake');
            }, 500);
            return;
        }
        errorMessage.textContent = '';

        const correctAnswer = currentQuestion.answer.toLowerCase().replace(/\s/g, '');

        if (userAnswer.replace(/\s/g, '') === correctAnswer) {
            currentQuestion.status = 1; // 1: Correcta
            score++;
            letterElement.classList.add('correct');
        } else {
            currentQuestion.status = 2; // 2: Incorrecta
            fails++;
            letterElement.classList.add('incorrect');
        }
        
        letterElement.classList.add('animate-pulse');
        setTimeout(() => letterElement.classList.remove('animate-pulse'), 500);

        answerInput.value = '';
        updateTeamDisplay();
        
        if (!findNextQuestion()) {
            endGame();
        } else {
            showQuestion();
        }
    }

    function handlePasapalabra() {
        const currentQuestion = gameQuestions[currentQuestionIndex];
        const letterElement = document.getElementById(`letter-${currentQuestion.letter}`);
        letterElement.classList.add('pasapalabra');
        
        answerInput.value = '';
        
        if (!findNextQuestion()) {
            endGame();
        } else {
            showQuestion();
        }
    }

    function endGame(message = "¡Rosco Completado!") {
        stopTimer();
        const modal = document.getElementById('end-game-modal');
        const winnerMessageEl = document.getElementById('winner-message');
        const finalScoresEl = document.getElementById('final-scores');

        winnerMessageEl.textContent = message;
        finalScoresEl.innerHTML = `Lograste <b>${score}</b> aciertos y tuviste <b>${fails}</b> fallos.`;

        modal.style.display = 'flex';

        submitButton.style.display = 'none';
        pasapalabraButton.style.display = 'none';
        answerInput.style.display = 'none';
        questionDisplay.textContent = "¡Juego terminado!";
    }

    // Event Listeners
    submitButton.addEventListener('click', checkAnswer);
    answerInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
    pasapalabraButton.addEventListener('click', handlePasapalabra);

    document.getElementById('restart-game').addEventListener('click', () => {
        document.getElementById('end-game-modal').style.display = 'none';
        timerDisplay.parentElement.classList.remove('low-time');
        initializeGame();
        setupRosco();
        showQuestion();
        updateTeamDisplay();
    });
    
    window.addEventListener('resize', setupRosco); // Vuelve a dibujar el rosco si cambia el tamaño de la ventana

    // Inicializar el juego
    document.getElementById('restart-game').click();
});
