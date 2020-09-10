var game;
var damageSound = new Audio("./Media/damage.mp3");
damageSound.volume = 0.5;

function setup() {
  game = new Game(2);
  canvas = createCanvas(500, 500);
  canvas.elt.style = `
    width: 100vh;
    height: 100vw;
  `;
}

function draw() {
  background(50);
  game.update();
  game.draw();
}