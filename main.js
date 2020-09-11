var game;

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
    game.update();
    game.draw();
  }
}

$(() => {
  $("#play").click(() => {
    $("#menu").fadeOut(1000, () => {
      game = new Game();
      loop();
    });
  });
});