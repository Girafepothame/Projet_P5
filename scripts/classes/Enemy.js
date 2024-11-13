class Enemy{
  
    constructor(size, x, y, type){
      if(type==1){
        this.hp = 10;
        this.deathScore = 10;
        this.size = size;
        this.pos = createVector(x,y);
        this.speed = 1;
        this.angle = 10;
        this.bullets = [];
        this.color = color(255,132,132)
        this.lastShootTime = 0;
        this.shootInterval = 1000;
      }
      
    }  
    
    
    draw(){
      push()
      rectMode(CENTER)
      fill(255)
      noStroke()
      rect(this.pos.x,this.pos.y,this.size)
      
      noFill()
      stroke(this.color)
      rect(this.pos.x,this.pos.y,this.size*1.5)
  
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

      this.shoot(ship)
      this.bullets.forEach(bullet => {
        bullet.update();
        bullet.display();
      });

    }
    
    isOnTarget(target){
      return p5.Vector.dist(this.pos,target)<this.speed;
    }

    shoot(target){
      if(millis() - this.lastShootTime > this.shootInterval){
        this.bullets.push(new Bullet(this.pos,target.pos, 5, 15, 10,750));
        this.lastShootTime = millis();
      }
    }
  }
  
  
  