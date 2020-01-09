/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, createContext } from 'react';
import Axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import './DetailWorship.css';
import WorshipOrder from './WorshipOrder';
import Worshipinfo from './Worshipinfo';
import Advertise from './Advertise';
import Header from './Header';
import { Route, Switch } from 'react-router-dom';

export const WorshipContext = createContext();

const DetailWorship = ({ match }) => {
  const [matchId, setMatchId] = useState(match.params.id);
  const [worshipDetailForSend, setWorshipDetailForSend] = useState({
    'worshipInfo': {
      'churchId': 1,
      'worshipDate': '2019-12-16',
      'mainPresenter': '사회자',
      'nextPresenter': '다음사회자',
      'nextPrayer': '다음기도자',
      'nextOffer': '다음봉헌자'
    },
    'worshipOrder': [],
    'worshipAd': []
  });

  const [worshipDetailForReceive, setWorshipDetailForReceive] = useState({
    'nextPresenter': {},
    'mainPresenter': '',
    'worshipOrder': [],
    'version': 0
  });

  const [initialized, setInitialized] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getWorshipInfo = async () => {
    const baseURL = 'http://aaaicu.synology.me:8088/OhJooYeoMVC';
    await Axios.post(`${baseURL}/worship/info/`, {
      churchId: 1,
      worshipId: `${match.params.id}`,
      version: 0
    })
      .then(response => {
        setWorshipDetailForReceive(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const saveWorshipInfo = async () => {
    const baseURL = 'http://aaaicu.synology.me:8088/OhJooYeoMVC';
    setWorshipDetailForSend(prevWorshipDetailForSend => {
      prevWorshipDetailForSend.worshipOrder =
        worshipDetailForReceive.worshipOrder;

      return prevWorshipDetailForSend;
    });
    await Axios.post(`${baseURL}/worship/add/`, worshipDetailForSend)
      .then(response => {
        // setWorshipInfo(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!initialized) {
      getWorshipInfo();
      setInitialized(true);
    }
  }, [worshipDetailForReceive]);

  const value = {
    state: { matchId, open, worshipDetailForReceive, worshipDetailForSend },
    actions: {
      getWorshipInfo,
      saveWorshipInfo,
      handleDrawerOpen,
      handleDrawerClose,
      setWorshipDetailForReceive,
      setWorshipDetailForSend
    }
  };

  return (
    <WorshipContext.Provider value={value}>
      <CssBaseline />
      <Header />
      <main className={open ? 'mainOpen' : 'mainClose'}>
        <Switch>
          <Route
            exact
            path='/detailWorship/worshiporder'
            component={WorshipOrder}
          />
          <Route path='/detailWorship/worshipinfo' component={Worshipinfo} />
          <Route path='/detailWorship/advertise' component={Advertise} />
        </Switch>
      </main>
    </WorshipContext.Provider>
  );
};

export default DetailWorship;
