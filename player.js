class Player {

  constructor(x, y, size, dir, color1, color2, arr) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.size = createVector(size, size);
    this.dir = -dir;
    this.color1 = color1;
    this.color2 = color2;
    this.arr = arr;
  }

  draw() {
    translate(this.pos.x, this.pos.y);
    rotate(this.dir);
    noStroke();
    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr[i].length; j++) {
        if (this.arr[i][j]) {
          fill(this.arr[i][j] == 1 ? this.color1 : this.color2);
          rect(
            (this.arr.length / 2 - i - 1) * this.size.x / 5,
            (this.arr[i].length / 2 - j - 1) * this.size.y / 5,
            this.size.x / 5,
            this.size.y / 5
          );
        }
      }
    }
  }

  update() {
    // Keys
    if (keyIsDown(LEFT_ARROW)) {
      this.dir -= PI / 30;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.dir += PI / 30;
    }
    if (keyIsDown(UP_ARROW)) {
      this.vel.add(0.3 * cos(this.dir), 0.3 * sin(this.dir));
    }

    // Physics
    this.vel.mult(0.97);
    this.pos.add(this.vel);

    // Boundaries
    if (this.size.x / 2 > this.pos.x || this.pos.x > 500 - this.size.x / 2) {
      this.pos.x = constrain(this.pos.x, this.size.x / 2, 500 - this.size.x / 2);
      this.vel.x *= -1;
    }
    if (this.size.y / 2 > this.pos.y || this.pos.y > 500 - this.size.y / 2) {
      this.pos.y = constrain(this.pos.y, this.size.y / 2, 500 - this.size.y / 2);
      this.vel.y *= -1;
    }
  }

}