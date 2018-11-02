import React, { Component } from 'react';
import './Editor.css';
import EventHandler from './event-handler.js';
import GraphicEngine from './graphic-engine.js';


class Editor extends Component {
  render() {
    return (
      <div className="Editor">
        <canvas
          id="canvas"
          className="canvas"
          width="500"
          height="500"
        ></canvas>
      </div>
    );
  }


  componentDidMount() {
    let canvas = document.getElementById('canvas');
    let graphicEngine = new GraphicEngine(canvas);
    graphicEngine.start();
    let eventHandler = new EventHandler(canvas, graphicEngine);
    eventHandler.start();
  }
}


export default Editor;
