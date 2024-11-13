
let ship
let enemies =[]

function preload() {

}

function setup() {
    createCanvas(windowWidth, windowHeight)
    ship = new Ship(width/2, height/2, 20, 30)
    enemies[0]= new Enemy(20, 100, 100, 1);
}

function draw() {
    background(30)

    
    ship.draw()
    ship.update()

    enemies[0].draw();
    console.log(ship)
    enemies[0].move(ship);
    
}

