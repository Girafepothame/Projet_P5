class boss{
    constructor(size, x, y, tabEnemy, hp, deathScore, speed, difficulty){
      this.tabEnemy = tabEnemy;
      this.hp = hp;
      this.deathScore = deathScore
      this.size = size;
      this.pos = createVector(x,y);
      this.speed = speed;
      this.difficulty = difficulty;
      
    }
    
    
    draw(){
      push()
      rectMode(CENTER)
      noStroke()
      fill(255,132,132)
      rect(this.pos.x, this.pos.y, this.size)
      
      pop()
      
    }
    
    
  }