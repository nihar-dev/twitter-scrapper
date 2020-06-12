import React, { useState, useEffect ,useRef} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    flexGrow: 1,


  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },


  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function StickyFooter() {
  const classes = useStyles();
  const [datas, setData] = useState([]);
  const [seconds, setSeconds] = useState(30);
  const [datacnn, setCnnData] = useState(false);
  const foo = useRef();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/app/', {
        params: {
            tweet_name: "NetflixIndia"
        }
      })
      .then(function (response) {
        setData(response.data.data);
        
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });  
  }, [])
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/app/', {
        params: {
            tweet_name: "CNN"
        }
      })
      .then(function (response) {
        setCnnData(response.data.data);
        
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });  
  }, [])

  useEffect(() => {
    function tick() {
        setSeconds(prevSeconds => prevSeconds - 1)
    }
    foo.current = setInterval(() => tick(), 1000)
  }, []);

  useEffect(() => {
    if (seconds  === 0) {
      clearInterval(foo.current);
      window.location.reload();
    }
  }, [seconds])


 

  return (
    <div className={classes.root}>
         <Container fixed>
         <Typography variant="overline" display="block" gutterBottom align="right">update in  {seconds} seconds </Typography>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
         Twiter scrapper
        </Typography>
  
        <Typography variant="body1">
            This page will update after 5 min(300) seconds . and it get data by scrapping Twiter page.
            </Typography>
      </Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            @NetflixIndia
        </Typography>
          <List >
              {datas && datas.map(item => {
                  return (
                  <>
                 <ListItemText primary={item}  />
                  <hr/>
                  </>
                  )
              })}
             </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
               <Typography variant="h6" color="textPrimary" gutterBottom>
            @CNN
        </Typography>
          <List >
              {datacnn && datacnn.map(item => {
                  return <>
                  <ListItemText primary={item}  />
                   <hr/>
                   </>
              })}
             </List></Paper>
        </Grid>
        
      </Grid>
      
      </Container>
    </div>
  );
}