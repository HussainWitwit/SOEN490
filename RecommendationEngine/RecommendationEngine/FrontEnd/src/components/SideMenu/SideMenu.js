import React from 'react';
import './SideMenu.css';
import { Drawer, List, CssBaseline, Typography, ListItem, ListItemIcon, ListItemText, Collapse, ListItemAvatar, Avatar } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { SideMenuItems } from './ListItemObjects.ts';

export default function SideMenu (props) {

    const [openNested, setOpenNested] = React.useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
    const [selectedNestedItemIndex, setSelectedNestedItemIndex] = React.useState(0);

    /**
     * Function that handles clicking on menu options
     * @param {*} object 
     * @param {*} index 
     */
    const handleClick = (object, index) => {
        if (object.children.length !== 0) {
            setSelectedItemIndex(index);
            setOpenNested(!openNested);
        }
        else {
            setSelectedItemIndex(index);
        }
    }

    const menuOptions = (listObject, index) => {
        if (listObject.name === 'Settings') {
            return (
                <div className="settings" >
                    <p>Settings</p>
                </div>
            )
        }
        return (
            <List>

                <ListItem
                    style={{ backgroundColor: (selectedItemIndex === index) ? '#4DD3EF' : '#212529' }}
                    button
                    onClick={() => handleClick(listObject, index)}
                    className="outer"
                >
                    <ListItemIcon className="icon-container" >
                        <listObject.listItemIcon className="icon" />
                    </ListItemIcon>
                    <ListItemText >
                        <Typography className="main-titles" variant="inherit" > {listObject.name} </Typography>
                    </ListItemText>
                    {(listObject.children.length !== 0) && (openNested ? <ExpandLess className="icon-container" /> : <ExpandMore className="icon-container" />)}

                </ListItem>
                {
                    listObject.children.length !== 0 && <Collapse in={openNested} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {
                                listObject.children.map((child, indexNested) => (
                                    <ListItem
                                        style={{ color: (selectedNestedItemIndex === indexNested) ? '#4DD3EF' : 'white' }}
                                        button
                                        onClick={() => setSelectedNestedItemIndex(indexNested)}
                                        className="nested"
                                    >
                                        <ListItemIcon className="icon-container" >
                                            <child.listItemIcon
                                                className="icon"
                                                style={{ color: (selectedNestedItemIndex === indexNested) ? '#4DD3EF' : 'white' }
                                                } />
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography
                                                style={{ color: (selectedNestedItemIndex === indexNested) ? '#4DD3EF' : 'white' }}
                                                className="main-titles"
                                                variant="inherit" > {child.name} </Typography>
                                        </ListItemText>

                                    </ListItem>
                                ))
                            }
                        </List>
                    </Collapse>
                }
            </List>
        )
    }

    return (
        <div id="main-container">
            <CssBaseline />
            <Drawer
                variant="permanent"
                className="drawer"
                classes={{ paper: "drawer-paper" }}>

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
                <List>
                    {SideMenuItems.map((item, index) => (menuOptions(item, index)))}
                </List>
            </Drawer>
        </div>
    )
}