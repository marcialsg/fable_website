// https://unstats.un.org/SDGAPI/swagger/v1/
// https://sdg-api.herokuapp.com/goals

import React, { useState } from "react";

// MATERIAL STUFF
import { ProSidebar, SidebarContent } from "react-pro-sidebar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

//dashboards
import NetForestCoverChange from "./NetForestCoverChange";
import Biodiversity from "./Biodiversity";
import GlobalTargets from "./GlobalTargets";
import ProtectedAreaByType from "./ProtectedAreaByType";
import LandCover from "./LandCover";
import FoodEnergyIntakePerCapita from "./FoodEnergyIntakePerCapita";
import FoodEnergyIntakePerCapita2 from "./FoodEnergyIntakePerCapita2";
import FreshWaterUse from "./FreshWaterUse";
import NetForestCoverChange2 from "./NetForestCoverChange2";
import GreenHouse2 from "./GreenHouse2";
import GreenHouseOne from "./GreenHouseOne";
import FreshWaterTwo from "./FreshWaterTwo";
//assets
import TradeReport from "./TradeReport";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import clsx from "clsx";

// STYLES
import "../../css/index.css";

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
    width: "20em",
    flexShrink: 0,
  },
  drawerGeneralStyles: {
    position: "relative",
    display: "block",
    height: "100%",
  },
  toolbar: {
    padding: theme.spacing(0, 1),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const Scenathon = (props) => {
  console.log("Scenathon2021");
  console.log(props);
  const [selectedYear, setSelectedYear] = useState({
    year: props.year,
    scenathon_id: props.scenathon_id,
  });

  if (props.year !== selectedYear.year) {
    setSelectedYear({ year: props.year, scenathon_id: props.scenathon_id });
  }

  let sdg = require("../../data/sdg.json");
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  // GHG
  const [ghgOpen, setGhgOpen] = useState({ ghgOpen: false });
  const handleGhgClick = () => {
    setGhgOpen(!ghgOpen);
  };
  const [ghgSection, setGhgSection] = useState({ ghgOpen: true });
  const handleGhgSection = (e) => {
    setGhgSection(e);
  };
  const handleClickAway = () => {
    setGhgOpen(false);
  };
  // Global Target Summary
  const [globalOpen, setGlobalOpen] = useState({ globalOpen: false });
  const handleGlobalClick = () => {
    setGlobalOpen(!globalOpen);
  };
  const [globalSection, setGlobalSection] = useState({ globalSection: true });
  const handleGlobalSection = (e) => {
    setGlobalSection(e);
  };
  const handleClickAwayGlobal = () => {
    setGlobalOpen(false);
  };

  // const appTitle = <div className="spacer"><h1>Dashboard {props.year}</h1></div>;

  return (
    <>
      <div className="grid-container">
        <div className="Header">
          {(() => {
            switch (selectedIndex) {
              case 0:
                return (

                  <div
                    className="banner unselectable"
                    style={{ backgroundColor: "#888888" }}
                  >
                    <h1 class="text-white text-center banner-h">
                    Global Targets
                    </h1>
                    <div className="global_div"/>
                    
                  </div>
                );
              case 1:
                return (
                  <div
                    className="banner unselectable"
                    style={{ backgroundColor: sdg[14].colorInfo.hex }}
                  >
                    <h1 class="text-white text-center banner-h">
                      Net Forest Cover Change
                    </h1>
                    <img alt="" className="sdg-icon" src={sdg[14].icon_url} />
                  </div>
                );
              case 2:
                return (
                  <div
                    className="banner unselectable"
                    style={{ backgroundColor: sdg[14].colorInfo.hex }}
                  >
                    <h1 class="text-white text-center banner-h">
                      Net Forest Cover Change by Country
                    </h1>
                    <img alt="" className="sdg-icon" src={sdg[14].icon_url} />
                  </div>
                );
              case 3:
                return (
                  <div
                    className="banner unselectable"
                    style={{ backgroundColor: sdg[14].colorInfo.hex }}
                  >
                    <h1 class="text-white text-center banner-h">
                      Biodiversity by Country
                    </h1>
                    <img alt="" className="sdg-icon" src={sdg[14].icon_url} />
                  </div>
                );
              case 4:
                return (
                  <div
                    className="banner unselectable"
                    style={{ backgroundColor: sdg[14].colorInfo.hex }}
                  >
                    <h1 class="text-white text-center banner-h">
                      Protected Areas by Type
                    </h1>
                    <img alt="" className="sdg-icon" src={sdg[14].icon_url} />
                  </div>
                );
              case 5:
                return (
                  <div
                    className="banner unselectable"
                    style={{ backgroundColor: sdg[14].colorInfo.hex }}
                  >
                    <h1 class="text-white text-center banner-h">Land Cover</h1>
                    <img alt="" className="sdg-icon" src={sdg[14].icon_url} />
                  </div>
                );
              case 6:
                return (
                  <div
                    className="banner unselectable"
                    style={{ backgroundColor: sdg[5].colorInfo.hex }}
                  >
                    <h1 class="text-white text-center banner-h">
                      Fresh Water Use
                    </h1>
                    <img alt="" className="sdg-icon" src={sdg[5].icon_url} />
                  </div>
                );
              case 7:
                return (
                  <div
                    className="banner unselectable"
                    style={{ backgroundColor: sdg[5].colorInfo.hex }}
                  >
                    <h1 class="text-white text-center banner-h">
                      Fresh Water Use by Country
                    </h1>
                    <img alt="" className="sdg-icon" src={sdg[5].icon_url} />
                  </div>
                );
              case 8:
                return (
                  <div
                    className="banner unselectable"
                    style={{ backgroundColor: sdg[12].colorInfo.hex }}
                  >
                    <h1 class="text-white text-center banner-h">
                      Greenhouse Gas Emissions
                    </h1>
                    <img alt="" className="sdg-icon" src={sdg[12].icon_url} />
                  </div>
                );
              case 9:
                return (
                  <div
                    className="banner unselectable"
                    style={{ backgroundColor: sdg[12].colorInfo.hex }}
                  >
                    <h1 class="text-white text-center banner-h">
                      Greenhouse Gas Emissions by Country
                    </h1>
                    <img alt="" className="sdg-icon" src={sdg[12].icon_url} />
                  </div>
                );
              case 10:
                return (
                  <div
                    className="banner unselectable"
                    style={{ backgroundColor: "#DDA63A" }}
                  >
                    <h1 class="text-white text-center banner-h">Zero Hunger</h1>
                    <img alt="" className="sdg-icon" src={sdg[1].icon_url} />
                  </div>
                );
              case 11:
                return (
                  <div
                    className="banner unselectable"
                    style={{ backgroundColor: "#DDA63A" }}
                  >
                    <h1 class="text-white text-center banner-h">
                      Low dietary disease risk
                    </h1>
                    <img alt="" className="sdg-icon" src={sdg[1].icon_url} />
                  </div>
                );
              case 12:
                return (
                  <div
                    className="banner unselectable"
                    style={{ backgroundColor: "#888888" }}
                  >
                    <h1 class="text-white text-center banner-h">
                      Trade Report
                    </h1>
                    <div className="sdg-icon"></div>
                  </div>
                );

              default:
                return null;
            }
          })()}
        </div>
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
                    className="subitem"
                    classes={{ root: classes.subitem }}
                    button
                    selected={globalSection && selectedIndex === 0}
                    onClick={(event) => {
                      handleListItemClick(event, 0);
                      handleGlobalSection(true);
                    }}
                  >
                    <ListItemText primary="Global Targets: Land and Biodiversity, GHG emissions and Freshwater" />
                  </ListItem>
                  <ListItem
                    classes={{ root: classes.item }}
                    button
                    selected={selectedIndex === 1}
                    onClick={(event) => {
                      setGlobalOpen(false);
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
                      setGlobalOpen(false);
                      setGhgOpen(false);
                      handleListItemClick(event, 2);
                    }}
                  >
                    <ListItemText primary="Net Forest Cover Change by Country" />
                  </ListItem>
                  <ListItem
                    classes={{ root: classes.item }}
                    button
                    selected={selectedIndex === 3}
                    onClick={(event) => {
                      setGlobalOpen(false);
                      setGhgOpen(false);
                      handleListItemClick(event, 3);
                    }}
                  >
                    <ListItemText primary="Biodiversity by Country" />
                  </ListItem>
                  <ListItem
                    classes={{ root: classes.item }}
                    button
                    selected={selectedIndex === 4}
                    onClick={(event) => {
                      setGlobalOpen(false);
                      setGhgOpen(false);
                      handleListItemClick(event, 4);
                    }}
                  >
                    <ListItemText primary="Protected Areas by Type" />
                  </ListItem>
                  <ListItem
                    classes={{ root: classes.item }}
                    button
                    selected={selectedIndex === 5}
                    onClick={(event) => {
                      setGlobalOpen(false);
                      setGhgOpen(false);
                      handleListItemClick(event, 5);
                    }}
                  >
                    <ListItemText primary="Land Cover" />
                  </ListItem>

                  <ListItem
                    classes={{ root: classes.item }}
                    button
                    selected={selectedIndex === 6}
                    onClick={(event) => {
                      setGlobalOpen(false);
                      setGhgOpen(false);
                      handleListItemClick(event, 6);
                    }}
                  >
                    <ListItemText primary="Fresh Water" />
                  </ListItem>
                  <ListItem
                    classes={{ root: classes.item }}
                    button
                    selected={selectedIndex === 7}
                    onClick={(event) => {
                      setGlobalOpen(false);
                      setGhgOpen(false);
                      handleListItemClick(event, 7);
                    }}
                  >
                    <ListItemText primary="Fresh Water by Country" />
                  </ListItem>
                  <ListItem
                    classes={{ root: classes.item }}
                    button
                    selected={selectedIndex === 8}
                    onClick={(event) => {
                      setGlobalOpen(false);
                      setGhgOpen(false);
                      handleListItemClick(event, 8);
                    }}
                  >
                    <ListItemText primary="Global GHG Emissions Targets" />
                  </ListItem>
                  <ClickAwayListener onClickAway={null}>
                    <ListItem
                      classes={{ root: classes.item }}
                      button
                      selected={selectedIndex === 9}
                      onClick={handleGhgClick}
                    >
                      <ListItemText primary="Countries Contribution to GHG Emissions Targets" />
                      {ghgOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                  </ClickAwayListener>
                  <Collapse in={ghgOpen} timeout="auto">
                    <List>
                      <ListItem
                        className="subitem"
                        classes={{ root: classes.subitem }}
                        button
                        selected={ghgSection && selectedIndex === 9}
                        onClick={(event) => {
                          setGlobalOpen(false);
                          handleGhgSection(true);
                          handleListItemClick(event, 9);
                        }}
                      >
                        <ListItemText primary="emissions from crops and livestock" />
                      </ListItem>
                      <ListItem
                        className="subitem"
                        classes={{ root: classes.subitem }}
                        button
                        selected={!ghgSection && selectedIndex === 9}
                        onClick={(event) => {
                          setGlobalOpen(false);
                          handleGhgSection(false);
                          handleListItemClick(event, 9);
                        }}
                      >
                        <ListItemText primary="emissions from land use change and peat oxidation" />
                      </ListItem>
                    </List>
                  </Collapse>
                  <ListItem
                    classes={{ root: classes.item }}
                    button
                    selected={selectedIndex === 10}
                    onClick={(event) => {
                      setGlobalOpen(false);
                      setGhgOpen(false);
                      handleListItemClick(event, 10);
                    }}
                  >
                    <ListItemText primary="Zero Hunger" />
                  </ListItem>
                  <ListItem
                    classes={{ root: classes.item }}
                    button
                    selected={selectedIndex === 11}
                    onClick={(event) => {
                      setGlobalOpen(false);
                      setGhgOpen(false);
                      handleListItemClick(event, 11);
                    }}
                  >
                    <ListItemText primary="Low dietary disease risk" />
                  </ListItem>
                  <ListItem
                    classes={{ root: classes.item }}
                    button
                    selected={selectedIndex === 12}
                    onClick={(event) => {
                      setGlobalOpen(false);
                      setGhgOpen(false);
                      handleListItemClick(event, 12);
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
              <GlobalTargets section={globalSection} year={selectedYear} />
            </div>
            <div className="" style={{ backgroundColor: "white" }}>
              <NetForestCoverChange year={selectedYear} />
            </div>
            <div className="" style={{ backgroundColor: "white" }}>
              <NetForestCoverChange2 year={selectedYear} />
            </div>
            <div className="" style={{ backgroundColor: "white" }}>
              <Biodiversity year={selectedYear} />
            </div>
            <div className="" style={{ backgroundColor: "white" }}>
              <ProtectedAreaByType year={selectedYear} />
            </div>
            <div className="" style={{ backgroundColor: "white" }}>
              <LandCover year={selectedYear} />
            </div>
            <div className="" style={{ backgroundColor: "white" }}>
              <FreshWaterUse year={selectedYear} />
            </div>
            <div className="" style={{ backgroundColor: "white" }}>
              <FreshWaterTwo year={selectedYear} />
            </div>
            <div className="" style={{ backgroundColor: "white" }}>
              <GreenHouseOne year={selectedYear} />
            </div>
            <div className="" style={{ backgroundColor: "white" }}>
              <GreenHouse2 section={ghgSection} year={selectedYear} />
            </div>
            <div className="" style={{ backgroundColor: "white" }}>
              <FoodEnergyIntakePerCapita year={selectedYear} />
            </div>
            <div className="" style={{ backgroundColor: "white" }}>
              <FoodEnergyIntakePerCapita2 year={selectedYear} />
            </div>
            <div className="" style={{ backgroundColor: "white" }}>
              <TradeReport year={selectedYear} />
            </div>
          </AwesomeSlider>
        </div>
      </div>
    </>
  );
};

export default withRouter(Scenathon);
