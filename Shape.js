updateCarousel();

const shapes = [
  { name: "circle", color: "lightblue" },
  { name: "square", color: "lightgreen" },
  { name: "diamond", color: "lightcoral" },
  { name: "rectangle", color: "lightyellow" },
  { name: "pentagon", color: "lightpink" },
  { name: "triangle", color: "lightgray" },
  { name: "heptagon", color: "lightblue" },
  { name: "octagon", color: "mediumpurple" },
  { name: "OVAL", color: "darkorange" },
  { name: "heart", color: "red" }
];

let score = 0;
let wrongAnswers = 0;
let questionIndex = 0;
let questions = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateQuestions() {
  questions = [...shapes];
  shuffleArray(questions);
}

function startGame() {
  score = 0;
  wrongAnswers = 0;
  questionIndex = 0;
  generateQuestions();
  showQuestion();
}

function showQuestion() {
  if (questionIndex >= 10) {
      showFinalScore();
      return;
  }
  
  const correctShape = questions[questionIndex];
  let shuffledShapes = [...shapes];
  shuffleArray(shuffledShapes);
  
  document.body.innerHTML = `
      <div class="game-container" style="background-image: url('bg.png'); background-size: cover;">
          <button class="back-button" onclick="goBack()">&#8592; Back</button>
          <h2 class="task">Find the ${correctShape.name.charAt(0).toUpperCase() + correctShape.name.slice(1)} Shape</h2>
          <div class="shapes">
              ${shuffledShapes.map(shape => `
                  <div class="shape ${shape.name}" onclick="checkShape('${shape.name}', '${correctShape.name}')"></div>
              `).join('')}
          </div>
          <p id="result"></p>
      </div>
  `;
}

function checkShape(selectedShape, correctShape) {
  if (selectedShape === correctShape) {
      score++;
      document.getElementById("result").innerText = "Yes!";
      document.getElementById("result").style.color = "green";
  } else {
      wrongAnswers++;
      document.getElementById("result").innerText = "Wrong!";
      document.getElementById("result").style.color = "red";
  }
  
  setTimeout(() => {
      questionIndex++;
      showQuestion();
  }, 1000);
}

function showFinalScore() {
  let message = "";
  if (score === 10) {
      message = "Very Good!";
  } else if (wrongAnswers > 5) {
      message = "Game Over!";
  } else {
      message = "Better Luck Next Time!";
  }
  
  document.body.innerHTML = `
      <div class="game-container" style="background-image: url('bg.png'); background-size: cover;">
          <h1>${message}</h1>
          <h2>Final Score</h2>
          <p>Correct Answers: ${score}</p>
          <p>Wrong Answers: ${wrongAnswers}</p>
          <button class="start-button" onclick="startGame()">Play Again</button>
          <button class="back-button" onclick="goBack()">&#8592; Back</button>
      </div>
  `;
}

function goBack() {
  location.reload(); // Reloads the original page
}

const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Confetto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 5; // Size between 5 and 15
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
        this.velocityY = Math.random() + 1; // Falling speed
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.y += this.velocityY; // Move down
        if (this.y > canvas.height) {
            this.y = 0; // Reset to top
            this.x = Math.random() * canvas.width; // Random x position
        }
    }
}

const confettiArray = [];

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        confettiArray.push(new Confetto(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiArray.forEach(confetto => {
        confetto.update();
        confetto.draw();
    });
    requestAnimationFrame(animate);
}

// Start the animation after the game ends
function startConfetti() {
    createConfetti();
    animate();
}

// Call startConfetti() when the game ends


function showQuestion() {
    if (questionIndex >= 10) {
        showFinalScore();
        return;
    }
    
    const correctShape = questions[questionIndex];
    let shuffledShapes = [...shapes];
    shuffleArray(shuffledShapes);
    
    document.body.innerHTML = `
        <div class="game-container" style="background-image: url('bg.png'); background-size: cover;">
            <div id="sun" class="sun">
                <div class="smile"></div> <!-- Add smile div -->
            </div>
            <button class="back-button" onclick="goBack()">&#8592; Back</button>
            <h2 class="task">Find the ${correctShape.name.charAt(0).toUpperCase() + correctShape.name.slice(1)} Shape_____</h2>
            <div class="shapes">
                ${shuffledShapes.map(shape => `
                    <div class="shape ${shape.name}" 
                         onclick="playSound(); checkShape('${shape.name}', '${correctShape.name}')"></div>
                `).join('')}
            </div>
            <p id="result"></p>
        </div>
    `;
}