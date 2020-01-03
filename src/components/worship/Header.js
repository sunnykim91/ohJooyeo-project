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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom';
import Worshipinfo from './Worshipinfo';
import Advertise from './Advertise';
import WorshipOrder from './WorshipOrder';
import { Route, Router } from 'react-router-dom';

import './DetailWorship.css';
import { Switch } from '@material-ui/core';

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

const Header = ({ match }) => {
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

  // const [worshipOrder, setWorshipOrder] = useState({});

  const [activeAddButton, setActiveAddButton] = useState(true);
  const [worshipOrderNumber, setWorshiptOrderNumber] = useState(true);
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [presenter, setPresenter] = useState('');
  const [orderId, setOrderId] = useState();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [activeModify, setActiveModify] = useState(false);

  const [activeDirectInput, setActiveDirectInput] = useState(false);
  const [initialized, setInitialized] = React.useState(false);

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const getWorshipInfo = async () => {
    const baseURL = 'http://aaaicu.synology.me:8088/OhJooYeoMVC';
    await Axios.post(`${baseURL}/worship/info/`, {
      churchId: 1,
      worshipId: `${match.params.id}`,
      version: 0
    })
      .then(response => {
        setWorshipDetailForReceive(response.data);
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

  const formClasses = formStyles();

  const addItemButtonClick = () => {
    setWorshiptOrderNumber(getWorshiptOrderNumber());
    setActiveAddButton(false);
  };

  const addWorshipItem = () => {
    setWorshipDetailForReceive(prevworshipDetailForReceive => {
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
    return !worshipDetailForReceive.worshipOrder.length
      ? 1
      : Math.max(
          ...worshipDetailForReceive.worshipOrder.map(
            worship => worship.orderId
          )
        ) + 1;
  };

  const openModifyItem = id => {
    setTitle(
      () =>
        worshipDetailForReceive.worshipOrder.filter(
          worship => worship.orderId === id
        )[0].title
    );
    setDetail(
      () =>
        worshipDetailForReceive.worshipOrder.filter(
          worship => worship.orderId === id
        )[0].detail
    );
    setPresenter(
      () =>
        worshipDetailForReceive.worshipOrder.filter(
          worship => worship.orderId === id
        )[0].presenter
    );
    setOrderId(
      () =>
        worshipDetailForReceive.worshipOrder.filter(
          worship => worship.orderId === id
        )[0].orderId
    );
    setActiveModify(true);
  };

  const modifyItem = () => {
    setWorshipDetailForReceive(prevWorshipDetailForReceive => {
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
    setWorshipDetailForReceive({
      ...worshipDetailForReceive,
      'worshipOrder': worshipDetailForReceive.worshipOrder.filter(
        worship => worship.orderId !== id
      )
    });
    // setDeleteLoading(true);
    // setTimeout(() => setDeleteLoading(false), 1500);
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

  const componentClick = text => {
    console.log(text);
  };

  useEffect(() => {
    if (!initialized) {
      getWorshipInfo();
      setInitialized(true);
    }
  }, [worshipDetailForReceive]);

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
          <button onClick={() => saveWorshipInfo()}>저장</button>
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
          {['worshipinfo', 'worshiporder', 'advertise'].map((text, index) => (
            <Link to={`/detailWorship/${match.params.id}/${text}`}>
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main>
        <Switch>
          <Route path='/detailWorship/' component={WorshipOrder} />
          <Route path='/detailWorship/' component={Worshipinfo} />
          <Route path='/detailWorship/' component={Advertise} />
        </Switch>
      </main>
    </div>
  );
};

export default Header;
