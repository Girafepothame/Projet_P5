// ::NAVIGATION


function handleGameInterruptions() {

    if (ship.hp <= 0) {
        settings.mode = -1
    }

    if (settings.mode === -3 || settings.mode === -4) {
        menuPause();
        return; // Empêche le reste du jeu de se dessiner quand il est en pause
    }

    if (settings.mode === -1) {
        menuDeath();
        return
    }

    if (settings.mode === -5) {
        drawWinScreen();
        return
    }

}

function menuPause() {
    background(30)


    fill(255)
    textSize(width / 50)
    text("Pause", width / 2 - textWidth("Pause") / 2, height / 4)

    buttons = [];
    drawButton("M E N U", height * 0.35);
    buttonPause.style('font-size', `${width / 50}px`)


    let canvaGame = select("#canvaGame"); 
    let canvaData = canvaGame.elt.getBoundingClientRect(); 
  
    let hauteur = canvaData.height;
    let largeur = canvaData.width;

    buttonPause.position(canvaData.left + largeur / 2 - buttonPause.width / 1.5, canvaData.top + hauteur  / 2)
    let size = min(width, height) / 20
    let centerX = width / 6
    let centerY = height / 2

    showControls(size, centerX, centerY)
}

function drawGameOverScreen() {
    background(30);
    fill(255);
    textSize(width / 20);
    text("Vous avez perdu", width / 2 - textWidth("Vous avez perdu") / 2, height / 2);
}

function drawWinScreen() {
    background(30)

    image(hexGrid, 0, 0)

    fill(255)
    textSize(width/50)
    text(`Vous avez battu le boss de niveau ${gameplay.difficulty}`, width/2 - textWidth(`Vous avez battu le boss de niveau ${gameplay.difficulty}`)/2, height/4)

    buttonsMenu = [];
    drawButton("M E N U", height * 0.35);
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
    if (!mobile) {
        text("Appuyez sur espace pour commencer", width / 2 - textWidth("Appuyez sur espace pour commencer") / 2, height / 6);
    } else {
        text("Touchez l'écran pour commencer", width / 2 - textWidth("Touchez l'écran pour commencer") / 2, height / 6);
    }
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
        drawGui()
        gameplay.cursor.setMobile();
        ship.setMobile()
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
    noStroke()
    fill(255)
    text(`Score : ${gameplay.score}`, width / 18, height / 8)
    text(`Vagues : ${gameplay.wave}`, width / 1.15, height / 8)
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


function gameBoss() {
    background(30)
    image(hexGrid, 0, 0)
    ship.draw()
    ship.update()

    if (mobile) {
        drawGui()
        gameplay.cursor.setMobile()
        ship.setMobile()
    }

    gameplay.boss.draw()
    gameplay.boss.action(ship)

    if (gameplay.boss.hp <= 0 && gameplay.boss.tabEnemy.length == 0) {
        settings.mode = -5
    }
    

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
    if (!volumeSlider) {
        volumeSlider = createSlider(0, 100, gameplay.volumeMusic);
        let canvaGame = select("#canvaGame");
        volumeSlider.parent(canvaGame);
    }


    let canvaGame = select("#canvaGame"); 
    let canvaData = canvaGame.elt.getBoundingClientRect(); 
  
    let hauteur = canvaData.height;
    let largeur = canvaData.width;
    
    volumeSlider.position(canvaData.left + largeur / 2 - volumeSlider.width / 2, canvaData.top + hauteur / 2 + height / 10);

    if(assets.gameMusics[gameplay.currentSongIndex].isPlaying()){
        assets.gameMusics[gameplay.currentSongIndex].setVolume(volumeSlider.value()/100)
    }

    gameplay.volumeMusic = volumeSlider.value();

    fill(255)
    textSize(width/50)
    text(`Volume : ${volumeSlider.value()}`, width/2 - textWidth(`Volume : ${volumeSlider.value()}`)/2, height/2 + height/12.5)

}

function configureColorPickers() {
    createColorPickerShip();
    createColorPickerCannon();
}

function createColorPickerShip() {
if (!colorPickerShipDiv) {
        colorPickerShipDiv = createDiv();
        let canvaGame = select("#canvaGame");
        colorPickerShipDiv.parent(canvaGame);
    }

    let canvaGame = select("#canvaGame"); 
    let canvaData = canvaGame.elt.getBoundingClientRect(); 
  
    let hauteur = canvaData.height;
    let largeur = canvaData.width;

    colorPickerShipDiv.position(canvaData.left + largeur/2 - largeur/4, canvaData.top + hauteur / 2 + hauteur/15 * 3);
    colorPickerShipDiv.style('z-index', '10');
    colorPickerShipDiv.style('position', 'absolute');
    
    if (!colorPickerShip) {
        colorPickerShip = createColorPicker(settings.colorShip);
    }
    colorPickerShipDiv.child(colorPickerShip);

    colorPickerShip.style('width', `${width/20}px`);
    colorPickerShip.style('height', `${height/20}px`);
    colorPickerShip.style('background-color', 'transparent');
    colorPickerShip.style('border', 'none');
    settings.colorShip = colorPickerShip.color()

    text(`Couleur vaisseau`, width/2 - width/4  - textWidth('Couleur vaisseau')/2, height/2 + height/15 *5)

    
}

function createColorPickerCannon() {
    if (!colorPickerCannonDiv) {
        colorPickerCannonDiv = createDiv();
        let canvaGame = select("#canvaGame");
        colorPickerCannonDiv.parent(canvaGame);
    }

    let canvaGame = select("#canvaGame"); 
    let canvaData = canvaGame.elt.getBoundingClientRect(); 

    let hauteur = canvaData.height;
    let largeur = canvaData.width;

    colorPickerCannonDiv.position(canvaData.left + largeur/2 + largeur/4, canvaData.top + hauteur / 2 + hauteur/15 * 3);
    colorPickerCannonDiv.style('z-index', '10');
    colorPickerCannonDiv.style('position', 'absolute');
    
    if (!colorPickerCannon) {
        colorPickerCannon = createColorPicker(settings.colorCannon);
    }
    colorPickerCannonDiv.child(colorPickerCannon);

    colorPickerCannon.style('width', `${width/20}px`);
    colorPickerCannon.style('height', `${height/20}px`);
    colorPickerCannon.style('background-color', 'transparent');
    colorPickerCannon.style('border', 'none');
    settings.colorCannon = colorPickerCannon.color()

    text(`Couleur canons`, width/2 + width/4 - textWidth('Couleur canons')/2, height/2 + height/15 *5)
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
