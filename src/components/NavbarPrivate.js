import React from "react";
// import "../css/App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import HomePrivate from "../pages/Scenathon2023/Home2023";

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

const NavBarPrivate = () => {
  return (
    <Styles>
      <Router>
        <Switch>

          <Route exact path="/scenathon2023">
          <HomePrivate year="2023" scenathon_id="16" iteration="5" type="1"/>
          </Route>

        </Switch>
      </Router>
    </Styles>
  );
};

export default NavBarPrivate;
