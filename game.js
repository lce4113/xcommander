class Game {

  constructor() {
    this.player = new Player(250, 250, 0);
  }

  draw() {
    this.player.draw();
  }

  update() {
    this.player.update();
  }

}