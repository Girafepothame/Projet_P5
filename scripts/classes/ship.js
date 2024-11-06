class Ship {
    constructor(x, y, size) {
        this.position = createVector(x, y)
        this.size = size
    }

    update() {

    }

    draw() {
        this.drawShip()
    }

    drawShip() {
        push()
        
        fill(255)
        stroke(255)

        beginShape()

        vertex(this.position.x, this.position.y)
        vertex(this.position.x + this.size/6, this.position.y + this.size/2)

        vertex(this.position.x + this.size/12, this.position.y + this.size/2)
        vertex(this.position.x, this.position.y + this.size/2*1.25)
        vertex(this.position.x - this.size/12, this.position.y + this.size/2)

        vertex(this.position.x - this.size/6, this.position.y + this.size/2)
        vertex(this.position.x, this.position.y)

        endShape(CLOSE)

        pop()
    }
}