import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Modal from '@material-ui/core/Modal';
import './DetailWorship.css';
import { WorshipContext } from './DetailWorship';

const formStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
    marginLeft: 20
  },
  selectEmpty: {
    minHeight: 50
  }
}));

const WorshipOrder = ({ match }) => {
  const { state, actions } = useContext(WorshipContext);

  const [activeAddButton, setActiveAddButton] = useState(true);
  const [worshipOrderNumber, setWorshiptOrderNumber] = useState(true);
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [presenter, setPresenter] = useState('');
  const [orderId, setOrderId] = useState();
  const [coModal, setModal] = useState(false);

  const [activeModify, setActiveModify] = useState(false);

  const [activeDirectInput, setActiveDirectInput] = useState(false);

  const formClasses = formStyles();

  const addItemButtonClick = () => {
    setWorshiptOrderNumber(getWorshiptOrderNumber());
    setActiveAddButton(false);
  };

  const addWorshipItem = () => {
    actions.setWorshipDetailForReceive(prevworshipDetailForReceive => {
      prevworshipDetailForReceive.worshipOrder.push({
        type: 0,
        title,
        detail,
        presenter,
        standupYn: 0,
        order: getWorshiptOrderNumber(),
        orderId: getWorshiptOrderNumber()
      });
      console.log(prevworshipDetailForReceive);
      return prevworshipDetailForReceive;
    });
    setTitle('');
    setDetail('');
    setPresenter('');
    setActiveDirectInput(false);
    setActiveAddButton(true);
  };

  const cancelAddItem = () => {
    setActiveAddButton(true);
  };

  const getWorshiptOrderNumber = () => {
    return !state.worshipDetailForReceive.worshipOrder.length
      ? 1
      : Math.max(
          ...state.worshipDetailForReceive.worshipOrder.map(
            worship => worship.orderId
          )
        ) + 1;
  };

  const openModifyItem = id => {
    setTitle(
      () =>
        state.worshipDetailForReceive.worshipOrder.filter(
          worship => worship.orderId === id
        )[0].title
    );
    setDetail(
      () =>
        state.worshipDetailForReceive.worshipOrder.filter(
          worship => worship.orderId === id
        )[0].detail
    );
    setPresenter(
      () =>
        state.worshipDetailForReceive.worshipOrder.filter(
          worship => worship.orderId === id
        )[0].presenter
    );
    setOrderId(
      () =>
        state.worshipDetailForReceive.worshipOrder.filter(
          worship => worship.orderId === id
        )[0].orderId
    );
    setActiveModify(true);
    modalOpen();
  };

  const modifyItem = () => {
    actions.setWorshipDetailForReceive(prevWorshipDetailForReceive => {
      prevWorshipDetailForReceive.worshipOrder.map(worship =>
        worship.orderId === orderId
          ? ((worship.title = title),
            (worship.detail = detail),
            (worship.presenter = presenter))
          : worship
      );
      return prevWorshipDetailForReceive;
    });

    setTitle('');
    setDetail('');
    setPresenter('');
    setOrderId();
    setActiveDirectInput(false);
    setActiveModify(false);
  };

  const deleteItem = id => {
    actions.setWorshipDetailForReceive({
      ...state.worshipDetailForReceive,
      'worshipOrder': state.worshipDetailForReceive.worshipOrder.filter(
        worship => worship.orderId !== id
      )
    });
  };

  const titleChange = e => {
    e.preventDefault();
    if (e.target.value === '직접입력') {
      setActiveDirectInput(true);
    } else {
      setActiveDirectInput(false);
      setTitle(e.target.value);
    }
  };

  const changeItemTitle = e => {
    setTitle(e.target.value);
  };

  const detailChange = e => {
    setDetail(e.target.value);
  };

  const presenterChange = e => {
    setPresenter(e.target.value);
  };

  const modalOpen = () => {
    setModal(true);
  };

  const modalClose = () => {
    setModal(false);
  };

  return (
    <div className='worshipArea'>
      <ul>
        {state.worshipDetailForReceive.worshipOrder.map(wsInfo => (
          <li className='worshipItem' key={wsInfo.orderId}>
            <div className='worshipItem-content'>
              {/* <div>{wsInfo.orderId}</div> */}
              <div>제목 : {wsInfo.title}</div>
              {wsInfo === '' ? <div></div> : <div>{wsInfo.detail}</div>}
              <div>발표자 : {wsInfo.presenter}</div>
            </div>
            <div className='worshipItem-button'>
              <IconButton
                aria-label='edit'
                onClick={() => openModifyItem(wsInfo.orderId)}
              >
                <EditIcon fontSize='small' />
              </IconButton>
              <IconButton
                aria-label='delete'
                onClick={() => deleteItem(wsInfo.orderId)}
              >
                <DeleteIcon fontSize='small' />
              </IconButton>
            </div>
          </li>
        ))}
        {activeModify ? (
          <Modal
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
            open={coModal}
            onClose={modalClose}
          >
            <div className='addItem-area'>
              <div className='addItem-content'>
                <div> 순서 : {orderId}</div>
                <div>
                  제목:
                  <FormControl className={formClasses.formControl}>
                    <Select
                      onChange={titleChange}
                      displayEmpty
                      className={formClasses.selectEmpty}
                    >
                      <MenuItem disabled>{title}</MenuItem>
                      <MenuItem value={'기도'}>기도</MenuItem>
                      <MenuItem value={'성경봉독'}>성경봉독</MenuItem>
                      <MenuItem value={'찬송'}>찬송</MenuItem>
                      <MenuItem value={'봉헌기도'}>봉헌기도</MenuItem>
                      <MenuItem value={'교회소식'}>교회소식</MenuItem>
                      <MenuItem value={'파송찬양'}></MenuItem>
                      <MenuItem value={'직접입력'}>직접입력</MenuItem>
                    </Select>
                    {activeDirectInput ? (
                      <form
                        noValidate
                        autoComplete='off'
                        className='detailContentInput'
                      >
                        <TextField
                          multiline
                          rowsMax='4'
                          onChange={changeItemTitle}
                        />
                      </form>
                    ) : null}
                  </FormControl>
                </div>
                <div>
                  세부내용:
                  <form
                    noValidate
                    autoComplete='off'
                    className='detailContentInput'
                  >
                    <TextField
                      value={detail}
                      multiline
                      rowsMax='4'
                      onChange={detailChange}
                    />
                  </form>
                </div>
                <div>
                  발표자 :
                  <form
                    noValidate
                    autoComplete='off'
                    className='presenterInput'
                  >
                    <TextField
                      value={presenter}
                      multiline
                      rowsMax='4'
                      onChange={presenterChange}
                    />
                  </form>
                </div>
              </div>
              <div className='modifyItem-button'>
                <button onClick={() => modifyItem()}>수정완료</button>
              </div>
            </div>
          </Modal>
        ) : null}
        {activeAddButton ? (
          <li className='addItemButton'>
            <Fab aria-label='add' onClick={() => addItemButtonClick()}>
              <AddIcon />
            </Fab>
          </li>
        ) : (
          <div className='addItem-area'>
            <div className='addItem-content'>
              <div> 순서 : {worshipOrderNumber}</div>
              <div>
                제목:
                <FormControl className={formClasses.formControl}>
                  <Select
                    onChange={titleChange}
                    displayEmpty
                    className={formClasses.selectEmpty}
                  >
                    <MenuItem value=''>
                      <em></em>
                    </MenuItem>
                    <MenuItem value={'기도'}>기도</MenuItem>
                    <MenuItem value={'성경봉독'}>성경봉독</MenuItem>
                    <MenuItem value={'찬송'}>찬송</MenuItem>
                    <MenuItem value={'봉헌기도'}>봉헌기도</MenuItem>
                    <MenuItem value={'교회소식'}>교회소식</MenuItem>
                    <MenuItem value={'파송찬양'}></MenuItem>
                    <MenuItem value={'직접입력'}>직접입력</MenuItem>
                  </Select>
                  {activeDirectInput ? (
                    <form
                      noValidate
                      autoComplete='off'
                      className='detailContentInput'
                    >
                      <TextField
                        multiline
                        rowsMax='4'
                        onChange={changeItemTitle}
                      />
                    </form>
                  ) : null}
                </FormControl>
              </div>
              <div>
                세부내용:
                <form
                  noValidate
                  autoComplete='off'
                  className='detailContentInput'
                >
                  <TextField multiline rowsMax='4' onChange={detailChange} />
                </form>
              </div>
              <div>
                발표자 :
                <form noValidate autoComplete='off' className='presenterInput'>
                  <TextField multiline rowsMax='4' onChange={presenterChange} />
                </form>
              </div>
            </div>
            <div className='addItem-button'>
              <IconButton aria-label='addItem' onClick={() => addWorshipItem()}>
                <AddCircleIcon />
              </IconButton>
              <IconButton aria-label='addItem' onClick={() => cancelAddItem()}>
                <CancelIcon />
              </IconButton>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
};

export default WorshipOrder;
