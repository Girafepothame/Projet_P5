class Ship {
    constructor(x, y, w, h, joystick) {
        this.pos = createVector(x, y)
        this.w = w
        this.h = h
        this.angle = 0
        this.speed = 5
        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)
        this.hp = 100
        this.hpMax = 100
        this.trail = new Trail(w / 3, h)

        this.leftCannon = new Cannon(this, this.w / 2, this.h / 2, -this.h / 4, -this.w)
        this.rightCannon = new Cannon(this, this.w / 2, this.h / 2, -this.h / 4, this.w)

        this.bullets = []
        this.damage = 50

        this.cursor = gameplay.cursor
        this.joystick = joystick
        this.mobile = false
    }

    setMobile() {
        this.mobile = true
    }

    update() {
        let direction = createVector(this.cursor.x - this.pos.x, this.cursor.y - this.pos.y)
        let targetAngle = direction.heading()

        targetAngle = this.normalizeAngle(targetAngle)
        this.angle = this.normalizeAngle(this.angle)

        let angleDiff = targetAngle - this.angle

        if (angleDiff > PI) {
            angleDiff -= TWO_PI
        } else if (angleDiff < -PI) {
            angleDiff += TWO_PI
        }

        this.angle = lerp(this.angle, this.angle + angleDiff, 0.1)

        this.handleMovement()

        this.velocity.add(this.acceleration);
        this.pos.add(this.velocity);
        this.acceleration.mult(0);

        this.trail.add(this.pos.copy())

        this.edges();
    }

    handleMovement() {
        if (this.mobile) {
            this.moveWithJoystick();
        } else {
            if (keyIsDown(90)) this.moveForward();
            if (keyIsDown(83)) this.moveBackward();
            if (keyIsDown(81)) this.moveLeft();
            if (keyIsDown(68)) this.moveRight();
        }
    }

    moveWithJoystick() {
        let moveX = this.joystick.valX;
        let moveY = this.joystick.valY;

        this.pos.x += moveX * this.speed;
        this.pos.y += moveY * this.speed;
    }

    moveForward() {
        this.pos.add(p5.Vector.fromAngle(this.angle).mult(this.speed));
    }

    moveBackward() {
        this.pos.sub(p5.Vector.fromAngle(this.angle).mult(this.speed));
    }

    moveLeft() {
        let leftDir = p5.Vector.fromAngle(this.angle - PI / 2).mult(this.speed);
        this.pos.add(leftDir);
    }

    moveRight() {
        let rightDir = p5.Vector.fromAngle(this.angle + PI / 2).mult(this.speed);
        this.pos.add(rightDir);
    }

    normalizeAngle(angle) {
        return angle % TWO_PI;
    }

    edges() {
        this.pos.x = (this.pos.x + width) % width;
        this.pos.y = (this.pos.y + height) % height;
    }

    drawBaseShip() {
        this.trail.display(0, 0);

        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);

        fill(settings.colorShip);
        stroke(255);
        this.drawShip();

        pop();

        this.leftCannon.draw();
        this.rightCannon.draw();
    }

    draw() {
        this.drawBaseShip();
        stroke(255, 0, 0);
        line(this.pos.x, this.pos.y, this.cursor.x, this.cursor.y);
        this.displayHealth();

        this.bullets.forEach(bullet => {
            bullet.update();
            bullet.display();
        });

        this.bullets = this.bullets.filter(bullet => {
            return bullet.lifespan > 0 && !bullet.isOffScreen();
        });
    }

    displayHealth() {
        push();
        noStroke();
        fill(255);
        let healthLength = map(this.hp, 0, this.hpMax, 0, width / 12.25);
        healthLength = constrain(healthLength, 0, width / 12.25);
        rect(width / 17.25, height / 12.75, healthLength, height / 75);
        pop();
    }

    drawShip() {
        this.body();
    }

    body() {
        beginShape();
        vertex(this.h * 0.8, 0);
        vertex(0, this.w / 2);
        vertex(0, this.w / 4);
        vertex(-this.h * 0.2, 0);
        vertex(0, -this.w / 4);
        vertex(0, -this.w / 2);
        endShape(CLOSE);

        strokeWeight(5);
        stroke(255, 0, 0);
        point(0, 0);
    }
}
