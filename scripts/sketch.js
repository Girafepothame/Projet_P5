
let ship
let enemies =[]

function preload() {

}

function setup() {
    createCanvas(windowWidth, windowHeight)
    ship = new Ship(width/2, height/2, 20, 30)

    for (let i = 0; i < 10; i++) {
        enemies.push(new Enemy(20, random(width), random(height), 1));
    }
}

function draw() {
    background(30)

    text(ship.hp, 50, 50)
    
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

