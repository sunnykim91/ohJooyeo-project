import React, { Component } from 'react';
import './NavBar.css';

class NavBar extends Component {
    render() {
        return (
            <div className='left-layout'>
                {this.props.showNav}
            </div>
        );
    }
}

export default NavBar;