import React from 'react';
import ReactDOM from 'react-dom';
import { App, Clock} from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('clock')
  );
}

setInterval(tick, 1000);