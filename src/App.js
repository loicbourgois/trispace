import React, { Component } from 'react';
import './App.css';

import Editor from './editor/Editor.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a>
            Editor
          </a>
          <a>
            Sandbox
          </a>
        </header>
        <Editor></Editor>
      </div>
    );
  }
}

export default App;
