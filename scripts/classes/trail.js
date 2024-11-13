class Trail {
    constructor(r, l) {
        this.positions = [];
        this.maxLength = l;
        this.r = r;
        
        this.angle = 0;
    }

    add(position) {
        this.positions.push(position.copy());
        if (this.positions.length > this.maxLength) {
            this.positions.shift();
        }
    }

    display(x, y) {
        push();
        noStroke();

        for (let i = 0; i < this.positions.length; i++) {
            let pos = this.positions[i];

            // Calculer l'angle entre le point de la traînée et la position de la souris
            let angleToMouse = atan2(mouseY - (pos.y + y), mouseX - (pos.x + x));

            // Alpha pour la transparence (plus l'élément est ancien, plus il est transparent)
            let alpha = map(i, 0, this.positions.length, 0, 255);
            // Taille de la traînée en fonction de l'index
            let size = map(i, 0, this.positions.length, 2, this.r);

            // Appliquer l'orientation avec l'angle calculé
            fill(255, alpha);
            rectMode(CENTER);
            push();
            translate(pos.x + x, pos.y + y);  // Déplacer le système de coordonnées
            rotate(angleToMouse);  // Appliquer la rotation selon l'angle
            rect(0, 0, size, size);  // Dessiner le rectangle centré sur la position
            pop();
        }

        pop();
    }
}
