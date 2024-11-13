class Bullet {
    constructor(pos, direction, w, h, speed, lifespan) {
      this.h = h
      this.w = w 
      this.speed = speed
      this.pos = pos.copy()
      this.direction = createVector(direction.x - pos.x, direction.y - pos.y).heading();
     
      this.lifespan = lifespan
  
    }
  
    update() {
        this.pos.x += cos(this.direction) * this.speed
        this.pos.y += sin(this.direction) * this.speed
        this.lifespan -= 5
  
    }
  
    isOffScreen() {
      return (
        this.pos.x < 0 || 
        this.pos.x > width || 
        this.pos.y < 0 || 
        this.pos.y > height
      )
    }
    
    hits(entity) {
      let d = dist(this.pos.x, this.pos.y, entity.pos.x, entity.pos.y)
      return d < entity.size
    }
  
    display() {
      push()
      noStroke()

      translate(this.pos.x, this.pos.y)


      rotate(this.direction)
      rectMode(CENTER)
  
      rect(0, 0, this.h, this.w)
      
      pop()
    }
  }