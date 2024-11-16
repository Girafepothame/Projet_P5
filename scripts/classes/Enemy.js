class Enemy{
  
  constructor(size, x, y, type) {
    this.pos = createVector(x, y);
    this.size = size;
    this.angle = 0
    
    if(type==1){
      this.hp = 10;
      this.deathScore = 10;
      this.speed = 1;
      this.bullets = [];
      this.color = color(255,132,132)
      this.lastShootTime = millis();
      this.shootInterval = random(2500, 3000);
      this.damage = 10
    }
      
  }
    
    
  draw(){
    this.angle += 0.1
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.angle)
    rectMode(CENTER)
    fill(255)
    noStroke()
    rect(0, 0,this.size)
    
    noFill()
    stroke(this.color)
    rect(0, 0, this.size*1.5)

    pop()

    this.bullets = this.bullets.filter(bullet => {
      return bullet.lifespan > 0
    })
  }


  move(target){
    let direction = p5.Vector.sub(target.pos, this.pos);
    direction.normalize()
    direction.mult(this.speed);
    
    this.pos.add(direction);

    this.shoot(target)
    this.bullets.forEach(bullet => {
      bullet.update()
      bullet.display()
      if (bullet.hits(target)) {
        target.hp -= this.damage
        bullet.lifespan = 0
      }
    })

    if (this.isOnTarget(target)) {
      console.log("ratio")
      target.hp -= this.damage
      this.hp = 0
    }

  }
  
  isOnTarget(target){
    return dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y) < this.size/2 + target.w/2
  }

  shoot(target){
    if(millis() - this.lastShootTime > this.shootInterval){
      this.bullets.push(new Bullet(this.pos, target.pos, 5, 15, 10, 10000))
      this.lastShootTime = millis()
    }
  }
}

  
  