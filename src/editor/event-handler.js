import autoBind from 'react-autobind';


class EventHandler {
  constructor(canvas, graphicEngine) {
    autoBind(this);
    this.canvas = canvas;
    this.graphicEngine = graphicEngine;
  }


  start() {
    let this_ = this;
    this.canvas.addEventListener('mousemove', function( event ) {
      let rect = this_.canvas.getBoundingClientRect();
      let p = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
      this_.graphicEngine.getTriangle(p);
    });
  }
}


export default EventHandler;
