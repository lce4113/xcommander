class Projectile {

  constructor(x, y, radius, dir, speed, color) {
    this.pos = createVector(x, y);
    this.vel = createVector(speed * cos(dir), speed * sin(dir));
    this.radius = radius;
    this.dir = dir;
    this.speed = speed;
    this.color = color;
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.dir);
    noStroke();
    fill(this.color);
    circle(0, 0, this.radius * 2);
    pop();
  }

  update() {
    this.pos.sub(this.vel);
  }

}