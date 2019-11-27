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
import Axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageName: 'update',
      showNav:'true',
      serverUrl : 'http://aaaicu.synology.me:8088/OhJooYeoMVC',
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
        [<TwoSplitContent key="add" mode={pageName} left={[(<Helper />),(<OrderList orderContents = {orderContents}/>)]} right={[(<AdList  adContents = {adContents}/>)]}/>];
        break;

      case 'update':

        Axios.post('http://localhost:8080/ohjooyeo/worship/info/',{
          "churchId": "1",
          "worshipId" : "19-001",
          "version" : 0
        }).then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
        });

        orderContents = ["tttt","ssssss","zzzzzz","tttt","ssssss","zzzzzz","tttt","ssssss","zzzzzz",  "tttt","ssssss","zzzzzz"];
        adContents = ["tttt","ssssss","zzzzzz","tttt","ssssss","zzzzzz","tttt","ssssss","zzzzzz",  "tttt","ssssss","zzzzzz"]; 
        
        bodyContent =
        [<TwoSplitContent key="update" mode={pageName} left={[(<Helper key={"left"+0}/>),(<OrderList key={"left"+1} orderContents = {orderContents}/>)]} right={[(<AdList key={"right"+0} adContents = {adContents}/>)]}/>];
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