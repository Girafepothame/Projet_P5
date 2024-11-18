let details, regexp

let joystick1, joystick2

let ship
let cannon
let enemies = []
let mouseImage

let settings = {
    mode : 0,      // -4 menu pause boss, -3 menu pause waves, -2 parametres, -1 = vous etes mort,  0 = menu, 1 = menu vagues, 2 = jeu vagues, 3 = menu boss, 4 = jeu boss
    spawnInterval: 500,
    colorShip : null,
    colorCannon : null,
}


let assets = {
    font: null,
    gameMusics: [],
}
let buttonsMenu = []; // Stocker la position des boutons du menu

let gameplay = {
    currentSongIndex: 0,
    score : 0,
    volumeMusic : 25,
    cursor: { x: 0, y: 0 },
    wave : 0,
    nbEnemiesMax : 3,
    nbEnemies : 0,
    hpEnemies : 10,
    damageEnemies : 10,
    speedEnemies : 1,
    difficulty : 1,
    boss : null
};

let volumeSlider


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
    push();

    gameplay.cursor.x = lerp(gameplay.cursor.x, mouseX, 0.8);
    gameplay.cursor.y = lerp(gameplay.cursor.y, mouseY, 0.8);
  
    fill(settings.mode === 2 ? [255, 200] : [255, 100]);
    noStroke();
    ellipse(gameplay.cursor.x, gameplay.cursor.y, settings.mode === 2 ? 5 : 20, settings.mode === 2 ? 5 : 20);
    
    if (settings.mode === 2) {
      noFill();
      stroke(255, 200);
      ellipse(gameplay.cursor.x, gameplay.cursor.y, 30, 30);
    }
    pop();
}

function drawKey(x,y, size, key, explanation){
    push()

    // Touche
    fill(255)
    stroke(0)
    strokeWeight(2)
    rect(x, y, size,size, 5)

    // Texte touche
    fill(0)
    noStroke()
    textAlign(CENTER, CENTER)
    textSize(size/6)
    text(key, x + size/2, y + size /2)


    // Texte explication
    fill(255)
    textAlign(CENTER, TOP)
    text(explanation, x + size/2, y + size*1.2)
    pop()
}

