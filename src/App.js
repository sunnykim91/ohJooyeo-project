import React from 'react';
import { Route } from 'react-router-dom';
import Main from './components/main/Main';
import DetailWorship from './components/worship/DetailWorship';

const App = () => {
  return (
    <div>
      <Route path='/' component={Main} exact={true} />
      <Route path='/detailWorship/:id' component={DetailWorship} />
    </div>
  );
};

export default App;
