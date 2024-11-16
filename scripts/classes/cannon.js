class Cannon {
    constructor(ship, w, h, offsetX, offsetY) {
        this.ship = ship
        this.w = w
        this.h = h
        this.offsetX = offsetX
        this.offsetY = offsetY

        this.pos = createVector(0, 0)

        this.angle = 0

        this.bullets = []
        this.lastTimeShot = 0
        this.shootInterval = 200

        this.damage = 10
    }

    draw() {
        
        this.pos.x = this.ship.pos.x + cos(this.ship.angle + PI / 2) * this.offsetX - sin(this.ship.angle + PI / 2) * this.offsetY
        this.pos.y = this.ship.pos.y + sin(this.ship.angle + PI / 2) * this.offsetX + cos(this.ship.angle + PI / 2) * this.offsetY

        this.angle = createVector(mouseX - this.pos.x, mouseY - this.pos.y).heading()

        push()
        translate(this.pos.x, this.pos.y)
        rotate(this.angle)

        noStroke()
        beginShape()
            fill(255)
            vertex(this.h * 0.75, 0)
            vertex(0, this.w / 2)
            vertex(-this.h * 0.25, 0)
            vertex(0, -this.w / 2)
        endShape(CLOSE)

        pop()

    }
}
