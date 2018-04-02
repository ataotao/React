import React, { Component } from 'react';
import { ActivityIndicator } from 'antd-mobile';

class PageLoading extends Component {
    render() {
        return <ActivityIndicator size="large" toast text="loading"/>;
    }
}

export default PageLoading;