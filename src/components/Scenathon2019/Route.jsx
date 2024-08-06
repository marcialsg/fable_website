
import React from 'react';
import ScenathonWeb from '../../pages/scenathon-web/ScenathonWeb';
import Scenathon2019 from '../../pages/Scenathon2019/Home2019';
import Scenathon2021 from '../../pages/Scenathon2021/Home2021';
import Scenathon2020 from '../../pages/Scenathon2020/Home2020';
import Scenathon2022 from '../../pages/Scenathon2022/Home2022';
import {  Route, Switch } from 'react-router-dom';

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/">
				<ScenathonWeb/>
			</Route>
			<Route exact path="/pgepublicscen21">
				<Scenathon2021/>
			</Route>
			<Route exact path="/pgepublicscen20">
				<Scenathon2020/>
			</Route>
			<Route exact path="/pgepublicscen19">
				<Scenathon2019/>
			</Route>
		</Switch>
	)
};
export default Routes;