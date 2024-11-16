
let ship
let cannon
let enemies = []
let mouseImage

let settings = {
    mode : 0,
    score : 0,
    waves : [],
    wave : 0,
}

let hexRadius
let hexGrid

function preload() {
    mouseImage = loadImage("Img/mouse.svg")

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
    textSize(size/3)
    text(key, x + size/2, y + size /2)


    // Texte explication
    fill(255)
    textAlign(CENTER, TOP)
    text(explanation, x + size/2, y + size*1.2)
    pop()
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


    textSize(size/3)

    fill(255)
    text("Viser avec la souris", centerX - textWidth("Viser avec la souris")/3, centerY + spacing*1.5 + imgSize*1.2)
}

function setup() {
    createCanvas(windowWidth, windowHeight)
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

    settings.menu = 1
}

function draw() {

    if(settings.menu == 1) {
        menuWaves()
        if (keyIsDown(32)) {
            settings.menu = 2
        }   
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


function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}