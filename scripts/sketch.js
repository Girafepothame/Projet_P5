let details, regexp, mobile

let j1, j2
let gui

let ship
let cannon
let enemies = []
let mouseImage

let settings = {
    mode: 0,      // -5 menu win boss -4 menu pause boss, -3 menu pause waves, -2 parametres, -1 = vous etes mort,  0 = menu, 1 = menu vagues, 2 = jeu vagues, 3 = menu boss, 4 = jeu boss
    spawnInterval: 500,
    colorShip: null,
    colorCannon: null,
}


let assets = {
    font: null,
    gameMusics: [],
}
let buttonsMenu = []; // Stocker la position des boutons du menu

let gameplay = {
    currentSongIndex: 0,
    score: 0,
    volumeMusic: 25,
    cursor: null,
    wave: 0,
    nbEnemiesMax: 3,
    nbEnemies: 0,
    hpEnemies: 10,
    damageEnemies: 10,
    speedEnemies: 1,
    difficulty: 1,
    boss: null
};

let volumeSlider


let colorPickerShipDiv;
let colorPickerShip;

let colorPickerCannonDiv;
let colorPickerCannon;


let hexRadius
let hexGrid
let buttonPause

function preload() {
    mouseImage = loadImage("assets/Img/mouse.svg")
    joystickLeft = loadImage("assets/Img/joystickLeft.svg")
    joystickRight = loadImage("assets/Img/joystickRight.svg")

    assets.font = loadFont('assets/fonts/menu.ttf');

    soundFormats("mp3");
    assets.gameMusics = [
        loadSound('assets/musics/01.mp3'),
    ];

}

function drawCursor() {
    gameplay.cursor.draw()
    gameplay.cursor.update()
}

function drawKey(x, y, size, key, explanation) {
    push()

    // Touche
    fill(255)
    stroke(0)
    strokeWeight(2)
    rect(x, y, size, size, 5)

    // Texte touche
    fill(0)
    noStroke()
    textAlign(CENTER, CENTER)
    textSize(size / 6)
    text(key, x + size / 2, y + size / 2)


    // Texte explication
    fill(255)
    textAlign(CENTER, TOP)
    text(explanation, x + size / 2, y + size * 1.2)
    pop()
}

function drawButton(label, posY) {
    let buttonWidth = width / 3;
    let buttonHeight = height * 0.1;

    let isHovered = mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > posY && mouseY < posY + buttonHeight;

    push()

    if (isHovered) {
        fill(75)
    } else {
        noFill();
    }


    stroke(255);
    strokeWeight(5);
    beginShape()
    vertex(width / 2 - buttonWidth / 2 + buttonWidth / 10, posY)
    vertex(width / 2 + buttonWidth / 2, posY)
    vertex(width / 2 + buttonWidth / 2 - buttonWidth / 10, posY + buttonHeight)
    vertex(width / 2 - buttonWidth / 2, posY + buttonHeight)
    endShape(CLOSE)
    fill(255);
    noStroke()
    textAlign(CENTER, CENTER);
    text(label, width / 2, posY + buttonHeight / 2);

    pop()

    buttonsMenu.push({
        x1: width / 2 - buttonWidth / 2,
        x2: width / 2 + buttonWidth / 2,
        y1: posY,
        y2: posY + buttonHeight,
        label: label
    });
}



function showControls(size, centerX, centerY) {
    // Controles
    let spacing = size * 2
    let imgSize = size * 1.5

    // Sur pc 
    drawKey(centerX, centerY - spacing, size, "Z", "Avancer")
    drawKey(centerX - spacing, centerY, size, "Q", "Gauche")
    drawKey(centerX, centerY, size, "S", "Reculer")
    drawKey(centerX + spacing, centerY, size, "D", "Droite")

    drawKey(centerX + spacing, centerY - spacing * 2, size, "P", "Pause")


    image(mouseImage, centerX - imgSize/4, centerY + spacing*1.5, imgSize, imgSize)


    textSize(size / 6)

    fill(255)
    text("Viser avec la souris", centerX - textWidth("Viser avec la souris")/3, centerY + spacing*1.5 + imgSize*1.2)

    // Sur mobile
    //image(joystickLeft, centerX - centerX/2, centerY, imgSize, imgSize)
    //textSize(size/6)
    //fill(255)
    //text("Joystick gauche", centerX - centerX/2 - textWidth("Joystick gauche")/4, centerY - imgSize/3)
    //text("Déplacement vaisseau", centerX - centerX/2 - textWidth("Déplacement vaisseau")/3, centerY + imgSize*1.2)



    //image(joystickRight, centerX + centerX/2, centerY, imgSize, imgSize)
    //textSize(size/6)
    //fill(255)
    //text("Joystick droit", centerX + centerX/2 - textWidth("Joystick droit")/4, centerY - imgSize/3)
    //text("Orientation vaisseau", centerX + centerX/2 - textWidth("Orientation vaisseau")/3, centerY + imgSize*1.2)

}


