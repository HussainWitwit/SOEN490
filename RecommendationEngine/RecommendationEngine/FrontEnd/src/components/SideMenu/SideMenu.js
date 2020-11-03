import React from 'react';
import './SideMenu.css';
import { Drawer, List, CssBaseline, Typography, Divider, ListItem, ListItemIcon, ListItemText, Collapse, ListItemAvatar, Avatar } from '@material-ui/core';
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

export default function SideMenu () {

    const [openNested, setOpenNested] = React.useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
    const [isSelected, setIsSelected] = React.useState(true);

    const handleClick = (event, index) => {
        setSelectedItemIndex(index);
        setOpenNested(!openNested);
    }

    const handleClickedItem = (event, index) => {
        setIsSelected(true);
        setSelectedItemIndex(index);
    }

    return (
        <div className="root">
            <CssBaseline />
            <Drawer
                // style={{ backgroundColor: "#212529" }}
                variant="permanent"
                className="drawer"
                classes={{ paper: "drawer-paper" }}>

                <Divider />
                <List className="outer">
                    <ListItem alignItems="flex-start" style={{ backgroundColor: "#212529" }}>
                        <ListItemAvatar>
                            <Avatar alt="Kenzo" src="../assets/images/avatar1.jpeg" />
                        </ListItemAvatar>
                        <ListItemText
                            className="username"
                            primary="Kenzo"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className="inline"
                                        color="textPrimary"
                                    >
                                        Site Manager
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </List>
                <List>

                    <ListItem
                        style={{ backgroundColor: (isSelected && selectedItemIndex === 0) ? '#4DD3EF' : '#212529' }}
                        button
                        selected={isSelected === true}
                        onClick={(event) => handleClickedItem(event, 0)}
                        className="outer"
                    >
                        <ListItemIcon className="icon">
                            <DashboardRoundedIcon className="icon" />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" className="mainTitles" />

                    </ListItem>

                    <ListItem button
                        style={{ backgroundColor: (isSelected && selectedItemIndex === 1) ? '#4DD3EF' : '#212529' }}
                        onClick={(event) => handleClick(event, 1)}
                        selected={selectedItemIndex === 1}>

                        <ListItemIcon className="icon">
                            <ListAltRoundedIcon className="icon" />
                        </ListItemIcon>
                        <ListItemText primary="Recommendations" className="mainTitles" />
                        {openNested ? <ExpandLess className="icon" /> : <ExpandMore className="icon" />}
                    </ListItem>

                    <Collapse in={openNested} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItem
                                button
                                className="nested"
                                onClick={(event) => handleClickedItem(event, 2)}
                                selected={selectedItemIndex === 2}
                                style={{ color: (isSelected && selectedItemIndex === 2) ? '#4DD3EF' : 'white' }}
                            >
                                <ListItemIcon className="icon">
                                    <BuildRoundedIcon
                                        className="icon"
                                        style={{ color: (isSelected && selectedItemIndex === 2) ? '#4DD3EF' : 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="Manage" />
                            </ListItem>

                            <ListItem
                                button
                                className="nested"
                                onClick={(event) => handleClickedItem(event, 3)}
                                selected={selectedItemIndex === 3}
                                style={{ color: (isSelected && selectedItemIndex === 3) ? '#4DD3EF' : 'white' }}>
                                <ListItemIcon className="icon">
                                    <CheckCircleOutlineRoundedIcon
                                        className="icon"
                                        style={{ color: (isSelected && selectedItemIndex === 3) ? '#4DD3EF' : 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="Results" />
                            </ListItem>

                            <ListItem
                                button
                                className="nested"
                                onClick={(event) => handleClickedItem(event, 4)}
                                selected={selectedItemIndex === 4}
                                style={{ color: (isSelected && selectedItemIndex === 4) ? '#4DD3EF' : 'white' }}>
                                <ListItemIcon className="icon">
                                    <TuneRoundedIcon
                                        className="icon"
                                        style={{ color: (isSelected && selectedItemIndex === 4) ? '#4DD3EF' : 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="Jobs" />
                            </ListItem>

                            <ListItem
                                button
                                className="nested"
                                onClick={(event) => handleClickedItem(event, 5)}
                                selected={selectedItemIndex === 5}
                                style={{ color: (isSelected && selectedItemIndex === 5) ? '#4DD3EF' : 'white' }}>
                                <ListItemIcon className="icon">
                                    <EventRoundedIcon
                                        style={{ color: (isSelected && selectedItemIndex === 5) ? '#4DD3EF' : 'white' }}
                                        className="icon" />
                                </ListItemIcon>
                                <ListItemText primary="Actions" />
                            </ListItem>

                        </List>
                    </Collapse>

                    <ListItem
                        button
                        className="outer"
                        selected={selectedItemIndex === 6}
                        onClick={(event) => handleClickedItem(event, 6)}
                        style={{ backgroundColor: (isSelected && selectedItemIndex === 6) ? '#4DD3EF' : '#212529' }}>
                        <ListItemIcon className="icon">
                            <WorkOutlineRoundedIcon className="icon" />
                        </ListItemIcon>
                        <ListItemText primary="Work Orders" className="mainTitles" />
                    </ListItem>

                </List>

                <div className="settings">
                    <p>Settings</p>
                </div>

                <List>

                    <ListItem button
                        className="outer"
                        selected={selectedItemIndex === 7}
                        onClick={(event) => handleClickedItem(event, 7)}
                        style={{ backgroundColor: (isSelected && selectedItemIndex === 7) ? '#4DD3EF' : '#212529' }}>
                        <ListItemIcon className="icon">
                            <SettingsRoundedIcon className="icon" />
                        </ListItemIcon>
                        <ListItemText primary="Main Settings" className="mainTitles" />
                    </ListItem>

                    <ListItem button
                        className="outer"
                        selected={selectedItemIndex === 8}
                        onClick={(event) => handleClickedItem(event, 8)}
                        style={{ backgroundColor: (isSelected && selectedItemIndex === 8) ? '#4DD3EF' : '#212529' }}>
                        <ListItemIcon className="icon">
                            <NotificationsRoundedIcon className="icon" />
                        </ListItemIcon>
                        <ListItemText primary="Notifications" className="mainTitles" />
                    </ListItem>

                </List>

            </Drawer >
        </div >
    );
}
