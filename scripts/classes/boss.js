class boss{
  constructor(size, x, y, tabEnemy, hp, deathScore, speed, difficulty){
    this.tabEnemy = tabEnemy;
    this.hp = hp;
    this.hpMax = hp;
    this.deathScore = deathScore
    this.size = size;
    this.pos = createVector(x,y);
    this.speed = speed;
    this.difficulty = difficulty;
    this.run = createVector(x,y);
    
  }
  
  displayHealth() {
    push();
    noStroke();
    fill(255);
    let healthLength = map(this.hp, 0, this.hpMax, 0, width / 2);
    healthLength = constrain(healthLength, 0, width / 2);
    rect(width / 2, height- height / 12.75, healthLength, height / 75);
    pop();
  }
    
  draw(){
    push()
    rectMode(CENTER)
    noStroke()
    fill(255,132,132)
    rect(this.pos.x, this.pos.y, this.size)
    this.displayHealth()
    pop()
    
  }

  isOnTarget(target){
    return dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y) < this.size/2 + target.w/2
  }

  action(target){
    for(let targetBullet of target.bullets) {
      if (this.isOnTarget(targetBullet)) {
        this.hp -= target.damage
        targetBullet.lifespan = 0
      }
    }


    let life = 100*this.hp/this.hpMax
    for(let i=0; i<this.tabEnemy.length; i++) {
      this.tabEnemy[i].draw()
      this.tabEnemy[i].move(ship)
      if (this.tabEnemy[i].hp <= 0) {
        this.tabEnemy.splice(i, 1)
      }
    }

    if(life<50){
      if(p5.Vector.dist(this.run, this.pos) < 5){
        this.run.x = random(width)
        this.run.y = random(height)
      }else{
        let direction = p5.Vector.sub(this.run, this.pos);
        direction.normalize()
        direction.mult(this.speed);
        this.pos.add(direction);
      }
    }
  }
    
    
  }