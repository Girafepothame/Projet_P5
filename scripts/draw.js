// ::NAVIGATION


function handleGameInterruptions() {
    // Vérifier si le jeu est en pause
    if (settings.mode === -3 || settings.mode === -4) {
        drawPauseScreen();
        return; // Empêche le reste du jeu de se dessiner quand il est en pause
    }

    // Vérifier si le joueur a perdu
    if (settings.mode === -1) {
        drawGameOverScreen();
        return; // Empêche le reste du jeu de se dessiner quand le joueur est mort
    }

    // Vérifier si le joueur a gagné contre le boss
    if (settings.mode === -5) {
        drawWinScreen();
        return; // Empêche le reste du jeu de se dessiner quand le joueur a gagné
    }

    // Si le jeu est en mode "normal" ou en mode "vagues", continuer à mettre à jour le jeu
    if (settings.mode >= 0) {
        // Mettre à jour le jeu normalement (ajouter d'autres interruptions spécifiques si nécessaire)
    }
}

function drawPauseScreen() {
    // Code pour dessiner l'écran de pause
    background(30);
    fill(255);
    textSize(width / 20);
    text("Jeu en Pause", width / 2 - textWidth("Jeu en Pause") / 2, height / 2);
}

function drawGameOverScreen() {
    // Code pour dessiner l'écran de fin de jeu
    background(30);
    fill(255);
    textSize(width / 20);
    text("Vous avez perdu", width / 2 - textWidth("Vous avez perdu") / 2, height / 2);
}

function drawWinScreen() {
    // Code pour dessiner l'écran de victoire contre le boss
    background(30);
    fill(255);
    textSize(width / 20);
    text("Victoire !", width / 2 - textWidth("Victoire !") / 2, height / 2);
}


function mainMenu() {
    background(30);
    image(hexGrid, 0, 0);
    fill(255);
    textSize(width / 50);
    text("Brain Damaged Blaster Drift", width / 2 - textWidth("Brain Damaged Blaster Drift") / 2, height / 6);
    buttonsMenu = [];
    drawButton("V A G U E S", height * 0.35);
    drawButton("B O S S", height * 0.55);
    drawButton("P A R A M E T R E S", height * 0.75);
}

function menuWaves() {
    background(30);
    fill(255);
    textSize(width / 50);
    text("Press Space to start", width / 2 - textWidth("Press Space to start") / 2, height / 6);
    let size = min(width, height) / 15;
    let centerX = width / 2;
    let centerY = height / 2;
    showControls(size, centerX, centerY);
}

function gameWaves() {
    background(30);
    image(hexGrid, 0, 0);
    ship.draw();
    ship.update();

    if (mobile) {
        drawGui();
        gameplay.cursor.setMobile();
    }

    // Afficher les ennemis et mettre à jour les vagues
    displayEnemies();
    checkWaveProgress();
}

function displayEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw();
        enemies[i].move(ship);
        if (enemies[i].hp <= 0) {
            gameplay.score += enemies[i].deathScore;
            enemies.splice(i, 1);
        }
    }
}

function checkWaveProgress() {
    if (gameplay.nbEnemiesMax === gameplay.nbEnemies && enemies.length === 0) {
        gameplay.wave++;
        gameplay.nbEnemies = 0;
        gameplay.nbEnemiesMax += 2;
        if (gameplay.wave % 4 === 0) {
            gameplay.hpEnemies += 5;
        }
        if (gameplay.wave % 5 === 0) {
            gameplay.damageEnemies += 5;
        }
        if (gameplay.wave % 6 === 0) {
            gameplay.speedEnemies += 0.5;
        }
    }
}

function menuBoss() {
    background(30);
    image(hexGrid, 0, 0);
    fill(255);
    textSize(width / 50);
    text("B O S S", width / 2 - textWidth("B O S S") / 2, height / 6);
    buttonsMenu = [];
    drawButton("F A C I L E", height * 0.35);
    drawButton("M E D I U M", height * 0.55);
    drawButton("D I F F I C I L E", height * 0.75);
}

function menuDeath() {
    background(30);
    image(hexGrid, 0, 0);
    fill(255);
    textSize(width / 50);
    text("Vous êtes mort", width / 2 - textWidth("Vous êtes mort") / 2, height / 4);
    textSize(width / 40);
    text(`Score : ${gameplay.score}`, width / 2 - textWidth(`Score : ${gameplay.score}`) / 2, height / 2 + height / 10);
    buttonsMenu = [];
    drawButton("M E N U", height * 0.35);
}

function menuSettings() {
    background(30);
    image(hexGrid, 0, 0);
    fill(255);
    textSize(width / 50);
    text("Paramètres", width / 2 - textWidth("Paramètres") / 2, height / 4);
    buttonsMenu = [];
    drawButton("M E N U", height * 0.35);
    configureVolumeSlider();
    configureColorPickers();
}

function configureVolumeSlider() {
    let space = height / 15;
    if (!volumeSlider) {
        volumeSlider = createSlider(0, 100, gameplay.volumeMusic);
    }
    let canvaGame = document.getElementById("canvaGame");
    let sizeCanva = canvaGame.getBoundingClientRect();
    volumeSlider.position(sizeCanva.left + width / 2 - volumeSlider.width / 2, sizeCanva.top + height / 2 + space);
    gameplay.volumeMusic = volumeSlider.value();
}

function configureColorPickers() {
    // Créer les color pickers pour le vaisseau et les canons
    createColorPickerShip();
    createColorPickerCannon();
}

function createColorPickerShip() {
    if (!colorPickerShipDiv) {
        colorPickerShipDiv = createDiv();
    }
    colorPickerShipDiv.position(width / 2 - width / 4, height / 2 + height / 15);
    colorPickerShipDiv.child(colorPickerShip);
    settings.colorShip = colorPickerShip.color();
}

function createColorPickerCannon() {
    if (!colorPickerCannonDiv) {
        colorPickerCannonDiv = createDiv();
    }
    colorPickerCannonDiv.position(width / 2 + width / 4, height / 2 + height / 15);
    colorPickerCannonDiv.child(colorPickerCannon);
    settings.colorCannon = colorPickerCannon.color();
}


// ::CONTROLS

function showControls(size, centerX, centerY) {
    let spacing = size * 2;
    let imgSize = size * 1.5;

    // Contrôles PC
    drawKey(centerX, centerY - spacing, size, "Z", "Avancer");
    drawKey(centerX - spacing, centerY, size, "Q", "Gauche");
    drawKey(centerX, centerY, size, "S", "Reculer");
    drawKey(centerX + spacing, centerY, size, "D", "Droite");
    drawKey(centerX + spacing, centerY - spacing * 2, size, "P", "Pause");

    image(mouseImage, centerX - imgSize / 4, centerY + spacing * 1.5, imgSize, imgSize);
    fill(255);
    textSize(size / 6);
    text("Viser avec la souris", centerX - textWidth("Viser avec la souris") / 3, centerY + spacing * 1.5 + imgSize * 1.2);
}


// ::SPAWN

function spawnEnemy() {
    if (gameplay.nbEnemies < gameplay.nbEnemiesMax) {
        let x, y;
        let side = floor(random(4));
        if (side === 0) { // Côté gauche
            x = -20;
            y = random(height);
        } else if (side === 1) { // Côté droit
            x = width + 20;
            y = random(height);
        } else if (side === 2) { // Côté haut
            x = random(width);
            y = -20;
        } else { // Côté bas
            x = random(width);
            y = height + 20;
        }

        let enemy = new Enemy(x, y);
        enemies.push(enemy);
        gameplay.nbEnemies++;
    }
}
