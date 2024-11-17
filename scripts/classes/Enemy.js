class Enemy{
  
  constructor(size, x, y, hp, ds, sd, dg){ 
    this.pos = createVector(x, y);
    this.size = size;
    this.angle = 0
    
    this.hp = hp;
    this.deathScore = ds;
    this.speed = sd;
    this.bullets = [];
    this.color = color(255,132,132)
    this.lastShotTime = millis();
    this.shootInterval = random(2500, 3000);
    this.damage = dg
    
      
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
    text(this.hp, 0, 0)
    
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
      target.hp -= this.damage
      this.hp = 0
    }

    for(let targetBullet of target.bullets) {
      if (this.isOnTarget(targetBullet)) {
        this.hp -= target.damage
        targetBullet.lifespan = 0
      }
    }

  }
  
  isOnTarget(target){
    return dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y) < this.size/2 + target.w/2
  }

  shoot(target){
    if(millis() - this.lastShotTime > this.shootInterval){
      this.bullets.push(new Bullet(this.pos, target.pos, 5, 15, 10, 10000))
      this.lastShotTime = millis()
    }
  }
}

  
  