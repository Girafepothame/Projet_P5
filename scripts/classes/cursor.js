class Cursor {
    constructor(joystick) {
        this.x = width / 2;
        this.y = height / 2;
        this.diametre = 20;
        this.joystick = joystick;
        this.mobile = false;
    }

    setMobile() {
        this.mobile = true;
    }

    update() {
        if (this.mobile && this.joystick) {
            this.x = map(this.joystick.valX, -1, 1, 0, width);
            this.y = map(this.joystick.valY, -1, 1, 0, height);
        } else {
            this.x = mouseX;
            this.y = mouseY;
        }

        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
    }

    draw() {
        fill(settings.mode === 2 ? [255, 200] : [255, 100]);
        noStroke();
        ellipse(gameplay.cursor.x, gameplay.cursor.y, settings.mode === 2 ? 5 : 20, settings.mode === 2 ? 5 : 20);

        if (settings.mode === 2) {
            noFill();
            stroke(255, 200);
            ellipse(gameplay.cursor.x, gameplay.cursor.y, 30, 30);
        }
    }
}
