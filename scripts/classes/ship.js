class Ship {
    constructor(x, y, size) {
        this.position = createVector(x, y)
        this.size = size

        this.rightGunPos = this.size * 7 / 24
        this.leftGunPos = - this.size * 7 / 24

        this.angle = 0
    }

    update() {
        this.angle = atan(mouseX - this.position.x, mouseY - this.position.y)

        if (keyIsDown(90)) {

        }


    }

    draw() {
        push()

        fill(255)
        stroke(255)

        this.drawShip()

        pop()
    }

    drawShip() {
        this.body()
        this.wings()
    }

    body() {
        beginShape()
        vertex(this.position.x, this.position.y)
        vertex(this.position.x + this.size / 6, this.position.y + this.size / 2)

        vertex(this.position.x + this.size / 12, this.position.y + this.size / 2)
        vertex(this.position.x, this.position.y + this.size / 2 * 1.25)
        vertex(this.position.x - this.size / 12, this.position.y + this.size / 2)

        vertex(this.position.x - this.size / 6, this.position.y + this.size / 2)
        vertex(this.position.x, this.position.y)
        endShape(CLOSE)
    }

    wings() {
        // draw 2 wings, 1 for each side of the ship
        for (let i = -1; i <= 1; i += 2) {
            beginShape()
            vertex(this.position.x + i * this.size * 7 / 24, this.position.y + this.size * 3 / 8)
            vertex(this.position.x + i * this.size / 3, this.position.y + this.size * 13 / 24)
            vertex(this.position.x + i * this.size * 7 / 24, this.position.y + this.size * 7 / 12)
            vertex(this.position.x + i * this.size / 4, this.position.y + this.size * 13 / 24)
            endShape(CLOSE)
        }
    }
}