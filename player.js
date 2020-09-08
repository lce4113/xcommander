class Player {

  constructor(x, y, dir) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.size = createVector(25, 25);
    this.dir = -dir;
  }

  draw() {
    // push();
    rectMode(CENTER);
    translate(this.pos.x, this.pos.y);
    rotate(this.dir);
    rect(0, 0, this.size.x, this.size.y);
    // pop();
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