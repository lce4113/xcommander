class Game {

  constructor() {
    this.player = new Player(
      250, 250, 25, PI / 2,
      color(0, 100, 255), color(0, 255, 100), [
      [2, 1, 0, 0, 0, 1, 2],
      [1, 2, 0, 0, 0, 2, 1],
      [2, 1, 0, 0, 0, 1, 2],
      [1, 2, 0, 2, 0, 2, 1],
      [2, 1, 0, 1, 0, 1, 2],
      [1, 2, 1, 2, 1, 2, 1],
      [2, 1, 2, 1, 2, 1, 2]
    ]
    );
  }

  draw() {
    this.player.draw();
  }

  update() {
    this.player.update();
  }

}