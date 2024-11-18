class Cursor {
    constructor(joystick) {
        this.x = width / 2;
        this.y = height / 2;
        this.diametre = 20; // Diamètre du curseur
        this.joystick = joystick; // Le joystick est facultatif

        this.mobile = false; // Par défaut, le curseur suit la souris
    }

    // Méthode pour activer ou désactiver le mode mobile
    setMobile() {
        this.mobile = true;
    }

    // Méthode pour mettre à jour la position du curseur
    update() {
        if (this.mobile && this.joystick) {
            console.log("mobile")
            // Si mobile est vrai, on déplace le curseur avec le joystick
            this.x += this.joystick.valX * 5;  // Multiplie par 5 pour augmenter la vitesse
            this.y += this.joystick.valY * 5;
        } else {
            // Si mobile est faux, on déplace le curseur avec la souris
            console.log("non mobile")
            this.x = mouseX;
            this.y = mouseY;
        }
    }

    // Méthode pour afficher le curseur
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