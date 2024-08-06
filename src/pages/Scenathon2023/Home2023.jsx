import React from 'react';
import '../../css/App.css';
import 'react-hint/css/index.css';
import Scenathon2023 from './ControllerScenathon2023';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const Home2023 = (props) => {

  console.log("Home2021 props", props);
  console.groupEnd();
  const references = {

    fable: React.createRef(),
    scenathon: React.createRef(),
  }
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
      overflow: "auto"
    },
    gridBorder: {
      padding: "20px",
      backgroundColor: "white",
    }
  }));

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        {/*<BannerTitle title="DASHBOARD 2021" />*/}

        <Grid className={classes.gridBorder} container spacing={3} style={{ radius: "10px" }}>

          <Grid className="graph-wrapper" item xs={12}>
            <Paper className={classes.mainPaper}>

              <div className="Scenathon2021">
                {/* <Scenathon2021 scenathon={references.scenathon} style={{ width: '50%' }} /> */}
                <Scenathon2023 style={{ width: '50%' }} year = {props.year} scenathon_id = {props.scenathon_id} iteration={props.iteration} type={props.type}/>
              </div>

            </Paper>
          </Grid>

        </Grid>

      </div>
    </React.Fragment>
  )
}

export default Home2023
