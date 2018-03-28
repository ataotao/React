import React, { Component } from 'react';
import { Button } from 'antd-mobile';


import { Link } from 'react-router-dom';

class QueryCategory extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="query">query</Link>
        </div>
        <div>
          <Link to="queryCategory">queryCategory</Link>
        </div>
        <Button type="primary">Query</Button>
      </div>
    );
  }
}

export default QueryCategory;