function playSong() {
    if (gameplay.currentSongIndex < assets.gameMusics.length) {
        assets.gameMusics[gameplay.currentSongIndex].play();
        assets.gameMusics[gameplay.currentSongIndex].setVolume(gameplay.volumeMusic / 100);
        assets.gameMusics[gameplay.currentSongIndex].onended(nextSong);
    }
}

function nextSong() {
    gameplay.currentSongIndex = (gameplay.currentSongIndex + 1) % assets.gameMusics.length;
    playSong();
}

let canvasC

function setup() {
    handleCanvas()

    handleJoysticks()

    handleNavigator()

    gameplay.cursor = new Cursor(j2)

    handleSettings()

    ship = new Ship(width / 2, height / 2, width/50, width/25, j2);
}

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
        } else if (side === 3) { // Côté bas
            x = random(width);
            y = height + 20;
        }

        enemies.push(new Enemy(width/60, x, y, gameplay.hpEnemies, gameplay.hpEnemies, gameplay.speedEnemies, gameplay.damageEnemies));
        gameplay.nbEnemies++
    }
}

function spawnEnemyBoss() {
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
        } else if (side === 3) { // Côté bas
            x = random(width);
            y = height + 20;
        }

        gameplay.boss.tabEnemy.push(new Enemy(20, x, y, gameplay.hpEnemies, gameplay.hpEnemies, gameplay.speedEnemies, gameplay.damageEnemies));
        gameplay.nbEnemies++
    }
}

let intervalGame

function startGameBoss() {
    enemies = []
    gameplay.score = 0
    gameplay.nbEnemies = 0

    if (gameplay.difficulty === 1) {

        gameplay.nbEnemiesMax = 10
        gameplay.hpEnemies = 10
        gameplay.damageEnemies = 10
        gameplay.speedEnemies = 1
        settings.spawnInterval = 500
        gameplay.boss = new boss(50, random(width), random(height), [], 1000, 1, 1)
        spawnEnemyBoss()
        intervalGame = setInterval(spawnEnemyBoss, settings.spawnInterval)
    } else {
        if (gameplay.difficulty === 2) {
            gameplay.nbEnemiesMax = 50
            gameplay.hpEnemies = 30
            gameplay.damageEnemies = 15
            gameplay.speedEnemies = 1.5
            settings.spawnInterval = 3000
            gameplay.boss = new boss(75, random(width), random(height), [], 2000, 5, 2)
            for (let i = 0; i < 5; i++) {
                spawnEnemyBoss()
            }
            intervalGame = setInterval(spawnEnemyBoss, settings.spawnInterval)
        } else {
            if (gameplay.difficulty === 3) {
                gameplay.nbEnemiesMax = 100
                gameplay.hpEnemies = 50
                gameplay.damageEnemies = 50
                gameplay.speedEnemies = 2
                settings.spawnInterval = 3000
                gameplay.boss = new boss(50, random(width), random(height), [], 3000, 10, 3)
                for (let i = 0; i < 5; i++) {
                    spawnEnemyBoss()
                }
                intervalGame = setInterval(spawnEnemyBoss, settings.spawnInterval)
            }
        }
    }


}

function startGameWave() {
    enemies = []
    gameplay.score = 0
    gameplay.wave = 1
    gameplay.nbEnemies = 0
    gameplay.nbEnemiesMax = 3
    gameplay.hpEnemies = 10
    gameplay.damageEnemies = 10
    gameplay.speedEnemies = 1
    settings.spawnInterval = 500

    spawnEnemy()
    intervalGame = setInterval(spawnEnemy, settings.spawnInterval)

}

function draw() {
    drawGui()

    // Gérer les interruptions de jeu (pause, etc.)
    handleGameInterruptions();


    // Gérer l'interface du jeu selon le mode
    switch (settings.mode) {
        case 0: // Menu principal
            mainMenu();
            break;
        case 1: // Menu des vagues

            if (keyIsDown(32) || mobile) {  // space
                startGameWave()
                settings.mode = 2
            }

            menuWaves();
            break;
        case 2: // Jeu des vagues
            gameWaves();
            break;
        case 3: // Menu Boss
            menuBoss();
            break;
        case -1: // Menu Mort
            menuDeath();
            break;
        case -2: // Paramètres
            menuSettings();
            break;
        case -3: // Pause dans le jeu
        case -4: // Pause dans le boss
            menuPause();
            break;
        case -5: // Victoire contre le boss
            menuBossWin();
            break;
        default:
            // Pour tout autre mode non spécifié
            break;
    }

    // Dessiner le curseur
    noCursor();
    drawCursor();
}


