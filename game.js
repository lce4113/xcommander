class Game {

  constructor() {
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
        $("#one>.num")
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
        $("#three>.num")
      )
    ];

    this.num = 2;
    this.players = this.players.slice(3 - this.num);
    $(".health").show();
    $(".health").slice(this.num).hide();
  }

  draw() {
    // Players
    for (let player of this.players) {
      player.draw();
    }
  }

  update() {
    // Players
    for (let player of this.players) {
      player.update();

      // Player - Projectile Collision
      var allProjectiles = this.players.filter(p => p.arr != player.arr);
      allProjectiles = allProjectiles.map(p => p.projectiles);

      if (110 > prints && prints > 100) console.log(allProjectiles);
      prints++;

      for (let projectiles of allProjectiles) {
        for (let proj of projectiles) {
          if (
            (proj.pos.x - player.pos.x) ** 2 +
            (proj.pos.y - player.pos.y) ** 2 <=
            (proj.radius + player.radius) ** 2
          ) {
            console.log(projectiles, proj);
            projectiles.filter(p => !(p.pos.x == proj.pos.x && p.pos.y == proj.pos.y));
            player.takeHealth();
          }
        }
      }
    }
  }

}