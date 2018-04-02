import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
class Loading extends Component {
    render() {
        console.log('Loading');
        return (
            <div>
                <Helmet>
                    <title>页面加载中...</title>
                </Helmet>
                <Redirect
                    to={{
                        pathname:
                            '/392394702372354048/392394702976333312/main/searchModel'
                    }}
                />
            </div>
        );
    }
}

export default Loading;
