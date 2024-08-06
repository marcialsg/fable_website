// https://unstats.un.org/SDGAPI/swagger/v1/
// https://sdg-api.herokuapp.com/goals

import React, { useState } from "react";

// MATERIAL STUFF
import { ProSidebar, SidebarContent } from "react-pro-sidebar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, withStyles } from "@material-ui/core/styles";

//dashboards
import NetForestCoverChange from "./NetForestCoverChange";
import Biodiversity from "./Biodiversity";
import GlobalTargets from "./GlobalTargets";
import FoodEnergyIntakePerCapita from "./FoodEnergyIntakePerCapita";
import GreenHouseOne from "./GreenHouseOne";
import DataExplorer from "../data-explorer/DataExplorer";

//assets
import TradeReport from "./TradeReport";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import clsx from "clsx";

// STYLES
import "../../css/index.css";

import ComboBoxYear from "../../components/ComboBoxYear";
import BannerTitle from "../../components/BannerTitle";

import { withRouter } from "react-router-dom";

const GlobalCss = withStyles({
  "@global": {
    ".MuiListItem-root.Mui-selected": {
      backgroundColor: "#306973",
      color: "white",
    },
    ".MuiListItem-root.Mui-selected:hover": {
      backgroundColor: "#508993",
      color: "white",
    },
    ".subitem.Mui-selected": {
      backgroundColor: "#104953",
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
    left: "auto",
    fontSize: "12px",
  },
  item: {
    paddingTop: 3,
    paddingBottom: 2,
  },
  subitem: {
    padding: "0 10px 0 10px",
  },

  docked: true,
  menuButton: {
    marginRight: "3em",
  },
  drawer: {
    width: "360px",
  },
  drawerGeneralStyles: {
    position: "relative",
    display: "block",
    height: "100%",
    width: "360px",
  },
  toolbar: {
    padding: theme.spacing(0, 1),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const getBannerTitle = (selectedIndex)=> {
  switch (selectedIndex) {
    case 0:
      return BannerTitle("2019", "Global Targets");
    case 1:
      return BannerTitle("2019", "Net Forest Cover Change", 14); // 14 is the SDG number
    case 2:
      return BannerTitle("2019", "Biodiversity", 14);
    case 3:
      return BannerTitle("2019", "Total Greenhouse Gas Emissions Targets", 12)
    case 4:
      return BannerTitle("2019", "Zero Hunger", 1, "#DDA63A")
    case 5:
      return BannerTitle("2019", "Trade Report")

    default:
      return null;
  }
};

const Scenathon = (props) => {
  const [selectedYear, setSelectedYear] = useState({
    year: props.year,
    scenathon_id: props.scenathon_id,
  });

  let sdg = require("../../data/sdg.json");
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const yearSelection = (
    <div className="tooltipFooter">
      <ComboBoxYear defaultValue="2019" />
    </div>
  );

  const banner = getBannerTitle(selectedIndex);

  return (
    <>
      <div className="grid-container">
        <div className="Header">{banner}</div>
        <div className="Menu">
          <GlobalCss />

          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {})}
            classes={{
              paper: clsx({
                [classes.drawerGeneralStyles]: true,
              }),
            }}
          >
            <ProSidebar
              image={false}
              rtl={false}
              collapsed={false}
              toggled={false}
              breakPoint="md"
            >
              <SidebarContent>
                <List component="nav" aria-label="">
                  <ListItem
                    classes={{ root: classes.item }}
                    button
                    selected={selectedIndex === 0}
                    onClick={(event) => {
                      handleListItemClick(event, 0);
                    }}
                  >
                    <ListItemText primary="Global Targets" />
                  </ListItem>
                  <ListItem
                    classes={{ root: classes.item }}
                    button
                    selected={selectedIndex === 1}
                    onClick={(event) => {
                      handleListItemClick(event, 1);
                    }}
                  >
                    <ListItemText primary="Net Forest Cover Change" />
                  </ListItem>

                  <ListItem
                    classes={{ root: classes.item }}
                    button
                    selected={selectedIndex === 2}
                    onClick={(event) => {
                      handleListItemClick(event, 2);
                    }}
                  >
                    <ListItemText primary="Biodiversity" />
                  </ListItem>

                  <ListItem
                    classes={{ root: classes.item }}
                    button
                    selected={selectedIndex === 3}
                    onClick={(event) => {
                      handleListItemClick(event, 3);
                    }}
                  >
                    <ListItemText primary="Global GHG Emissions Targets" />
                  </ListItem>

                  <ListItem
                    classes={{ root: classes.item }}
                    button
                    selected={selectedIndex === 4}
                    onClick={(event) => {
                      handleListItemClick(event, 4);
                    }}
                  >
                    <ListItemText primary="Zero Hunger" />
                  </ListItem>

                  <ListItem
                    classes={{ root: classes.item }}
                    button
                    selected={selectedIndex === 5}
                    onClick={(event) => {
                      handleListItemClick(event, 5);
                    }}
                  >
                    <ListItemText primary="Trade Report" />
                  </ListItem>
                </List>
              </SidebarContent>
            </ProSidebar>
          </Drawer>
        </div>
        <div class="Content">
          <AwesomeSlider
            styles={{
              height: "95vh",
              ":root": { "--control-button-width": "150px" },
            }}
            bullets={false}
            transitionDelay={0}
            selected={selectedIndex}
            onTransitionEnd={(event) => {
              setSelectedIndex(event.currentIndex);
            }}
          >
            <div className="" style={{ backgroundColor: "white" }}>
              <GlobalTargets />
            </div>
            <div className="" style={{ backgroundColor: "white" }}>
              <NetForestCoverChange />
            </div>
            <div className="" style={{ backgroundColor: "white" }}>
              <Biodiversity />
            </div>
            <div className="" style={{ backgroundColor: "white" }}>
              <GreenHouseOne />
            </div>
            <div className="" style={{ backgroundColor: "white" }}>
              <FoodEnergyIntakePerCapita />
            </div>
            <div className="" style={{ backgroundColor: "white" }}>
              <TradeReport />
            </div>
          </AwesomeSlider>
        </div>
      </div>
    </>
  );
};

export default withRouter(Scenathon);
