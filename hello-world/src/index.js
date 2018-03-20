import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// 'root' 我们称之为“根”DOM节点，因为它内部的所有内容都将由React DOM进行管理。
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// test render
// function tick() {
//   const element = (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//   ReactDOM.render(element, document.getElementById('root1'));
// }

// setInterval(tick, 1000);
