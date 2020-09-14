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
    game.draw();
    game.update();
  }
}

$(() => {
  $("#play").click(() => {
    $("#buttons").fadeOut(500, () => {
      $("#play-settings").fadeIn(500);
    });
  });

  $("#play-game").click(() => {
    $("#play-settings").fadeOut(1000, () => {
      game = new Game();
      loop();
    });
  });

  $("#settings-button").click(() => {
    $("#buttons").fadeOut(500, () => {
      $("#settings").fadeIn(500);
    });
  });

  $("#how-to-play-button").click(() => {
    $("#buttons").fadeOut(500, () => {
      $("#how-to-play").fadeIn(500);
    });
  });

  $(".back").click(function () {
    $(this).parents("#how-to-play, #play-settings, #settings")
      .fadeOut(500, () => {
        $("#buttons").fadeIn(500);
      });
  });
});