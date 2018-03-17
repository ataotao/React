import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React11</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>


    );
  }
}

class Clock extends Component {
  render() {
    return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
    </div>
    );
  }
}


export {Clock, App};

