import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './css/index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import NavbarPrivate from "./components/NavbarPrivate";
import UpdateScenathonCacheService from "./services/Scenathon2023/UpdateScenathonCacheService";

export { default as ACTIONS } from './constants/actions';
export { default as EVENTS } from './constants/events';
export { default as LIFECYCLE } from './constants/lifecycle';
export { default as STATUS } from './constants/status';


UpdateScenathonCacheService().then(function (value) {
	console.log("returned UpdateScenathonCacheService value: ", value);

  });


ReactDOM.render(
	<Router>
		<Switch>

			<Route path="/scenathon2023" exact component={NavbarPrivate} />
			<Route path="/" exact component={Navbar} />
			{/* <Route path="/home" exact component={Navbar} /> */}
			<Route path="/dbdownloads" exact component={Navbar} />
			<Route path="/about" exact component={Navbar} />
			<Route path="/legal" exact component={Navbar} />
			<Route path="/collaborators" exact component={Navbar} />
			<Route path="/pgepublicscen19" exact component={Navbar} />
			<Route path="/pgepublicscen20" exact component={Navbar} />
			<Route path="/pgepublicscen21" exact component={Navbar} />
			<Route path="/pgepublicscen23" exact component={Navbar} />
			{/* <Route path="/alratonlegustaelqueso" exact component={Navbar} /> */}
			

			<Route component={NotFound} />
		</Switch>
	</Router>,	document.getElementById('root')
);

serviceWorker.unregister();