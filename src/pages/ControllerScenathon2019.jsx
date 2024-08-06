// https://unstats.un.org/SDGAPI/swagger/v1/
// https://sdg-api.herokuapp.com/goals

import React, { useState } from 'react';

// MATERIAL STUFF
import { ProSidebar, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, withStyles } from '@material-ui/core/styles';
//dashboards
import NetForestCoverChange from "./NetForestCoverChange";
import Biodiversity from "./Biodiversity";
import GlobalTargets from "./GlobalTargets";
import FoodEnergyIntakePerCapita from "./FoodEnergyIntakePerCapita";
import GreenHouseOne from "./GreenHouseOne";
import DataExplorer from "../data-explorer/DataExplorer";
//assets
import TradeReport from "./TradeReport";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import clsx from 'clsx';

// STYLES
import '../../css/index.css'

import {
	withRouter,
} from "react-router-dom";
const GlobalCss = withStyles({
	'@global': {
		'.MuiListItem-root.Mui-selected': {
			backgroundColor: '#306973',
			color: 'white',
		},
		'.MuiListItem-root.Mui-selected:hover': {
			backgroundColor: '#508993',
			color: 'white',
		},
		'.subitem.Mui-selected': {
			backgroundColor: '#104953',
		},
		'.subitem': {
			textAlign: 'right', fontStyle: 'italic', fontSize: 10
		}
	},
})(() => null);

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		position: 'relative',
		left: 'auto',
		fontSize: '6px',
	},
	item: {
		paddingTop: 3,
		paddingBottom: 2,

	},
	subitem: {
		padding: '0 10px 0 10px'
	},

	docked: true,
	menuButton: {
		marginRight: '3em',
	},
	drawer: {
		width: '20em',
		flexShrink: 0,
	},
	drawerGeneralStyles: {
		position: 'relative',
		display: 'block',
		height: '100%',
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
	let sdg = require('../../data/sdg.json');
	const classes = useStyles();
	const [selectedIndex, setSelectedIndex] = useState(0);
	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
	};

	// GHG
	const [ghgOpen, setGhgOpen] = useState({ ghgOpen: false });
	const handleGhgClick = () => { setGhgOpen(!ghgOpen); };
	const [ghgSection, setGhgSection] = useState({ ghgOpen: true });
	const handleGhgSection = (e) => { setGhgSection(e) };
	const handleClickAway = () => { setGhgOpen(false); };
	// Global Target Summary
	const [globalOpen, setGlobalOpen] = useState({ globalOpen: false });
	const handleGlobalClick = () => { setGlobalOpen(!globalOpen); };
	const [globalSection, setGlobalSection] = useState({ globalSection: true });
	const handleGlobalSection = (e) => { setGlobalSection(e) };
	const handleClickAwayGlobal = () => { setGlobalOpen(false); };

	const appTitle = <div className="spacer"><h1>Dashboard 2019</h1></div>;
	return (
		<>
			<div className="grid-container">

				<div className="Header">

					{(() => {
						switch (selectedIndex) {
							case 1: return <div className="banner unselectable" style={{ backgroundColor: sdg[14].colorInfo.hex }}>{appTitle}<h1 class="text-white text-center banner-h">Net Forest Cover Change</h1><img alt="" className="sdg-icon" src={sdg[14].icon_url} /></div>;
							case 2: return <div className="banner unselectable" style={{ backgroundColor: sdg[14].colorInfo.hex }}>{appTitle}<h1 class="text-white text-center banner-h">Biodiversity</h1><img alt="" className="sdg-icon" src={sdg[14].icon_url} /></div>;
							case 3: return <div className="banner unselectable" style={{ backgroundColor: sdg[12].colorInfo.hex }}>{appTitle}<h1 class="text-white text-center banner-h">Greenhouse Gas Emissions</h1><img alt="" className="sdg-icon" src={sdg[12].icon_url} /></div>;
							case 4: return <div className="banner unselectable" style={{ backgroundColor: '#DDA63A' }}>{appTitle}<h1 class="text-white text-center banner-h">Zero Hunger</h1><img alt="" className="sdg-icon" src={sdg[1].icon_url} /></div>;
							case 5: return <div className="banner unselectable" style={{ backgroundColor: '#888888' }}>{appTitle}<h1 class="text-white text-center banner-h">Trade Report</h1><div className="sdg-icon"></div></div>;
							case 0: return <div className="banner unselectable" style={{ backgroundColor: '#888888' }}>{appTitle}<h1 class="text-white text-center banner-h">Global Targets</h1><div className="sdg-icon"></div></div>;
							case 6: return <div className="banner unselectable" style={{ backgroundColor: '#8c8ad8' }}>{appTitle}<h1 class="text-white text-center banner-h">Biodiversity Data Explorer</h1><div className="sdg-icon"></div></div>;
							default: return null;
						}
					})()}
				</div>
				<div className="Menu" ><GlobalCss />

					<Drawer
						variant="permanent"
						className={clsx(classes.drawer, {})}
						classes={{
							paper: clsx({
								[classes.drawerGeneralStyles]: true
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
							{/*<SidebarHeader>
								<div
									style={{
										paddingLeft: '24px',
										textTransform: 'uppercase',
										fontWeight: 'bold',
										fontSize: 13,
										letterSpacing: '1px',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
										textAlign: 'center',
									}}
								>
									Menu
								</div>
							</SidebarHeader>*/}
							<SidebarContent>
								<List component="nav" aria-label="">
									<ListItem classes={{ root: classes.item }} 
										button 
										selected={selectedIndex === 0} 
										onClick={(event) => {
											setGlobalOpen(false);
											handleListItemClick(event, 0);}
										}>
										<ListItemText primary="Global Targets" />
									</ListItem>
									<ListItem 
										classes={{ root: classes.item }} 
										button 
										selected={selectedIndex === 1} 
										onClick={(event) => {
											setGlobalOpen(false);
											handleListItemClick(event, 1);}
										}>
										<ListItemText primary="Net Forest Cover Change" />
									</ListItem>
									<ListItem 
										classes={{ root: classes.item }} 
										button 
										selected={selectedIndex === 2} 
										onClick={(event) => {
											setGlobalOpen(false);setGhgOpen(false);
											handleListItemClick(event, 2);}
										}>
										<ListItemText primary="Biodiversity" />
									</ListItem>
									<ListItem 
										classes={{ root: classes.item }} 
										button 
										selected={selectedIndex === 3} 
										onClick={(event) => {
											setGlobalOpen(false);setGhgOpen(false);
											handleListItemClick(event, 3);}
										}>
										<ListItemText primary="Global GHG Emissions Targets" />
									</ListItem>
									<ListItem 
										classes={{ root: classes.item }} 
										button 
										selected={selectedIndex === 4} 
										onClick={(event) => {
											setGlobalOpen(false);setGhgOpen(false);
											handleListItemClick(event, 4);}
										}>
										<ListItemText primary="Zero Hunger" />
									</ListItem>
									<ListItem 
										classes={{ root: classes.item }} 
										button 
										selected={selectedIndex === 5} 
										onClick={(event) => {
											setGlobalOpen(false);setGhgOpen(false);
											handleListItemClick(event, 5);}
										}>
										<ListItemText primary="Trade Report" />
									</ListItem>
									<ListItem 
										classes={{ root: classes.item }} 
										button 
										selected={selectedIndex === 6} 
										onClick={(event) => {
											setGlobalOpen(false);setGhgOpen(false);
											handleListItemClick(event, 6);}
										}>
										<ListItemText primary="Biodiversity Data Explorer" />
									</ListItem>

								</List>
							</SidebarContent>
						</ProSidebar>
					</Drawer>
				</div>
				<div class="Content">
					<AwesomeSlider styles={{ height:'95vh',
						':root': { '--control-button-width': '150px' },
					}} bullets={false} transitionDelay={0} selected={selectedIndex} onTransitionEnd={(event) => { setSelectedIndex(event.currentIndex) }}>
						<div className="" style={{ backgroundColor: 'white' }} >
							<GlobalTargets section={globalSection} />
						</div>
						<div className="" style={{ backgroundColor: 'white' }} >
							<NetForestCoverChange />
						</div>
						<div className="" style={{ backgroundColor: 'white' }} >
							<Biodiversity />
						</div>
						<div className="" style={{ backgroundColor: 'white' }} >
							<GreenHouseOne />
						</div>
						<div className="" style={{ backgroundColor: 'white' }} >
							<FoodEnergyIntakePerCapita />
						</div>
						<div className="" style={{ backgroundColor: 'white' }} >
							<TradeReport />
						</div>
						<div className="" style={{ backgroundColor: 'white' }} >
							<DataExplorer />
						</div>
					</AwesomeSlider>
				</div>
			</div>
		</>
	)
}


export default withRouter(Scenathon);