import React from 'react';
import './SideMenu.css';
import { Drawer, List, CssBaseline, Typography, ListItem, ListItemIcon, ListItemText, Collapse, ListItemAvatar, Avatar } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import TuneRoundedIcon from '@material-ui/icons/TuneRounded';
import EventRoundedIcon from '@material-ui/icons/EventRounded';
import WorkOutlineRoundedIcon from '@material-ui/icons/WorkOutlineRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';

export default function SideMenu (props) {

    const [openNested, setOpenNested] = React.useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
    const [isSelected, setIsSelected] = React.useState(true);

    /**
     * This function handles clicks on nested page links
     * @param {} event 
     * @param {*} index 
     */
    const handleClick = (event, index) => {
        setSelectedItemIndex(index);
        setOpenNested(!openNested);
    }

    /**
     * This function handles clicks on outer page links
     * @param {*} event 
     * @param {*} index 
     */
    const handleClickedItem = (event, index) => {
        setIsSelected(true);
        setSelectedItemIndex(index);
    }

    return (
        <div className="root">
            <CssBaseline />
            <Drawer
                variant="permanent"
                className="drawer"
                classes={{ paper: "drawer-paper" }}>
                <List>
                    <ListItem alignItems="flex-start" className="top-header">
                        <ListItemAvatar>
                            <Avatar alt="Kenzo" src="../assets/images/avatar1.jpeg" />
                        </ListItemAvatar>
                        <ListItemText >
                            <Typography id="username" variant="inherit" >Kenzo</Typography>
                            <br></br>
                            <Typography id="jobPosition" variant="inherit" >Site Manager</Typography>
                        </ListItemText>
                    </ListItem>
                </List>
                <List style={{ marginRight: '0%' }}>
                    <ListItem
                        id="dashboard"
                        style={{ backgroundColor: (isSelected && selectedItemIndex === 0) ? '#4DD3EF' : '#212529' }}
                        button
                        selected={isSelected === true}
                        onClick={(event) => handleClickedItem(event, 0)}
                        className="outer"
                    >
                        <ListItemIcon className="icon-container">
                            <DashboardRoundedIcon className="icon" />
                        </ListItemIcon>
                        <ListItemText><Typography className="main-titles" variant="inherit">Dashboard</Typography></ListItemText>
                    </ListItem>
                    <ListItem button
                        id="recommendations"
                        style={{ backgroundColor: (isSelected && selectedItemIndex === 1) ? '#4DD3EF' : '#212529' }}
                        onClick={(event) => handleClick(event, 1)}
                        selected={selectedItemIndex === 1}>

                        <ListItemIcon className="icon-container">
                            <ListAltRoundedIcon className="icon" />
                        </ListItemIcon>
                        <ListItemText><Typography className="main-titles" variant="inherit">Recommendations</Typography></ListItemText>
                        {openNested ? <ExpandLess className="icon-container" /> : <ExpandMore className="icon-container" />}
                    </ListItem>
                    <Collapse in={openNested} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem
                                id="manage"
                                button
                                className="nested"
                                onClick={(event) => handleClickedItem(event, 2)}
                                selected={selectedItemIndex === 2}
                            >
                                <ListItemIcon className="icon-container">
                                    <BuildRoundedIcon
                                        className="icon"
                                        style={{ color: (isSelected && selectedItemIndex === 2) ? '#4DD3EF' : 'white' }} />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography
                                        style={{ color: (isSelected && selectedItemIndex === 2) ? '#4DD3EF' : 'white' }}
                                        className="main-titles"
                                        variant="inherit">
                                        Manage
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem
                                id="results"
                                button
                                className="nested"
                                onClick={(event) => handleClickedItem(event, 3)}
                                selected={selectedItemIndex === 3}
                            >
                                <ListItemIcon className="icon-container">
                                    <CheckCircleOutlineRoundedIcon
                                        className="icon"
                                        style={{ color: (isSelected && selectedItemIndex === 3) ? '#4DD3EF' : 'white' }} />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography
                                        className="main-titles"
                                        variant="inherit"
                                        style={{ color: (isSelected && selectedItemIndex === 3) ? '#4DD3EF' : 'white' }}
                                    >
                                        Results
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem
                                id="jobs"
                                button
                                className="nested"
                                onClick={(event) => handleClickedItem(event, 4)}
                                selected={selectedItemIndex === 4}
                                style={{ color: (isSelected && selectedItemIndex === 4) ? '#4DD3EF' : 'white' }}>
                                <ListItemIcon className="icon-container">
                                    <TuneRoundedIcon
                                        className="icon"
                                        style={{ color: (isSelected && selectedItemIndex === 4) ? '#4DD3EF' : 'white' }} />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography
                                        className="main-titles"
                                        variant="inherit"
                                        style={{ color: (isSelected && selectedItemIndex === 4) ? '#4DD3EF' : 'white' }}>
                                        Jobs
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem
                                id="actions"
                                button
                                className="nested"
                                onClick={(event) => handleClickedItem(event, 5)}
                                selected={selectedItemIndex === 5}
                                style={{ color: (isSelected && selectedItemIndex === 5) ? '#4DD3EF' : 'white' }}>
                                <ListItemIcon className="icon-container">
                                    <EventRoundedIcon
                                        style={{ color: (isSelected && selectedItemIndex === 5) ? '#4DD3EF' : 'white' }}
                                        className="icon" />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography
                                        className="main-titles"
                                        variant="inherit"
                                        style={{ color: (isSelected && selectedItemIndex === 5) ? '#4DD3EF' : 'white' }}>
                                        Actions
                                        </Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem
                        id="work-orders"
                        button
                        className="outer"
                        selected={selectedItemIndex === 6}
                        onClick={(event) => handleClickedItem(event, 6)}
                        style={{ backgroundColor: (isSelected && selectedItemIndex === 6) ? '#4DD3EF' : '#212529' }}>
                        <ListItemIcon className="icon-container">
                            <WorkOutlineRoundedIcon className="icon" />
                        </ListItemIcon>
                        <ListItemText><Typography className="main-titles" variant="inherit">Work Orders</Typography></ListItemText>
                    </ListItem>
                </List>
                <div className="settings">
                    <p>Settings</p>
                </div>
                <List>
                    <ListItem
                        id="main-settings"
                        button
                        className="outer"
                        selected={selectedItemIndex === 7}
                        onClick={(event) => handleClickedItem(event, 7)}
                        style={{ backgroundColor: (isSelected && selectedItemIndex === 7) ? '#4DD3EF' : '#212529' }}>
                        <ListItemIcon className="icon-container">
                            <SettingsRoundedIcon className="icon" />
                        </ListItemIcon>
                        <ListItemText><Typography className="main-titles" variant="inherit">Main Settings</Typography></ListItemText>
                    </ListItem>
                    <ListItem
                        id="notifications"
                        button
                        className="outer"
                        selected={selectedItemIndex === 8}
                        onClick={(event) => handleClickedItem(event, 8)}
                        style={{ backgroundColor: (isSelected && selectedItemIndex === 8) ? '#4DD3EF' : '#212529' }}>
                        <ListItemIcon className="icon-container">
                            <NotificationsRoundedIcon className="icon" />
                        </ListItemIcon>
                        <ListItemText><Typography className="main-titles" variant="inherit">Notifications</Typography></ListItemText>
                    </ListItem>

                </List>

            </Drawer >
        </div >
    );
}