class Trail {
    constructor(r, l) {
        this.positions = []
        this.maxLength = l
        this.r = r
        
        this.angle = 0
    }

    add(position) {
        this.positions.push(position.copy())
        this.angle = atan2(mouseY - (position.y), mouseX - (position.x))
        if (this.positions.length > this.maxLength) {
            this.positions.shift()
        }
    }

    display(x, y) {
        push()
        noStroke()

        for (let i = 0; i < this.positions.length; i++) {
            let pos = this.positions[i]

            let alpha = map(i, 0, this.positions.length, 0, 255)
            
            let size = map(i, 0, this.positions.length, 2, this.r)

            fill(255, alpha)
            rectMode(CENTER)
            push()
            translate(pos.x + x, pos.y + y)
            rotate(this.angle)
            rect(0, 0, size, size)
            pop()
        }

        pop()
    }
}
