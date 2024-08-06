// https://unstats.un.org/SDGAPI/swagger/v1/
// https://sdg-api.herokuapp.com/goals

import React, { useState, Suspense } from "react";

// MATERIAL STUFF
import { ProSidebar, SidebarHeader, SidebarContent } from "react-pro-sidebar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";

import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import clsx from "clsx";
import BannerTitle from "../../components/BannerTitle";

//dashboards

import TargetPage from "./TargetPage";
import SummaryPage from "./SummaryPage";

// STYLES
import "../../css/index.css";

import { withRouter } from "react-router-dom";

const GlobalCss = withStyles({
  "@global": {
    ".MuiListItem-root.Mui-selected": {
      backgroundColor: "#F4CC13",
      color: "white",
    },
    ".MuiListItem-root.Mui-selected:hover": {
      backgroundColor: "#F9E177",
      color: "white",
    },
    ".subitem.Mui-selected": {
      backgroundColor: "#F4CC13",
    },
    ".subitem": {
      textAlign: "right",
      fontStyle: "italic",
      fontSize: 10,
    },
  },
})(() => null);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
  },
  item: {
    margin: 0,
    padding: "4px 28px 4px 28px",
  },
  subitem: {
    padding: "2px 28px 2px 28px",
  },

  docked: true,
  menuButton: {
    marginRight: "0em",
  },
  drawer: {
    width: "360px",
  },
  drawerGeneralStyles: {
    backgroundColor: "#F6F4F4",
    position: "relative",
    // display: "block",
    height: "100%",
    width: "360px",
  },
  toolbar: {
    padding: theme.spacing(0, 1),
  },
  content: {
    // flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const Scenathon = (props) => {
  let sdg = require("../../data/sdg.json");
  const classes = useStyles();

  var target_data = require("../../assets/2023_target_data.json");
  var target_domain_init_collapsed_object = {};

  for (let i = 0; i < target_data.target_data.length; i++) {
    target_domain_init_collapsed_object[i] = false;
  }

  let [collapsed, setCollapsed] = useState(target_domain_init_collapsed_object);

  let updateCollapsed = (index) => {
    //console.log("enters updateCollapsed");

    if (selectionIndexes.targetIndex === index && collapsed[index] == true) {
      collapsed[index] = false;
    } else {
      collapsed[index] = true;
    }

    setCollapsed(collapsed);
  };

  const getItemTypography = (text) => {
    return <h2 className="subtitleMenuFable">{text}</h2>;
  };

  const getSubitemTypography = (text) => {
    return <h2 className="body1Fable">{text}</h2>;
  };

  let getIndicatorMenuElements = (target_data) => {
    var result = [];

    for (let i = 0; i < target_data.target_data.length; i++) {
      var targetMenuElement = null;

      const targetDomain = target_data.target_data[i].targetDomain;

      if (
        targetDomain.includes("Summary") ||
        targetDomain.includes("Trade Report")
      ) {
        targetMenuElement = (
          <div>
            <ListItem
              classes={{ root: classes.item }}
              button
              selected={selectionIndexes.targetIndex === i}
              onClick={(event) => {
                console.log(
                  "ListItem clicked : " + selectionIndexes.targetIndex
                );
                setSelectionIndexes({
                  targetIndex: i,
                  indicatorIndex: 0,
                });
              }}
            >
              <ListItemText
                disableTypography
                primary={getItemTypography(targetDomain)}
              />
            </ListItem>
            <Divider />
          </div>
        );
      } else {
        const indicators = target_data.target_data[i].indicators;

        let indicatorsList = indicators.map((item, index) => {
          return (
            <ListItem
              className="subitem"
              classes={{ root: classes.subitem }}
              button
              selected={
                selectionIndexes.targetIndex === i &&
                selectionIndexes.indicatorIndex === index
              }
              onClick={(event) => {
                console.log(
                  "ListItem clicked : " + selectionIndexes.targetIndex
                );

                setSelectionIndexes({
                  targetIndex: i,
                  indicatorIndex: index,
                });
              }}
            >
              <ListItemText
                disableTypography
                primary={
                  <Typography variant="h6" style={{ color: "black" }}>
                    {getSubitemTypography(item)}
                  </Typography>
                }
              />
            </ListItem>
          );
        });


        targetMenuElement = (
          <div>
            <ListItem
              classes={{ root: classes.item }}
              button
              selected={selectionIndexes.targetIndex === i}
              onClick={(event) => {
                setSelectionIndexes({
                  targetIndex: i,
                  indicatorIndex: 0,
                });
                updateCollapsed(i);
              }}
            >
              <ListItemText
                disableTypography
                primary={getItemTypography(targetDomain)}
              />

              {selectionIndexes.targetIndex === i && collapsed[i] ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItem>

            <Collapse in={collapsed[i]} timeout="auto">
              <List>{indicatorsList}</List>
            </Collapse>
            <Divider />
          </div>
        );
      }

      result.push(targetMenuElement);
    }

    return result;
  };

  const [selectedYear, setSelectedYear] = useState({
    year: props.year,
    scenathon_id: props.scenathon_id,
    iteration: props.iteration,
    type: props.type,
  });

  if (props.year !== selectedYear.year) {
    setSelectedYear({ year: props.year, scenathon_id: props.scenathon_id, iteration: props.iteration, type: props.type });
  }

  var [selectionIndexes, setSelectionIndexes] = useState({
    targetIndex: 0,
    indicatorIndex: 0,
  });

  let targetIndicatorsList = getIndicatorMenuElements(target_data);

  targetIndicatorsList.push(            
    
    <ListItem> <div style={{height: "320px"}}></div></ListItem> 
    
  );

  return (
    <>
      <div>
        <div>
          {BannerTitle(
            "2023",
            target_data.target_data[selectionIndexes.targetIndex].targetDomain,
            target_data.target_data[selectionIndexes.targetIndex].sdg
          )}
        </div>

        <div className="dashboard-container">
          <div>
            <GlobalCss />
            <Drawer
              variant="permanent"
              classes={{
                paper: clsx({
                  [classes.drawerGeneralStyles]: true,
                }),
              }}
            >
              <SidebarContent>
                <List component="nav" aria-label="">
                  {targetIndicatorsList}
                </List>
              </SidebarContent>
            </Drawer>
          </div>

          
            <TargetPage
              targetIndex={selectionIndexes.targetIndex}
              indicatorIndex={selectionIndexes.indicatorIndex}
              year={selectedYear}
              type={selectedYear.type}
              iteration={selectedYear.iteration}
            />
          
        </div>
      </div>
    </>
  );
};

export default withRouter(Scenathon);
