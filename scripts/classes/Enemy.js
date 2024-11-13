class Enemy{
  
    constructor(size, x, y, type){
      if(type==1){
        this.hp = 10;
        this.deathScore = 10;
        this.size = size;
        this.pos = createVector(x,y);
        this.speed = 10;
        this.angle = 10;
        this.bullet = [];
        this.color = color(255,132,132)
        
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
    }


    move(target){
      let direction = p5.Vector.sub(target, this.pos);
      direction.normalize()
      direction.mult(this.speed);
      
      this.pos.add(direction);
    }
    
    isOnTarget(target){
      return p5.Vector.dist(this.pos,target)<this.speed;
    }
  }
  
  
  