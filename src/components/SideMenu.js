import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';


import '../css/SideMenu.css';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
    left: 'auto'
  },
  docked:true,
  // appBar: {
  //   zIndex: theme.zIndex.drawer + 1,
  //   transition: theme.transitions.create(['width', 'margin'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  // },
  // appBarShift: {
  //   marginLeft: drawerWidth,
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   transition: theme.transitions.create(['width', 'margin'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  menuButton: {
    marginRight: '40px',
  },
  // hide: {
  //   display: 'none',
  // },
  drawer: {
    width: '200px',
    flexShrink: 0

  },
  drawerGeneralStyles: {
    position: 'relative',
    display: 'block',
    height: '100%',
  },
  // drawerOpen: {
  //   width: '250px',
  //   transition: theme.transitions.create('width', {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  // drawerClose: {
  //   transition: theme.transitions.create('width', {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  //   overflowX: 'hidden',
  //   width: '10%',
  //   [theme.breakpoints.up('sm')]: {
  //     width: theme.spacing(9) + 1,
  //   },
  // },
  toolbar: {

    padding: theme.spacing(0, 1),

  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

}));

export default function MiniDrawer(props) {

  const classes = useStyles();
  // const onChangeF = props.onChange;


  return (
    <div className={classes.root}>
     
    </div>
  );
}