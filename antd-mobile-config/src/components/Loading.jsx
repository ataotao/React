import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
class Loading extends Component {
  render() {
    return (
      <div>
        <Helmet>
            <title>页面加载中...</title>
        </Helmet>
        <Redirect to={{
            pathname: '/app/category',
            search: '?tenantId=121265185512782854&brandId=121266371208969222'
          }}/>
      </div>
    );
  }
}

export default Loading;
