import autoBind from 'react-autobind';


class GraphicEngine {
  constructor(canvas) {
    autoBind(this);
    this.canvas = canvas;
    if (canvas.getContext) {
      this.context = canvas.getContext('2d');
    } else {
      console.error('No context');
    }
    this.center = {
      x: canvas.width / 2,
      y: canvas.height / 2
    };
    this.zoom = 50;
    this.diag = 1;
    this.right = this.rotate({x:0, y:-this.diag}, {x:0, y:0}, 120).x;
    this.bot = this.rotate({x:0, y:-this.diag}, {x:0, y:0}, 120).y;
  }


  draw() {
    this.resetCanvas();
    this.drawBackground();
    this.drawShip();
  }


  drawBackground() {
    for(let x = -2 ; x <= 2 ; x++) {
      for(let y = -2 ; y <= 2 ; y++) {
        this.drawTriangle(x, y);
      }
    }
    this.context.fillStyle = "#f00";
    for(let x = 249 ; x < 250 ; x++) {
      for(let y = 0 ; y < 500 ; y++) {
        let a = this.getTriangle({x:x, y:y});
        if(a.y === 0) {
          this.context.fillRect(x, y, 1, 1);
        }
      }
    }
    this.context.fillStyle = "#00f";
    for(let x = 205 ; x < 207 ; x++) {
      for(let y = 0 ; y < 500 ; y++) {
        let a = this.getTriangle({x:x, y:y});
        if(a.y === 1) {
          this.context.fillRect(x, y, 1, 1);
        }
      }
    }
  }


  drawShip() {
    
  }


  drawTriangle(x, y) {
    let t = this.getTriangleFromGameToCanvas(x, y);
    this.context.fillStyle = "#ddd";
    this.context.beginPath();
    this.context.moveTo(t.b.x, t.b.y);
    this.context.lineTo(t.c.x, t.c.y);
    this.context.lineTo(t.d.x, t.d.y);
    this.context.lineTo(t.b.x, t.b.y);
    this.context.fill();
    this.context.strokStyle = "#ddd";
    this.context.stroke();
  }


  getTriangle(p) {
    console.log(p);
    console.log("ee", this.bot, this.diag);
    let y = p.y;
    let x = 0;
    y -= this.center.y;
    y -= this.zoom * this.bot;
    y /= this.zoom*(this.bot+this.diag);
    y = Math.floor(y+1);
    console.log(y);
    return {x:x, y:y};
  }


  getTriangleFromGameToCanvas(x, y) {
    let a = {
      x: this.center.x + x * this.zoom * this.right,
      y: this.center.y - y * this.zoom * (this.diag + this.bot)
    }
    let b = {
      x: a.x,
      y: a.y - this.diag * this.zoom
    };
    let c = {
      x: b.x,
      y: b.y
    };
    let d = {
      x: b.x,
      y: b.y
    };
    c = this.rotate(c, a, 120);
    d = this.rotate(d, a, 120*2);
    if((x+y)%2) {
      a.y -= (this.diag - this.bot) * this.zoom;
      b.y += (this.diag + this.bot) * this.zoom;
      c.y -= (this.diag + this.bot) * this.zoom;
      d.y -= (this.diag + this.bot) * this.zoom;
    }
    return {a:a, b:b, c:c, d:d};
  }


  resetCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }


  rotate(p, c, angle) {
    angle = this.toRadians(angle);
    let si = Math.sin(angle);
    let co = Math.cos(angle);
    p.x -= c.x;
    p.y -= c.y;
    let xnew = p.x * co - p.y * si;
    let ynew = p.x * si + p.y * co;
    p.x = xnew + c.x;
    p.y = ynew + c.y;
    return p;
  }


  start() {
    //this.drawLoop = setInterval(this.draw, 10);
    this.draw();
  }


  toDegrees (angle) {
    return angle * (180 / Math.PI);
  }


  toRadians (angle) {
    return angle * (Math.PI / 180);
  }
}


export default GraphicEngine;
