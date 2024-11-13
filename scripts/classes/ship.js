class Ship {
    constructor(x, y, w, h) {
        this.pos = createVector(x, y)
        this.prevpos = this.pos.copy()
        this.w = w
        this.h = h
        this.angle = 0
        this.speed = 5

        this.trail = new Trail(w / 3, h)
    }

    update() {
        let direction = createVector(mouseX - this.pos.x, mouseY - this.pos.y)
        this.angle = lerp(this.angle, direction.heading(), 0.1)

        this.handleMovement()

        this.trail.add(this.pos.copy())

        this.prevpos = this.pos.copy()

        this.edges()
    }

    handleMovement() {
        if (keyIsDown(90)) {
            this.moveForward()
        }
        if (keyIsDown(83)) {
            this.moveBackward()
        }
        if (keyIsDown(81)) {
            this.moveLeft()
        }
        if (keyIsDown(68)) {
            this.moveRight()
        }
    }

    moveForward() {
        this.pos.x += cos(this.angle) * this.speed
        this.pos.y += sin(this.angle) * this.speed
    }

    moveBackward() {
        this.pos.x -= cos(this.angle) * this.speed
        this.pos.y -= sin(this.angle) * this.speed
    }

    moveLeft() {
        let leftDir = createVector(cos(this.angle - PI / 2), sin(this.angle - PI / 2))
        this.pos.x += leftDir.x * this.speed
        this.pos.y += leftDir.y * this.speed
    }

    moveRight() {
        let rightDir = createVector(cos(this.angle + PI / 2), sin(this.angle + PI / 2))
        this.pos.x += rightDir.x * this.speed
        this.pos.y += rightDir.y * this.speed
    }

    edges() {
        this.pos.x = (this.pos.x + width) % width
        this.pos.y = (this.pos.y + height) % height
    }

    draw() {
        this.trail.display(0, 0)

        push()
        translate(this.pos.x, this.pos.y)
        rotate(this.angle + PI / 2)

        fill(255)
        stroke(255)

        this.drawShip()

        pop()
    }

    drawShip() {
        this.body()
    }

    body() {
        beginShape()
        vertex(0, -this.h * 0.8)
        vertex(0 + this.w / 2, 0)

        vertex(0 + this.w / 4, 0)
        vertex(0, 0 + this.h * 0.2)
        vertex(0 - this.w / 4, 0)

        vertex(0 - this.w / 2, 0)
        endShape(CLOSE)

        strokeWeight(5)
        stroke(255, 0, 0)
        point(0, 0)
    }
}
