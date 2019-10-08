import React, { Component } from 'react';
import CommonBox from './CommonBox';
import '../worship/AdList.css';

class TwoSplitContent extends Component {
    render() {
        const {left, right} = this.props
        return (
            <div className="content-container">
                <CommonBox position={'left'} contents = {left} />
                <CommonBox position={'right'} contents = {right} />
            </div>
        );
    }
}

export default TwoSplitContent;