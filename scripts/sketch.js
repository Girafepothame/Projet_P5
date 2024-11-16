
let ship
let cannon
let enemies = []
let mouseImage

let settings = {
    mode : 0,      // -2 parametres, -1 = vous etes mort,  0 = menu, 1 = menu vagues, 2 = jeu vagues,
    score : 0,
    waves : [],
    wave : 0,

}


let assets = {
    font: null,
    gameMusics: [],
}
let buttonsMenu = []; // Stocker la position des boutons du menu

let gameplay = {
    currentSongIndex: 0,
    volumeMusic : 25,
    cursor: { x: 0, y: 0 },
};

let volumeSlider


let hexRadius
let hexGrid


function preload() {
    mouseImage = loadImage("assets/Img/mouse.svg")
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

    buttons.push({
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
    
    buttons = [];
    drawButton("V A G U E S", height * 0.35);
    drawButton("P A R A M E T R E S", height * 0.55);

}



function menuWaves(){
    background(30)
    fill(255)
    textSize(30)
    text("Press Space to start", width/2 - textWidth("Press Space to start")/2, height/6)
    
    
    // Controles
    let size =  min(width, height) / 15
    let spacing = size * 2

    let centerX = width / 2
    let centerY = height / 2

    drawKey(centerX, centerY - spacing, size, "Z", "Avancer")
    drawKey(centerX - spacing, centerY, size, "Q", "Gauche")
    drawKey(centerX, centerY, size, "S", "Reculer")
    drawKey(centerX + spacing, centerY, size, "D", "Droite")

    let imgSize = size * 1.5
    image(mouseImage, centerX - imgSize/4, centerY + spacing*1.5, imgSize, imgSize)


    textSize(size/6)

    fill(255)
    text("Viser avec la souris", centerX - textWidth("Viser avec la souris")/3, centerY + spacing*1.5 + imgSize*1.2)
}


function menuDeath(){
    background(30)

    image(hexGrid, 0, 0)

    fill(255)
    textSize(width/50)
    text("Vous êtes mort", width/2 - textWidth("Vous êtes mort")/2, height/4)
    
    buttons = [];
    drawButton("M E N U", height * 0.35);
}


function menuSettings(){
    background(30)
    image(hexGrid, 0, 0)

    fill(255)
    textSize(width/50)
    text("Paramètres", width/2 - textWidth("Paramètres")/2, height/4)
    
    buttons = [];
    drawButton("M E N U", height * 0.35);

    let space = height/15

    // Volume
    if(!volumeSlider){
        fill(255)
        textSize(width/50)
        volumeSlider = createSlider(0, 100, gameplay.volumeMusic);
        volumeSlider.position(width/2 - volumeSlider.width/2, height/2 + space);
    }
    if(assets.gameMusics[gameplay.currentSongIndex].isPlaying()){
        assets.gameMusics[gameplay.currentSongIndex].setVolume(volumeSlider.value()/100)
    }

    gameplay.volumeMusic = volumeSlider.value()

    fill(255)
    textSize(width/50)
    text(`Volume : ${volumeSlider.value()}`, width/2 - textWidth(`Volume : ${volumeSlider.value()}`)/2, height/2 + space *2)
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
function setup() {
    createCanvas(windowWidth, windowHeight)
    textFont(assets.font);

    if (volumeSlider) {
        volumeSlider.remove();
        volumeSlider = null;
    }
    assets.gameMusics = shuffle(assets.gameMusics);

    enemies = []
    settings.mode = 0
    settings.score = 0
    settings.waves = []
    settings.wave = 0


    hexRadius = 25

    let hexWidth = sqrt(3) * hexRadius
    let hexHeight = 2 * hexRadius

    let cols = ceil(width / hexWidth)
    let rows = ceil(height / hexHeight)

    hexGrid = createGraphics(width, height)

    drawHexGrid(hexGrid, cols, rows, hexWidth, hexHeight, hexRadius)

    ship = new Ship(width/2, height/2, 20, 45)

    for (let i = 0; i < 10; i++) {
        enemies.push(new Enemy(20, random(width), random(height), 1));
    }
}

function draw() {
    if(ship.hp == 0) {
        settings.mode = -1
    }
    if(settings.mode == 0) {
        mainMenu()  
    } else {
        if(settings.mode == 1) {
            menuWaves()
            if (keyIsDown(32)) {
                settings.mode = 2
            }   
        } else {
            if(settings.mode == -1) {
                menuDeath()
            } else {
                if(settings.mode == -2) {
                    menuSettings()
                } else {
                    background(30)

                    image(hexGrid, 0, 0)
                
                    ship.draw()
                    ship.update()

                
                    for(let i=0; i<enemies.length; i++) {
                        enemies[i].draw()
                        enemies[i].move(ship)
                        if (enemies[i].hp == 0) {
                            enemies.splice(i, 1)
                        }
                    }
                }
            }
        }    
    }
    noCursor()
    drawCursor()

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
    if (settings.mode === 0 || settings.mode === -1 || settings.mode === -2) {
        for (let i = 0; i < buttons.length; i++) {
            if (
                mouseX > buttons[i].x1 &&
                mouseX < buttons[i].x2 &&
                mouseY > buttons[i].y1 &&
                mouseY < buttons[i].y2
            ) {
                if (buttons[i].label === "V A G U E S") {
                    settings.mode = 1;
                }else{
                    if (buttons[i].label === "M E N U") {
                        setup()
                    }else{
                        if (buttons[i].label === "P A R A M E T R E S") {
                            settings.mode = -2;
                        }
                    }
                }
            }
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)

    hexRadius = 25

    let hexWidth = sqrt(3) * hexRadius
    let hexHeight = 2 * hexRadius

    let cols = ceil(windowWidth / hexWidth)
    let rows = ceil(windowHeight / hexHeight)

    hexGrid = createGraphics(windowWidth, windowHeight)
    drawHexGrid(hexGrid, cols, rows, hexWidth, hexHeight, hexRadius)

}