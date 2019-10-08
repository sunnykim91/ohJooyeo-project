import React, { Component } from 'react';
import BodyArea from './components/common/BodyArea'
import NavBar from './components/common/NavBar'
import LoginLeft from './components/login/LoginLeft';
import LoginRight from './components/login/LoginRight';
import './components/common/BodyArea.css';
import TwoSplitContent from './components/common/TwoSplitContent';
import './components/common/TwoSplitContent.css';
import OrderList from './components/worship/OrderList';
import AdList from './components/worship/AdList';
import Helper from './components/worship/Helper';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageName: 'login',
      showNav:'true',
      orderContents:[]
    }
  }
  render() {
    let bodyContent =[]
    const { pageName} = this.state;
    let orderContents = [];
    let adContents = [];
    switch (pageName) {
      case 'login':
        bodyContent =
          [<LoginLeft />,
          <LoginRight />];
          break;

      case 'add':
        orderContents = ["tttt","ssssss","zzzzzz","tttt","ssssss","zzzzzz","tttt","ssssss","zzzzzz",  "tttt","ssssss","zzzzzz"];
        adContents = ["tttt","ssssss","zzzzzz","tttt","ssssss","zzzzzz","tttt","ssssss","zzzzzz",  "tttt","ssssss","zzzzzz"];
        bodyContent =
        [<TwoSplitContent mode={pageName} left={[(<Helper />),(<OrderList orderContents = {orderContents}/>)]} right={[(<AdList  adContents = {adContents}/>)]}/>];
        break;

      case 'update':
        orderContents = ["tttt","wwtwt","tttt","wwtwt","tttt","wwtwt","tttt","wwtwt"];
        bodyContent =
        [<TwoSplitContent mode={pageName} left={(<OrderList orderContents = {orderContents}/>)} right={(<AdList/>)}/>];
      break;

      default: bodyContent=(<div>default Page</div>)
    }
    return (
      <div>
        <BodyArea>
          <NavBar showNav ={this.state.showNav}/>
          {bodyContent}
        </BodyArea>
      </div>
    );
  }
}

export default App;