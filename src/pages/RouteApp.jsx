import React, { Component } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import Home from "../home";
import About from "../about";
import Contact from "../contact";
import '../css/index.css';

const RouteApp = () => {
  return (
    <Router>
      <div className="App">
        <ul className="App-header">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/contact" element={<Contact />}></Route>
      </div>
    </Router>
  );
};
export default RouteApp;
