import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
class Loading extends Component {
  render() {
    return (
      <div>
        <Redirect
          to={{
            pathname: '/query/index',
            search: '?tenantId=121265185512782854&brandId=121266371208969222'
          }}
        />
      </div>
    );
  }
}

export default Loading;
