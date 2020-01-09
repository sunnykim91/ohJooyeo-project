import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import '../../reset.css';
import './Main.css';

const Main = () => {
  const [juboList, setJuboList] = useState([]);

  const getJuboList = async () => {
    const baseURL = 'http://aaaicu.synology.me:8088/OhJooYeoMVC';
    Axios.post(`${baseURL}/worship/list/`, {
      churchId: 1
    })
      .then(response => {
        setJuboList(response.data);
        // for (let i = 0; i < juboList.length; i++) {
        //   Axios.post(`${baseURL}/worship/info`, {
        //     'churchId': 1,
        //     'worshipId': `${response.data[i].worshipId}`,
        //     'version': 0
        //   }).then(response => {
        //     console.log(response);
        //   });
        // }
      })
      .then(() => {
        console.log(juboList);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const getPrevMonthJuboList = () => {
    console.log('hi');
  };

  const getNextMonthJuboList = () => {
    console.log('hello');
  };

  useEffect(() => {
    getJuboList();
  }, []);

  return (
    <Container>
      <div className='dataFilter'>
        <Fab color='primary' aria-label='add'>
          <ChevronLeftIcon onClick={() => getPrevMonthJuboList()} />
        </Fab>
        <div className='todayMonth'>11월</div>
        <Fab color='secondary' aria-label='edit'>
          <ChevronRightIcon onClick={() => getNextMonthJuboList()} />
        </Fab>
      </div>
      <div className='juboList'>
        {juboList.map(jubo => (
          <Link to={`/detailWorship/${jubo.worshipId}`}>
            <div className='JuboList_item' key={jubo.worshipId}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {jubo.date}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default Main;
