class Ship {
    constructor(x, y, w, h) {
        this.position = createVector(x, y)
        this.prevPosition = this.position.copy()
        this.w = w
        this.h = h
        this.angle = 0
        this.speed = 5

        this.trail = new Trail(w / 3, h)
    }

    update() {
        let direction = createVector(mouseX - this.position.x, mouseY - this.position.y)
        this.angle = lerp(this.angle, direction.heading(), 0.1)

        this.handleMovement()

        this.trail.add(this.position.copy())

        this.prevPosition = this.position.copy()

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
        this.position.x += cos(this.angle) * this.speed
        this.position.y += sin(this.angle) * this.speed
    }

    moveBackward() {
        this.position.x -= cos(this.angle) * this.speed
        this.position.y -= sin(this.angle) * this.speed
    }

    moveLeft() {
        let leftDir = createVector(cos(this.angle - PI / 2), sin(this.angle - PI / 2))
        this.position.x += leftDir.x * this.speed
        this.position.y += leftDir.y * this.speed
    }

    moveRight() {
        let rightDir = createVector(cos(this.angle + PI / 2), sin(this.angle + PI / 2))
        this.position.x += rightDir.x * this.speed
        this.position.y += rightDir.y * this.speed
    }

    edges() {
        this.position.x = (this.position.x + width) % width
        this.position.y = (this.position.y + height) % height
    }

    draw() {
        this.trail.display(0, 0)

        push()
        translate(this.position.x, this.position.y)
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
