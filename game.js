class Game {

  constructor(num = 3) {
    // Players
    this.players = [
      new Player(
        350, 150, 12, 0, // x, y, radius, direction
        color(0, 100, 255), color(255, 200, 200), [ // color1, color2
        [0, 0, 0, 1, 1, 0, 0, 0], // display array
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
        [1, 1, 1, 2, 2, 1, 1, 1],
        [1, 1, 1, 2, 2, 1, 1, 1]],
        [49 /* 1 */, 50 /* 2 */, 81 /* q */], // keys
        $("#three>.num")
      ),
      new Player(
        150, 150, 12, 0, // x, y, radius, direction
        color(0, 100, 255), color(0, 255, 100), [ // color1, color2
        [0, 0, 0, 1, 1, 0, 0, 0], // display array
        [0, 0, 0, 1, 1, 0, 0, 0],
        [1, 1, 0, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 0, 1, 1],
        [1, 1, 1, 2, 2, 1, 1, 1],
        [0, 1, 1, 2, 2, 1, 1, 0]],
        [67 /* c */, 86 /* v */, 70 /* f */], // keys
        $("#two>.num")
      ),
      new Player(
        250, 350, 12, 0, // x, y, radius, direction
        color(0, 100, 255), color(255, 255, 0), [ // color1, color2
        [0, 1, 1, 0, 0, 1, 1, 0], // display array
        [0, 1, 1, 0, 0, 1, 1, 0],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 2, 2, 1, 1, 1],
        [1, 1, 1, 2, 2, 1, 1, 1]],
        [LEFT_ARROW, RIGHT_ARROW, UP_ARROW], // keys
        $("#one>.num")
      )
    ];

    this.players = this.players.slice(3 - num);
    $(".health").slice(0, num).show();
    this.damageSound = new Audio("./Media/damage.mp3");
    this.damageSound.volume = 0.5;
  }

  draw() {
    background(50);
    // Players
    for (let player of this.players) {
      player.draw();
    }
  }

  update() {
    // Players
    for (let player1 of this.players) {
      player1.update();

      // Player - Projectile Collision
      var players = this.players.filter(p => !_.isEqual(p, player1));

      for (let player2 of players) {
        for (let proj of player2.projectiles) {
          if (
            (proj.pos.x - player1.pos.x) ** 2 +
            (proj.pos.y - player1.pos.y) ** 2 <=
            (proj.radius + player1.radius) ** 2
          ) {
            player2.removeProj(proj);
            player1.takeDamage();
            this.damageSound.play();
          }
        }
      }
    }
  }

}