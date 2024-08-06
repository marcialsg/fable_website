import React, { useState, useEffect } from "react";
import "../css/App.css";
import * as ReactBootStrap from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import About from "../pages/Scenathon2019/About";
import Home2023 from "../pages/Scenathon2023/Home2023";
import Home2021 from "../pages/Scenathon2021/Home2021";
import Home2019 from "../pages/Scenathon2019/Home2019";

import HomeAbout from "../pages/Scenathon2019/HomeAbout";
import Download from "../pages/Scenathon2019/Downloads";
import Legal from "../pages/Scenathon2019/Legal";

const Styles = styled.div`
  .navbar, #navbar{
    
    transition: 1s;
    align-items:center;
    background:transparent: important ;
    justify-content:space-between;
    width:100%;
    z-index:1300;
    }

  .banner-container{
   
    margin-right: 300px;
  #IIASA_LOGO{
    width:140px;
  }
  #SDSN_LOGO{
  margin-right:20px;
  width: 100px;
  }
  #FoodAndLand_LOGO{
    width: 130px;
  }

  }

    
  .navbar-brand, .navbar-nav .nav-link {
    color: white;
    text-shadow: .5px .5px 2px #000000;
    .navbar-link{
      margin-left:70px;
    }

    
  }
  .navbar-link-scenathon{
    font-size:18px;
    .navbar-link{
      margin-left:70px;
    }
  }
  #scrollbtn{
    position:fixed;
    bottom: 2rem;
    right: 0.5rem;
    z-index: 5000;
    background: #555;
    color: #f3f5f8;
    height: 2em;
    width: 2em;
    font-weight: bold;
    font-size: 1.2em;
    opacity: 0.5;
  }
  #scrollbtn:hover{
    opacity: 0.9;
  }
`;

const openExternalUrL = () => {
  window.open("https://app.scenathon.org/login", "_self");
};

