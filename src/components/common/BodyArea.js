import React, { Component } from 'react';

class BodyArea extends Component {
    render() {
        return (
            <div className="container">
                {[...this.props.children]}
            </div>
        );
    }
}

export default BodyArea;