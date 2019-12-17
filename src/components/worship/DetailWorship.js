import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

import './DetailWorship.css';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    background: `#2AE0A9`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    height: `100vh`,
    flexGrow: 1,
    padding: theme.spacing(12, 4),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

const formStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
    marginLeft: 20
  },
  selectEmpty: {
    minHeight: 50
  }
}));

const DetailWorship = ({ match }) => {
  const [worshipInfo, setWorshipInfo] = useState({
    mainPresenter: '김선휘',
    worshipOrder: [
      {
        type: 0,
        title: '경배와 찬양',
        detail: '',
        presenter: '손흥민',
        standupYn: 0,
        order: 1,
        orderId: 1
      },
      {
        type: 0,
        title: '기도',
        detail: '',
        presenter: '데브라이너',
        standupYn: 0,
        order: 2,
        orderId: 2
      },
      {
        type: 0,
        title: '성경봉독',
        detail: '창세기 1:1~1:10',
        presenter: '박지성',
        standupYn: 0,
        order: 3,
        orderId: 3
      }
    ]
  });
  const [activeAddButton, setActiveAddButton] = useState(true);
  const [worshipOrderNumber, setWorshiptOrderNumber] = useState(true);
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [presenter, setPresenter] = useState('');
  const [order, setOrder] = useState();

  const [directTitleInput, setDirectTitleInput] = useState(true);

  const getWorshipInfo = async () => {
    const baseURL = 'http://aaaicu.synology.me:8088/OhJooYeoMVC';
    await Axios.post(`${baseURL}/worship/info/`, {
      'churchId': 1,
      'worshipId': `${match.params.id}`,
      'version': 0
    })
      .then(response => {
        console.log(response.data);
        setWorshipInfo(response.data.worshipOrder);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const formClasses = formStyles();

  const addItemButtonClick = () => {
    setWorshiptOrderNumber(getWorshiptOrderNumber());
    setActiveAddButton(false);
  };

  const addWorshipItem = () => {
    setWorshipInfo(prevWorshipInfo => [
      ...prevWorshipInfo.worshipOrder,
      {
        type: 0,
        title: 'ddd',
        detail: 'dddee',
        presenter: 'eqwer',
        standupYn: 0,
        order: 4,
        orderId: 4
      }
    ]);
  };

  const cancelAddItem = () => {
    setActiveAddButton(true);
  };

  const getWorshiptOrderNumber = () => {
    return !worshipInfo.worshipOrder.length
      ? 1
      : Math.max(...worshipInfo.worshipOrder.map(worship => worship.orderId)) +
          1;
  };

  const modifyItem = id => {
    console.log(id);
  };

  const deleteItem = id => {
    console.log(id);
  };

  const titleChange = e => {
    setTitle(e.target.value);
  };

  const detailChange = e => {
    setDetail(e.target.value);
  };

  const presenterChange = e => {
    setPresenter(e.target.value);
  };

  useEffect(() => {
    // getWorshipInfo();
    console.log(worshipInfo);
  }, [worshipInfo]);

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            {match.params.id} 주보&광고 편집
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className='worshipArea'>
          <ul>
            {worshipInfo.worshipOrder.map(wsInfo => (
              <li className='worshipItem' key={wsInfo.orderId}>
                <div className='worshipItem-content'>
                  <div>{wsInfo.orderId}</div>
                  <div>제목 : {wsInfo.title}</div>
                  <div>발표자 : {wsInfo.presenter}</div>
                </div>
                <div className='worshipItem-button'>
                  <IconButton
                    aria-label='edit'
                    onClick={() => modifyItem(wsInfo.orderId)}
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
            {activeAddButton ? (
              <li>
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
                        value={title}
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
                        <MenuItem value={directTitleInput}>직접입력</MenuItem>
                      </Select>
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
                        multiline
                        rowsMax='4'
                        onChange={presenterChange}
                      />
                    </form>
                  </div>
                </div>
                <div className='addItem-button'>
                  <IconButton
                    aria-label='addItem'
                    onClick={() => addWorshipItem()}
                  >
                    <AddCircleIcon />
                  </IconButton>
                  <IconButton
                    aria-label='addItem'
                    onClick={() => cancelAddItem()}
                  >
                    <CancelIcon />
                  </IconButton>
                </div>
              </div>
            )}
          </ul>
        </div>
        <div className='adArea'>여기는 광고 영역</div>
      </main>
    </div>
  );
};

export default DetailWorship;
