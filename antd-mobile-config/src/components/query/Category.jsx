import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from 'antd-mobile';

class Category extends Component {
  render() {
    return (
      <div>
        <Helmet>
            <title>雨神品牌</title>
        </Helmet>
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

export default Category;
