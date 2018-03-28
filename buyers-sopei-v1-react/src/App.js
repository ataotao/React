import React, { Component } from 'react';
import './App.css';


class App extends Component {
  state = {
    collapsed: false
  };
  componentWillMount() {
    const { receiveData } = this.props;
    console.log('componentWillMount', receiveData);
  }
  componentDidMount() {
    console.log('componentDidMount');
  }

  handleClick = () => {
    fetch(
      '/api/user/v1.0/info/mine?tenant_id=370763113544693760&brand_id=370763114148673280'
    )
      .then(function(response) {
        return response;
      })
      .then(function(response) {
        console.log(response);
      });
  };
  render() {
    return (
      <div>
        APP
      </div>
    );
  }
}

export default App;
