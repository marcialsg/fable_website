import React from 'react';
import '../../css/App.css';
import 'react-hint/css/index.css';
import Scenathon2019 from './ControllerScenathon2019';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { HashRouter, Route, Switch, } from 'react-router-dom';

// TODO: TEST 2019 SCENATHON
const Home2019 = () => {
  console.groupEnd();
  const references = {

    fable: React.createRef(),
    scenathon: React.createRef(),
  }
  /* Const title is to change text-title when change the scenathon year */
  const title = 'Scenathon 2019'

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 0,
      display: 'flex',
    },
    paper: {
      padding: '0px',
      display: 'flex',
      borderRadius: "15px",
      height: '100%'
    },
    mainPaper: {
      width: '100%',
      padding: '0px',
      textAlign: 'center',
      display: 'flex',
      borderRadius: "15px",
      overflow: "auto",
    },
    gridBorder: {
      padding: "20px",
    }
  }));

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        {/*<BannerTitle title="DASHBOARD 2022" />*/}

        <Grid className={classes.gridBorder} container spacing={3} style={{ radius: "10px" }}>

          <Grid className="graph-wrapper" item xs={12}>
            <Paper className={classes.mainPaper}>

              <div className="Scenathon2019">
                <Scenathon2019 scenathon={references.scenathon} style={{ width: '50%' }} />
              </div>

            </Paper>
          </Grid>

        </Grid>

      </div>
    </React.Fragment>
  )
}

export default Home2019
