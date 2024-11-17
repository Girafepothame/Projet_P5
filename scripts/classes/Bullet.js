class Bullet {
  constructor(pos, direction, w, h, speed, lifespan, color) {
    this.h = h
    this.w = w
    this.speed = speed
    this.pos = pos.copy()
    this.direction = createVector(direction.x - pos.x, direction.y - pos.y).heading()
    this.lifespan = lifespan
    this.color = color;
  }

  update() {
    this.pos.add(p5.Vector.fromAngle(this.direction).mult(this.speed))
    this.lifespan -= 5

  }

  isOffScreen() {
    return this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height
  }

  hits(entity) {
    return dist(this.pos.x, this.pos.y, entity.pos.x, entity.pos.y) < entity.w
  }

  display() {
    push()
    noStroke()
    translate(this.pos.x, this.pos.y)
    rotate(this.direction)
    rectMode(CENTER)
    fill(this.color)
    rect(0, 0, this.h, this.w)

    strokeWeight(2)
    stroke(0, 255, 0)
    point(0, 0)
    pop()
  }
}
