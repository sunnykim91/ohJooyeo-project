import React, { Component } from 'react';
import './Ad.css'
class Ad extends Component {
    render() {
        const {contents} = this.props;
        return (
            <div className="ad-element" id="-1" data-order="-1" data-edit-yn="0" draggable="true" data-update-yn="0">
                {contents}
            </div>
        );
    }
}

export default Ad;