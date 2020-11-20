import React from 'react';
import './SideMenu.css';
import { Drawer, List, CssBaseline, Typography, ListItem, ListItemIcon, ListItemText, Collapse, ListItemAvatar, Avatar } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { SideMenuItems } from './ListItemObjects.ts';

//TODO: We should maybe modified the style of the Nested Recommendations to let the user know in which sub-context
//TODO: he is currently in without needing to drop-down. 
export default function SideMenu (props) {

    const [openNested, setOpenNested] = React.useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
    const [selectedNestedItemIndex, setSelectedNestedItemIndex] = React.useState(0);
    const [isNestedItemSelected, setIsNestedItemSelected] = React.useState(false);
    /**
     * Function that handles clicking on menu options
     * @param {*} object 
     * @param {*} index 
     */
    const handleClick = (object, index) => {
        if (object.children.length !== 0) {
            setSelectedItemIndex(index);
            setIsNestedItemSelected(true);
        }
        else {
            setSelectedItemIndex(index);
            setIsNestedItemSelected(false);
        }
    }

    /**
     * Function that handles clicking on nested menu options
     * @param {*} nestedIndex 
     */
    const handleClickNested = (nestedIndex) => {
        setSelectedItemIndex(1);
        setSelectedNestedItemIndex(nestedIndex);
        setIsNestedItemSelected(true);
    }
    //TODO: NEED test 
    const expandButton = (Icon) => (
        <IconButton size = "small" onClick = {() => {setOpenNested(!openNested)}}>
            <Icon className="icon-container" />
        </IconButton>
    )

    const menuOptions = (listObject, index) => {
        if (listObject.name === 'Settings') {
            return (
                <div className="settings" >
                    <p>Settings</p>
                </div>
            )
        }

        return (
            <List key = {index}>

                <ListItem
                    data-testid="listitem1"
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
                    {(listObject.children.length !== 0) && (openNested ?  expandButton(ExpandLess) : expandButton(ExpandMore))}

                </ListItem>
                {
                    listObject.children.length !== 0 && 
                    <Collapse in={openNested} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {
                                listObject.children.map((child, indexNested) => (
                                    <ListItem
                                        data-testid="listitem2"
                                        button
                                        onClick={() => handleClickNested(indexNested)}
                                        className="nested"
                                        key = {indexNested + 10}
                                    >
                                        <ListItemIcon className="icon-container" >
                                            <child.listItemIcon
                                                className="icon"
                                                style={{ color: (isNestedItemSelected && selectedNestedItemIndex === indexNested) ? '#4DD3EF' : 'white' }
                                                } />
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography
                                                style={{ color: (isNestedItemSelected && selectedNestedItemIndex === indexNested) ? '#4DD3EF' : 'white' }}
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
                <ListItem alignItems="flex-start" className="top-header" key = {'header'}>
                    <ListItemAvatar>
                        <Avatar alt="Kenzo" src="../assets/images/avatar1.jpeg" />
                    </ListItemAvatar>
                    <ListItemText >
                        <Typography id="username" variant="inherit" >Kenzo</Typography>
                        <br></br>
                        <Typography id="jobPosition" variant="inherit" >Site Manager</Typography>
                    </ListItemText>
                </ListItem>
                {SideMenuItems.map((item, index) => (menuOptions(item, index)))}
            </Drawer>
        </div>
    )
}