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
            // Si mobile est vrai, on déplace le curseur avec le joystick
            // Mappe les valeurs du joystick aux dimensions de l'écran
            this.x = map(this.joystick.valX, -1, 1, 0, width); // Mappage de -1 à 1 (joystick) vers 0 à width (écran)
            this.y = map(this.joystick.valY, -1, 1, 0, height); // Mappage de -1 à 1 (joystick) vers 0 à height (écran)
        } else {
            // Si mobile est faux, on déplace le curseur avec la souris
            this.x = mouseX;
            this.y = mouseY;
        }

        // Empêcher le curseur de sortir des bords de l'écran avec constrain()
        this.x = constrain(this.x, 0, width);  // Limite x entre 0 et la largeur de l'écran
        this.y = constrain(this.y, 0, height); // Limite y entre 0 et la hauteur de l'écran
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
