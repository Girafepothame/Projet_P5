
let ship

function preload() {

}

function setup() {
    createCanvas(windowWidth, windowHeight)
    ship = new Ship(width/2, height/2, 75)
}

function draw() {
    background(30)

    ship.draw()
    ship.update()
}

