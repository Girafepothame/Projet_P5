class Cannon {
    constructor(ship, w, h, offsetX, offsetY) {
        this.ship = ship
        this.w = w
        this.h = h
        this.offsetX = offsetX
        this.offsetY = offsetY

        this.pos = createVector(0, 0)

        this.angle = 0

        this.lastShotTime = 0
        this.shootInterval = 200
    }

    draw() {
        
        this.pos.x = this.ship.pos.x + cos(this.ship.angle) * this.offsetX - sin(this.ship.angle) * this.offsetY
        this.pos.y = this.ship.pos.y + sin(this.ship.angle) * this.offsetX + cos(this.ship.angle) * this.offsetY

        this.angle = createVector(gameplay.cursor.x - this.pos.x, gameplay.cursor.y - this.pos.y).heading()

        push()
        translate(this.pos.x, this.pos.y)
        rotate(this.angle)

        noStroke()
        fill(settings.colorCannon)
        beginShape()
            vertex(this.h * 0.75, 0)
            vertex(0, this.w / 2)
            vertex(-this.h * 0.25, 0)
            vertex(0, -this.w / 2)
        endShape(CLOSE)

        pop()
        push()
        strokeWeight(3)
        stroke(255, 0, 0)
        point(this.pos.x, this.pos.y)
        pop()

        this.shoot()
    }

    shoot() {
        if(millis() - this.lastShotTime > this.shootInterval){
            this.ship.bullets.push(new Bullet(this.pos, createVector(gameplay.cursor.x, gameplay.cursor.y), 2.5, 5, 30, 10000, color(255,255,255)))
            this.lastShotTime = millis()
        }
    }
}
