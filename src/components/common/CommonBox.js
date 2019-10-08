import React, { Component } from 'react';
import './CommonBox.css';
class CommonBox extends Component {
    render() {
        const {position,contents} = this.props;
        // const children = React.createElement(this.props.children);
        return (
            <div className={position}>
                {[...contents]}
            </div>
        );
    }
}

export default CommonBox;