const NavBar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const maintenanceMode = false;

  const maintenanceWebpage = () => {
    return (
      <div
        style={{
          width: "auto",
          height: "900px",
          textAlign: "center",
          padding: "32px",
          background: "rgb(3,32,61)",
        }}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <p style={{ color: "white", margin: "32px", fontSize: "large" }}>
            Our website is currently undergoing maintenance to provide you with
            an even better browsing experience. We understand the value of your
            time and strive to minimize any disruptions. We are working
            diligently to resolve the issue as quickly as possible.
          </p>

          <p style={{ color: "#DDA63A", margin: "32px", fontSize: "large" }}>
            If you are a member of a country team and wish to submit your
            pathway, please visit:
          </p>

          <a
            style={{ color: "#DDA63A", margin: "32px", fontSize: "large" }}
            href="https://app.scenathon.org/login"
          >
            https://app.scenathon.org/login
          </a>
          <p style={{ color: "white", margin: "32px", fontSize: "large" }}>
            Thank you for your continued support and for being a valued visitor
            to our website.
          </p>
          <p style={{ color: "white", margin: "32px", fontSize: "large" }}>
            We look forward to serving you again soon.
          </p>
          <img
            style={{ margin: "32px" }}
            src="/fable_logo_condensed_1c_white.png"
            width="600px"
          />
        </div>
      </div>
    );
  };

  const standardWebpage = () => {
    return (
      <Styles>
        <Router>
          <div className="row__blank row__blank__height__0"></div>{" "}
          {/* div relleno para cuando el di#nabar se salga del flujo normal */}
          <ReactBootStrap.Navbar
            expand="lg"
            id="navbar"
            variant="light"
            className="p-0"
          >
            <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <ReactBootStrap.Navbar.Collapse
              id="responsive-navbar-nav d-flex justify-content-center"
              style={{ background: "rgb(3,32,61)" }}
            >
              <div className="mx-auto col-lg-10 pt-2 pb-2">
                <ReactBootStrap.Nav className="justify-content-between">
                  <div className="d-flex">
                    <Button
                      style={{
                        textTransform: "none",
                        color: "white",
                        fontSize: "1.25rem",
                        font: "Montserrat",
                        fontWeight: 100,
                      }}
                    >
                      <Link
                        style={{ color: "white" }}
                        onClick={() => {
                          window.open("https://fableconsortium.org", "_blank");
                        }}
                        className="decoration__none"
                      >
                        <img
                          src="/fable_logo_condensed_1c_white.png"
                          height="49"
                          width="150"
                        />
                      </Link>
                    </Button>
                  </div>

                  <div className="d-flex">
                    <Button
                      style={{
                        textTransform: "none",
                        color: "white",
                        fontSize: "1.25rem",
                        font: "Montserrat",
                        fontWeight: 100,
                      }}
                    >
                      <Link
                        style={{ color: "white" }}
                        onClick={() => {}}
                        to={"/pgepublicscen21"}
                        className="decoration__none"
                      >
                        DASHBOARD
                      </Link>
                    </Button>

                    <Button
                      style={{
                        textTransform: "none",
                        color: "white",
                        fontSize: "1.25rem",
                        font: "Montserrat",
                        fontWeight: 100,
                      }}
                    >
                      <Link
                        style={{ color: "white" }}
                        onClick={() => {}}
                        to={"/dbdownloads"}
                        className="decoration__none"
                      >
                        DATA
                      </Link>
                    </Button>

                    <Button
                      style={{
                        textTransform: "none",
                        color: "white",
                        fontSize: "1.25rem",
                        font: "Montserrat",
                        fontWeight: 100,
                      }}
                    >
                      <Link
                        style={{ color: "white" }}
                        onClick={() => {}}
                        to={"/collaborators"}
                        className="decoration__none"
                      >
                        PARTICIPANTS
                      </Link>
                    </Button>
                    <Button
                      style={{
                        textTransform: "none",
                        color: "white",
                        fontSize: "1.25rem",
                        font: "Montserrat",
                        fontWeight: 100,
                      }}
                    >
                      <Link
                        style={{ color: "white" }}
                        onClick={() => {
                          openExternalUrL();
                        }}
                        to={""}
                        className="decoration__none"
                      >
                        SCENATHON USER
                      </Link>
                    </Button>
                    {/* <Button
                      style={{
                        textTransform: "none",
                        color: "white",
                        fontSize: "1.25rem",
                        font: "Montserrat",
                        fontWeight: 100,
                      }}
                      onClick={handleClick}
                    >
                      SCENATHONS
                      <ArrowDropDownIcon />
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      getContentAnchorEl={null}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem
                        style={{ color: "black", fontSize: "1.25rem" }}
                        onClick={handleClose}
                      >
                        <Link
                          onClick={() => {
                            openExternalUrL();
                          }}
                          to={""}
                        >
                          Fable Scenathon
                        </Link>
                      </MenuItem>
                      <MenuItem
                        style={{ color: "black", fontSize: "1.25rem" }}
                        onClick={handleClose}
                      >
                        <Link to={"/pgepublicscen20"}>Open Scenathon</Link>
                      </MenuItem>
                    </Menu> */}
                    <Button
                      style={{
                        textTransform: "none",
                        color: "white",
                        fontSize: "1.25rem",
                        font: "Montserrat",
                        fontWeight: 100,
                      }}
                    >
                      <Link
                        style={{ color: "white" }}
                        onClick={() => {}}
                        to={"/about"}
                        className="decoration__none"
                      >
                        ABOUT
                      </Link>
                    </Button>
                  </div>
                </ReactBootStrap.Nav>
              </div>
            </ReactBootStrap.Navbar.Collapse>
          </ReactBootStrap.Navbar>
          <Switch>
            {/* <Route exact path="/home">
            <HomePage />
          </Route> */}

            <Route exact path="/">
              {/* <Home2021 year="2021" scenathon_id="7" /> */}
              <Home2023 year="2023" scenathon_id="16" iteration="5" type="1" />
            </Route>

            <Route exact path="/about">
              <HomeAbout />
            </Route>
            <Route exact path="/dbdownloads">
              <Download />
            </Route>
            <Route exact path="/legal">
              <Legal />
            </Route>
            <Route exact path="/collaborators">
              <About />
            </Route>
            <Route exact path="/scenathon2023">
              <Home2023 year="2023" scenathon_id="16" iteration="5" type="1" />
            </Route>
            <Route exact path="/pgepublicscen23">
              <Home2023 year="2023" scenathon_id="16" iteration="5" type="1" />
            </Route>
            <Route exact path="/pgepublicscen21">
              <Home2021 year="2021" scenathon_id="7" iteration="1" />
            </Route>
            <Route exact path="/pgepublicscen20">
              <Home2021 year="2020" scenathon_id="5" iteration="2" />
            </Route>
            <Route exact path="/pgepublicscen19">
              <Home2019 year="2019" scenathon_id="5" iteration="16" />
            </Route>
          </Switch>
        </Router>
      </Styles>
    );
  };

  return (
    <div>{maintenanceMode ? maintenanceWebpage() : standardWebpage()}</div>
  );
};

export default NavBar;
