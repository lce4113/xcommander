var game;

function setup() {
  game = new Game();
  canvas = createCanvas(500, 500).elt;
  canvas.style = `
    width: 100vh;
    height: 100vw;
  `;
}

function draw() {
  background(50);
  game.update();
  game.draw();
}