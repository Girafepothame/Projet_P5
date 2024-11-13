
let ship
let enemies =[]

let settings = {
    mode : 0,
    score : 0,
    waves : [],
    wave : 0,
}

function preload() {

}


function menuWaves(){
    background(30)
    fill(255)
    textSize(30)
    text("Press Space to start", width/2 - textWidth("Press Space to start")/2, height/2)
}

function setup() {
    createCanvas(windowWidth, windowHeight)
    ship = new Ship(width/2, height/2, 20, 30)

    for (let i = 0; i < 10; i++) {
        enemies.push(new Enemy(20, random(width), random(height), 1));
    }
    settings.menu = 1
}

function draw() {

    if(settings.menu == 1){
        menuWaves()
        if (keyIsDown(32)) {
            settings.menu = 2
        }   
    }else{
        background(30)

    
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

