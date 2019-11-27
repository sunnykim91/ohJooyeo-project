import React, { Component } from 'react';
import Order from './Order';
import ButtonPlus from '../common/button/ButtonPlus';
import './OrderList.css';
import '../common/button/ButtonPlus.css';
class OrderList extends Component {
    render() {
        const {orderContents} = this.props;
        const orders = orderContents.map((order,idx) => (
            <Order key={"order"+idx} contents={order}/>
        ))

        return (
            <div id ="order-list" className='list-container'>
                <h1>순서</h1>
                {orders}
                <ButtonPlus/>
            </div>
        );
    }
}

export default OrderList;