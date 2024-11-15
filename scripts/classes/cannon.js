class Cannon {
    constructor(ship, w, h, offsetX, offsetY) {
        this.ship = ship
        this.w = w
        this.h = h
        this.offsetX = offsetX
        this.offsetY = offsetY

        this.x = 0
        this.y = 0

        this.angle = 0

        this.bullets = []
    }

    draw() {
        
        this.x = this.ship.pos.x + cos(this.ship.angle + PI / 2) * this.offsetX - sin(this.ship.angle + PI / 2) * this.offsetY
        this.y = this.ship.pos.y + sin(this.ship.angle + PI / 2) * this.offsetX + cos(this.ship.angle + PI / 2) * this.offsetY

        this.angle = createVector(mouseX - this.x, mouseY - this.y).heading() + PI / 2

        push()
        translate(this.x, this.y)
        rotate(this.angle)

        noStroke()
        beginShape()
        fill(255)
        vertex(0, -this.h * 0.75)
        vertex(this.w / 2, 0)
        vertex(0, this.h * 0.25)
        vertex(-this.w / 2, 0)
        endShape(CLOSE)

        stroke(255, 0, 0)
        pop()

        // Ligne de visée
        line(this.x, this.y, mouseX, mouseY)
    }
}
