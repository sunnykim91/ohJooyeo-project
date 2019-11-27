import React, { Component } from 'react';
import Ad from './Ad';
import ButtonPlus from '../common/button/ButtonPlus'
import './AdList.css';
import '../common/button/ButtonPlus.css';

class AdList extends Component {
    render() {
        const {adContents} = this.props;
        const ads = adContents.map((ad,idx) => (
            <Ad key={"ad"+idx} contents={ad}/>
        ))

        return (
            <div id="ad-list"className='list-container'>
                <h1>광고</h1>
                {ads}
                <ButtonPlus/>
            </div>
        );
    }
}
    
export default AdList;