class Player {

  constructor(x, y, radius, dir, color1, color2, arr, keys, element) {
    // Parameters
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.radius = radius;
    this.dir = dir;
    this.color1 = color1;
    this.color2 = color2;
    this.arr = arr;
    this.keys = keys;
    this.element = element;

    // Other
    this.projectiles = [];
    this.damage = 0;

    // Stats
    this.health = 60;
  }

  draw() {
    // Transformation
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.dir);
    noStroke();

    // Draw ship from display array
    for (let j = 0; j < this.arr.length; j++) {
      for (let i = 0; i < this.arr[j].length; i++) {
        if (this.arr[j][i]) {
          fill(this.arr[j][i] == 1 ? this.color1 : this.color2);
          rect(
            (-this.arr.length / 2 + i) * this.radius / 1.15 * 2 / this.arr.length,
            (-this.arr[j].length / 2 + j) * this.radius / 1.15 * 2 / this.arr[j].length,
            this.radius / 1.15 * 2 / this.arr.length,
            this.radius / 1.15 * 2 / this.arr[j].length
          );
          // Red tint for damage
          if (this.damage > 0) {
            this.damage -= 1 / this.arr.length / this.arr[j].length / 60 * 100;
            fill(255, 0, 0, 150);

            rect(
              (-this.arr.length / 2 + i) * this.radius / 1.15 * 2 / this.arr.length,
              (-this.arr[j].length / 2 + j) * this.radius / 1.15 * 2 / this.arr[j].length,
              this.radius / 1.15 * 2 / this.arr.length,
              this.radius / 1.15 * 2 / this.arr[j].length
            );
          }
        }
      }
    }

    // Red thing in the back
    if (keyIsDown(this.keys[2])) {
      fill(255, 0, 0);
      rect(
        -this.radius / 1.15 / 2,
        this.radius / 1.15,
        this.radius / 1.15,
        this.radius / 1.15 / 5
      );
    }

    pop();

    // Projectiles
    for (let projectile of this.projectiles) {
      projectile.draw();
    }
  }

  update() {
    // Keys
    if (keyIsDown(this.keys[0])) {
      this.dir -= PI / 30;
    }
    if (keyIsDown(this.keys[1])) {
      this.dir += PI / 30;
    }
    if (keyIsDown(this.keys[2])) {
      this.vel.add(0.3 * -cos(this.dir + PI / 2), 0.3 * -sin(this.dir + PI / 2));
    }

    // Physics
    this.vel.mult(0.985);
    this.pos.add(this.vel);

    // Boundaries
    if (this.radius > this.pos.x || this.pos.x > 500 - this.radius) {
      this.pos.x = constrain(this.pos.x, this.radius, 500 - this.radius);
      this.vel.x *= -0.5;
    }
    if (this.radius > this.pos.y || this.pos.y > 500 - this.radius) {
      this.pos.y = constrain(this.pos.y, this.radius, 500 - this.radius);
      this.vel.y *= -0.5;
    }

    // Projectiles
    if (frameCount % 50 == 0) {
      this.projectiles.push(new Projectile(
        this.pos.x + this.radius * -cos(this.dir + PI / 2), // x pos
        this.pos.y + this.radius * -sin(this.dir + PI / 2), // y pos
        3, this.dir + PI / 2, 3, color(200) // radius, dir, speed, color
      ));
    }
    for (let i = 0; i < this.projectiles.length; i++) {
      var p = this.projectiles[i];
      p.update();
      if (
        0 > p.pos.x || p.pos.x > 500 ||
        0 > p.pos.y || p.pos.y > 500
      ) {
        this.projectiles.splice(i, 1);
      }
    }
  }

  takeDamage(n = 1) {
    this.health -= n;
    this.element.text(this.health);
    this.damage = 10;
    damageSound.play();
  }

  removeProj(proj) {
    var projectile = this.projectiles.find(p => _.isEqual(p, proj));
    this.projectiles = this.projectiles.filter(p => !_.isEqual(p, proj));
  }

}