function drawButton(label, posY) {
    let buttonWidth = width / 3;
    let buttonHeight = height * 0.1;
    
    let isHovered = mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > posY && mouseY < posY + buttonHeight;

    push()

    if(isHovered){
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

function mainMenu(){
    background(30)

    image(hexGrid, 0, 0)

    fill(255)
    textSize(width/50)
    text("Brain Damaged Blaster Drift", width/2 - textWidth("Brain Damaged Blaster Drift")/2, height/6)
    
    buttonsMenu = [];
    drawButton("V A G U E S", height * 0.35);
    drawButton("B O S S", height * 0.55);
    drawButton("P A R A M E T R E S", height * 0.75);

}


function menuBoss(){
    background(30)

    image(hexGrid, 0, 0)

    fill(255)
    textSize(width/50)
    text("B O S S", width/2 - textWidth("B O S S")/2, height/6)
    
    buttonsMenu = [];
    drawButton("F A C I L E", height * 0.35);
    drawButton("M E D I U M", height * 0.55);
    drawButton("D I F F I C I L E", height * 0.75);

}



function showControls(size, centerX, centerY){
    // Controles
    let spacing = size * 2
    let imgSize = size * 1.5

    // Sur pc 
    drawKey(centerX, centerY - spacing, size, "Z", "Avancer")
    drawKey(centerX - spacing, centerY, size, "Q", "Gauche")
    drawKey(centerX, centerY, size, "S", "Reculer")
    drawKey(centerX + spacing, centerY, size, "D", "Droite")

    drawKey(centerX + spacing, centerY - spacing*2, size, "P", "Pause")


    image(mouseImage, centerX - imgSize/4, centerY + spacing*1.5, imgSize, imgSize)


    textSize(size/6)

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

function menuWaves(){
    background(30)
    fill(255)
    textSize(width/50)

    // Sur pc
    text("Press Space to start", width/2 - textWidth("Press Space to start")/2, height/6)
    

    // Sur mobile
    //text("Click to start", width/2 - textWidth("Click to start")/2, height/6)






    let size =  min(width, height) / 15
    let centerX = width / 2
    let centerY = height / 2
    showControls(size, centerX, centerY)


    
    
   
}




function menuDeath(){
    background(30)

    image(hexGrid, 0, 0)

    fill(255)
    textSize(width/50)
    text("Vous êtes mort", width/2 - textWidth("Vous êtes mort")/2, height/4)
    textSize(width/40)

    text(`Score : ${gameplay.score}`, width/2 - textWidth(`Score : ${gameplay.score}`)/2, height/2 + height/10)

    buttonsMenu = [];
    drawButton("M E N U", height * 0.35);
}


function menuPause(){
    background(30)


    fill(255)
    textSize(width/50)
    text("Pause", width/2 - textWidth("Pause")/2, height/4)
    
    buttonsMenu = [];
    drawButton("M E N U", height * 0.35);

    let canvaGame = document.getElementById("canvaGame");
    let sizeCanva = canvaGame.getBoundingClientRect();

    
    let buttonWidth = width / 4; 
    let buttonHeight = height / 15; 
  
    buttonPause.style("font-size", `${width / 50}px`);
    buttonPause.size(buttonWidth, buttonHeight);
  
    buttonPause.position(sizeCanva.left + sizeCanva.width / 2 - buttonWidth / 2, sizeCanva.top + sizeCanva.height / 2 - buttonHeight / 2);


  
    let size =  min(width, height) / 20
    let centerX = width / 6
    let centerY = height / 2

    showControls(size, centerX, centerY)

    
}

let colorPickerShipDiv;
let colorPickerShip;

let colorPickerCannonDiv;
let colorPickerCannon;
function menuSettings(){
    background(30)
    image(hexGrid, 0, 0)

    fill(255)
    textSize(width/50)
    text("Paramètres", width/2 - textWidth("Paramètres")/2, height/4)
    
    buttonsMenu = [];
    drawButton("M E N U", height * 0.35);

    let space = height/15

    // Volume
    fill(255)
    textSize(width/50)
    if(!volumeSlider){
        volumeSlider = createSlider(0, 100, gameplay.volumeMusic);
    }

    let canvaGame = document.getElementById("canvaGame");
    let sizeCanva = canvaGame.getBoundingClientRect();

    
    volumeSlider.position(sizeCanva.left+width/2 - volumeSlider.width/2, sizeCanva.top +height/2 + space);

    if(assets.gameMusics[gameplay.currentSongIndex].isPlaying()){
        assets.gameMusics[gameplay.currentSongIndex].setVolume(volumeSlider.value()/100)
    }

    gameplay.volumeMusic = volumeSlider.value()

    fill(255)
    textSize(width/50)
    text(`Volume : ${volumeSlider.value()}`, width/2 - textWidth(`Volume : ${volumeSlider.value()}`)/2, height/2 + space *2)

    ship.drawBaseShip()

    textSize(width/50)

    if (!colorPickerShipDiv) {
        colorPickerShipDiv = createDiv();
    }
    
    colorPickerShipDiv.position(sizeCanva.left+width/2 - width/4, sizeCanva.top +height / 2 + space * 3);



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

    text(`Couleur vaisseau`, width/2 - width/4  - textWidth('Couleur vaisseau')/2, height/2 + space *5)

    if (!colorPickerCannonDiv) {
        colorPickerCannonDiv = createDiv();
    }
    

  
    
    colorPickerCannonDiv.position(sizeCanva.left+width/2 + width/4, sizeCanva.top +height / 2 + space * 3);

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

    text(`Couleur canons`, width/2 + width/4 - textWidth('Couleur canons')/2, height/2 + space *5)




}




function playSong() {
    if (gameplay.currentSongIndex < assets.gameMusics.length) {
      assets.gameMusics[gameplay.currentSongIndex].play();
      assets.gameMusics[gameplay.currentSongIndex].setVolume(gameplay.volumeMusic/100);
      assets.gameMusics[gameplay.currentSongIndex].onended(nextSong);
    }
}

function nextSong() {
    gameplay.currentSongIndex = (gameplay.currentSongIndex + 1) % assets.gameMusics.length;
    playSong();
}
let canvas
function setup() {
    let container = document.getElementById('canvaGame');
    canvas = createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent('canvaGame');

    //createCanvas(windowWidth, windowHeight)

    details = navigator.userAgent; 
    regexp = /android|iphone|kindle|ipad/i; 

    joystick1 = new Joystick(150, height - 150, 100, 40)
    joystick2 = new Joystick(width - 150, height - 150, 100, 40)

    textFont(assets.font);

    if (volumeSlider) {
        volumeSlider.remove();
        volumeSlider = null;
    }

    if(colorPickerShip){
        colorPickerShip.remove();
        colorPickerShip = null;
    }
    
    if(settings.colorShip === null){
        settings.colorShip = color(255,255,255)
    }

    if (colorPickerShipDiv) {
        colorPickerShipDiv.remove();
        colorPickerShipDiv = null;
    }


    if(colorPickerCannon){
        colorPickerCannon.remove();
        colorPickerCannon = null;
    }
    
    if(settings.colorCannon === null){
        settings.colorCannon = color(255,255,255)
    }

    if (colorPickerCannonDiv) {
        colorPickerCannonDiv.remove();
        colorPickerCannonDiv = null;
    }


    assets.gameMusics = shuffle(assets.gameMusics);
    ship = new Ship(width/2, height/2, 15, 35, joystick1, joystick2);

   
    settings.mode = 0
    hexRadius = 25

    let hexWidth = sqrt(3) * hexRadius
    let hexHeight = 2 * hexRadius

    let cols = ceil(width / hexWidth)
    let rows = ceil(height / hexHeight)

    hexGrid = createGraphics(width, height)

    drawHexGrid(hexGrid, cols, rows, hexWidth, hexHeight, hexRadius)


    
}

function spawnEnemy(){
    if(gameplay.nbEnemies < gameplay.nbEnemiesMax){
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

        enemies.push(new Enemy(20, x, y, gameplay.hpEnemies,gameplay.hpEnemies,gameplay.speedEnemies,gameplay.damageEnemies));
        gameplay.nbEnemies++
    }
}

function spawnEnemyBoss(){
    if(gameplay.nbEnemies < gameplay.nbEnemiesMax){
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

        gameplay.boss.tabEnemy.push(new Enemy(20, x, y, gameplay.hpEnemies,gameplay.hpEnemies,gameplay.speedEnemies,gameplay.damageEnemies));
        gameplay.nbEnemies++
    }
}

let intervalGame

function startGameBoss(){
    enemies = []
    gameplay.score = 0
    gameplay.nbEnemies = 0

    if(gameplay.difficulty === 1){

        gameplay.nbEnemiesMax = 10
        gameplay.hpEnemies = 10
        gameplay.damageEnemies = 10
        gameplay.speedEnemies = 1
        settings.spawnInterval = 500
        gameplay.boss = new boss(50, random(width), random(height),[], 50, 1, 1)
        spawnEnemyBoss()
        intervalGame = setInterval(spawnEnemyBoss, settings.spawnInterval)
    }else{
        if(gameplay.difficulty === 2){
            gameplay.nbEnemiesMax = 50
            gameplay.hpEnemies = 30
            gameplay.damageEnemies = 15
            gameplay.speedEnemies = 1.5
            settings.spawnInterval = 3000
            gameplay.boss = new boss(75, random(width), random(height),[], 100, 5, 2)
            for(let i = 0; i < 5; i++){
                spawnEnemyBoss()
            }
            intervalGame = setInterval(spawnEnemyBoss, settings.spawnInterval)
        }else{
            if(gameplay.difficulty === 3){
                gameplay.nbEnemiesMax = 100
                gameplay.hpEnemies = 50
                gameplay.damageEnemies = 50
                gameplay.speedEnemies = 2
                settings.spawnInterval = 3000
                gameplay.boss = new boss(50, random(width), random(height),[], 150, 10, 3)
                for(let i = 0; i < 5; i++){
                    spawnEnemyBoss()
                }
                intervalGame = setInterval(spawnEnemyBoss, settings.spawnInterval)
            }
        }
    }
    

}

function startGameWave(){
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


    if(ship.hp <= 0) {
        settings.mode = -1
    }

    if(settings.mode != -3 && settings.mode != -4) {
        if (buttonPause) {
            buttonPause.remove();
            buttonPause = null;
        }
    }

    if(settings.mode != 4 && settings.mode != 2 && settings.mode != -3 && settings.mode != -4) {
        if (intervalGame) {
            clearInterval(intervalGame);
            intervalGame = null;
        }
    }

    if(settings.mode == 0) {
        mainMenu()  
    } else {
        if(settings.mode == 1) {
            menuWaves()
            if (keyIsDown(32)) {  // space
                startGameWave()
                settings.mode = 2
            }   
        } else {
            if(settings.mode == 3) {
                menuBoss()
            } else {
                if(settings.mode == -1) {
                    menuDeath()
                } else {
                    if(settings.mode == -2) {
                        menuSettings()
                    } else {
                        if(settings.mode == -3 || settings.mode == -4) {
                            menuPause()
                        } else {
                            background(30)

                            image(hexGrid, 0, 0)
                            ship.draw()
                            ship.update()
                            handleJoysticks()

                            if(settings.mode==2){
                                text(`Score : ${gameplay.score}`, width/18, height/8)
                                text(`Vagues : ${gameplay.wave}`, width/1.15, height/8)
                            

                            

                        
                                for(let i=0; i<enemies.length; i++) {
                                    enemies[i].draw()
                                    enemies[i].move(ship)
                                    if (enemies[i].hp <= 0) {
                                        gameplay.score += enemies[i].deathScore
                                        enemies.splice(i, 1)
                                    }
                                }

                                if(gameplay.nbEnemiesMax === gameplay.nbEnemies && enemies.length === 0){
                                    gameplay.wave++
                                    gameplay.nbEnemies = 0
                                    gameplay.nbEnemiesMax += 2

                                    if(gameplay.wave % 4 === 0){
                                        gameplay.hpEnemies += 5
                                    }
                                    if(gameplay.wave % 5 === 0){
                                        gameplay.damageEnemies += 5

                                    }
                                    if(gameplay.wave % 6 === 0){
                                        gameplay.speedEnemies += 0.5
                                    }                          
                                }
                            }else{

                                gameplay.boss.draw()
                                gameplay.boss.action(ship)

                                
                            }
                        }
                    }
                }
            }
        }    
    }
    noCursor()
    drawCursor()

}

function handleJoysticks() {

    joystick1.update()
    joystick1.display()

    joystick2.update()
    joystick2.display()
}

function drawHexGrid(pg, cols, rows, hexWidth, hexHeight, hexRadius) {
    pg.clear()
    for (let row = 0; row <= rows; row++) {
        for (let col = 0; col <= cols; col++) {
            let x = col * hexWidth
            let y = row * hexHeight

            if (col % 2 === 1) {
                y += hexHeight / 2
            }
            pg.push()
            drawHexagon(pg, x, y, hexRadius)
            pg.pop()
        }
    }
}

function drawHexagon(pg, x, y, radius) {
    pg.beginShape()
    pg.noStroke()
    pg.fill(50)

    for (let i = 0; i < 6; i++) {
        let angle = TWO_PI / 6 * i
        let xOffset = cos(angle) * radius
        let yOffset = sin(angle) * radius
        pg.vertex(x + xOffset, y + yOffset)
    }
    pg.endShape(pg.CLOSE)
}


function mousePressed() {
    if(getAudioContext().state !== 'running') {
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
    
    if (settings.mode === 0 || settings.mode === -1 || settings.mode === -2 || settings.mode === -3 || settings.mode === -4) {
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


function keyPressed(){
    if(settings.mode === 2){
        if(key === "p" || key === "P"){
            settings.mode = -3
            buttonPause = createButton("Reprendre partie")
            buttonPause.style('background-color', 'rgba(0,0,0,0)')
            buttonPause.style('color', 'white')
            buttonPause.style('font-family', 'arial')
            buttonPause.style('border', '3px solid white')
            buttonPause.style('padding', `${width/50}px`)

            buttonPause.mouseOver(() => {
                buttonPause.style('background-color', 'rgba(75,75,75)')
            })
            buttonPause.mouseOut(() => {
                buttonPause.style('background-color', 'rgba(0,0,0,0)')
            })
            buttonPause.mousePressed(() => {
                settings.mode = 2
            })
        }
    }
    if(settings.mode === 4){
        if(key === "p" || key === "P"){
            settings.mode = -4
            buttonPause = createButton("Reprendre partie")
            buttonPause.style('background-color', 'rgba(0,0,0,0)')
            buttonPause.style('color', 'white')
            buttonPause.style('font-family', 'arial')
            buttonPause.style('border', '3px solid white')
            buttonPause.style('padding', `${width/50}px`)

            buttonPause.mouseOver(() => {
                buttonPause.style('background-color', 'rgba(75,75,75)')
            })
            buttonPause.mouseOut(() => {
                buttonPause.style('background-color', 'rgba(0,0,0,0)')
            })
            buttonPause.mousePressed(() => {
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

function makeFullScreen(){
    let container = document.getElementById('canvaGame');
    container.requestFullscreen()
}


