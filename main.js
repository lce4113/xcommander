var game, settings, playerMap;
var players = new Set(["player1", "player2", "player3"]);

function setup() {
  canvas = createCanvas(500, 500);
  canvas.elt.style = `
    width: 100vh;
    height: 100vw;
  `;
  noLoop();
}

function draw() {
  background(50);
  if (game) {
    game.draw();
    game.update();
  }
}