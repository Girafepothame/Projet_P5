class Joystick {
    constructor(x, y, joystickRadius, stickRadius) {
        this.x = x
        this.y = y
        this.joystickRadius = joystickRadius
        this.stickRadius = stickRadius
        this.stickPosX = x
        this.stickPosY = y
        this.isTouching = false
        this.isMouseInsideJoystick = false
    }

    display() {
        push()
        noFill()
        stroke(255)
        ellipse(this.x, this.y, this.joystickRadius * 2)

        fill(128)
        ellipse(this.stickPosX, this.stickPosY, this.stickRadius * 2)
        pop()
    }

    update() {
        if (this.isMouseInsideJoystick && this.isTouching) {
            let touchXPos = mouseX
            let touchYPos = mouseY

            let distToCenter = dist(touchXPos, touchYPos, this.x, this.y)

            if (distToCenter < this.joystickRadius) {
                this.stickPosX = touchXPos
                this.stickPosY = touchYPos
            } else {
                let angle = atan2(touchYPos - this.y, touchXPos - this.x)
                this.stickPosX = this.x + cos(angle) * this.joystickRadius
                this.stickPosY = this.y + sin(angle) * this.joystickRadius
            }
        }
    }

    mousePressed() {
        let distToCenter = dist(mouseX, mouseY, this.x, this.y)
        if (distToCenter < this.joystickRadius) {
            this.isTouching = true
            this.isMouseInsideJoystick = true
        }
    }

    mouseReleased() {
        this.isTouching = false
        this.isMouseInsideJoystick = false
        this.stickPosX = this.x
        this.stickPosY = this.y
    }

    getDirection() {
        let dx = this.stickPosX - this.x
        let dy = this.stickPosY - this.y
        return atan2(dy, dx)
    }

    getMagnitude() {
        let dx = this.stickPosX - this.x
        let dy = this.stickPosY - this.y
        return dist(this.x, this.y, this.stickPosX, this.stickPosY)
    }
}