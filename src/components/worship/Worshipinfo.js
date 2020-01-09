import React, { useContext } from 'react';
import { WorshipContext } from './DetailWorship';

const Worshipinfo = () => {
  const { state, actions } = useContext(WorshipContext);

  return (
    <div>
      <div>
        <b>사회자 : {state.worshipDetailForReceive.mainPresenter}</b>
      </div>
      <div>
        다음 봉헌자 : {state.worshipDetailForReceive.nextPresenter.offer}
      </div>
      <div>
        다음 기도자 : {state.worshipDetailForReceive.nextPresenter.prayer}
      </div>
      <div>
        다음 사회자 :{state.worshipDetailForReceive.nextPresenter.mainPresenter}
      </div>
    </div>
  );
};

export default Worshipinfo;