function touchStarted() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
        playSong();
    }

    if (settings.mode === 3) {
        for (let i = 0; i < buttonsMenu.length; i++) {
            if (
                mouseX > buttonsMenu[i].x1 &&
                mouseX < buttonsMenu[i].x2 &&
                mouseY > buttonsMenu[i].y1 &&
                mouseY < buttonsMenu[i].y2
            ) {
                if (buttonsMenu[i].label === "D I F F I C I L E") {
                    gameplay.difficulty = 3;
                    settings.mode = 4;
                    startGameBoss()
                    
                }else {
                    if (buttonsMenu[i].label === "M E D I U M") {
                        gameplay.difficulty = 2;
                        settings.mode = 4;
                        startGameBoss()
                    }else {
                        if (buttonsMenu[i].label === "F A C I L E") {
                            gameplay.difficulty = 1;
                            settings.mode = 4;
                            startGameBoss()
                        }
                    }
                }
            }
        }
    }
    
    if (settings.mode === 0 || settings.mode === -1 || settings.mode === -2 || settings.mode === -3 || settings.mode === -4 || settings.mode === -5) {
        for (let i = 0; i < buttonsMenu.length; i++) {
            if (
                mouseX > buttonsMenu[i].x1 &&
                mouseX < buttonsMenu[i].x2 &&
                mouseY > buttonsMenu[i].y1 &&
                mouseY < buttonsMenu[i].y2
            ) {
                if (buttonsMenu[i].label === "V A G U E S") {
                    settings.mode = 1;
                }else{
                    if (buttonsMenu[i].label === "B O S S") {
                        settings.mode = 3;
                    }else{
                   
                        if (buttonsMenu[i].label === "M E N U") {
                            setup()
                        }else{
                            if (buttonsMenu[i].label === "P A R A M E T R E S") {
                                settings.mode = -2;
                            }
                        }
                    }

                }
            }
        }
    }
}


function keyPressed() {
    if (settings.mode === 2) {
        if (key === "p" || key === "P") {
            settings.mode = -3
            buttonPause = createButton("Reprendre partie")
            buttonPause.style('background-color', 'rgba(0,0,0,0)')
            buttonPause.style('color', 'white')
            buttonPause.style('font-family', 'arial')
            buttonPause.style('border', '3px solid white')
            buttonPause.style('padding', `${width / 50}px`)

            buttonPause.mouseOver(() => {
                buttonPause.style('background-color', 'rgba(75,75,75)')
            })
            buttonPause.mouseOut(() => {
                buttonPause.style('background-color', 'rgba(0,0,0,0)')
            })
            buttonPause.touchStarted(() => {
                settings.mode = 2
            })
        }
    }
    if (settings.mode === 4) {
        if (key === "p" || key === "P") {
            settings.mode = -4
            buttonPause = createButton("Reprendre partie")
            buttonPause.style('background-color', 'rgba(0,0,0,0)')
            buttonPause.style('color', 'white')
            buttonPause.style('font-family', 'arial')
            buttonPause.style('border', '3px solid white')
            buttonPause.style('padding', `${width / 50}px`)

            buttonPause.mouseOver(() => {
                buttonPause.style('background-color', 'rgba(75,75,75)')
            })
            buttonPause.mouseOut(() => {
                buttonPause.style('background-color', 'rgba(0,0,0,0)')
            })
            buttonPause.touchStarted(() => {
                settings.mode = 4
            })
        }
    }
}

function windowResized() {
    let container = document.getElementById('canvaGame');

    resizeCanvas(container.offsetWidth, container.offsetHeight)

    hexRadius = 25

    let hexWidth = sqrt(3) * hexRadius
    let hexHeight = 2 * hexRadius

    let cols = ceil(windowWidth / hexWidth)
    let rows = ceil(windowHeight / hexHeight)

    hexGrid = createGraphics(windowWidth, windowHeight)
    drawHexGrid(hexGrid, cols, rows, hexWidth, hexHeight, hexRadius)

}

// Bloquer le défilement de la page mobile
function touchMoved() {
    return false;
}

function makeFullScreen(){
    let container = document.getElementById('canvaGame')
    container.requestFullscreen()
}