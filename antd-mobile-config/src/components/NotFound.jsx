import React from 'react';
import img from '../assets/imgs/404.png';

class NotFound extends React.Component {
    state = {
        animated: ''
    };
    enter = () => {
        this.setState({ animated: 'hinge' });
    };
    render() {
        return (
            <div
                className="center"
                style={{
                    height: '100%',
                    background: '#ececec',
                    overflow: 'hidden',
                    textAlign: 'center'
                }}
            >
                <img
                    src={img}
                    alt="404"
                    className={`animated swing ${this.state.animated}`}
                    onClick={this.enter}
                />
            </div>
        );
    }
}

export default NotFound;
