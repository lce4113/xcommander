class Game {

  constructor(num = 3) {
    this.players = [...players].map((p, i) => new Player(
      settings[p].x, settings[p].y, // x and y pos
      settings[p].radius, settings[p].dir, // radius and direction
      settings[p].health, // health
      settings[p].colors[0], settings[p].colors[1], // color1, color2
      settings[p].display, // display array
      settings.keys[i], // keys
      $(`#health-${p}>.num`)
    ));
    [...players].forEach(p => $(`#health-${p}`).show());
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
            if (player1.health == 0) {
              player1.die();
              this.players = this.players.filter(p => !_.isEqual(p, player1));
              if (this.players.length <= 1) {
                this.players[0].die(true);
                game = false;
                $("#buttons").fadeIn(1000);
              }
            }
          }
        }
      }
    }
  }

}