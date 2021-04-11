import React, { useState } from 'react';
import './SideMenu.css';
import { Drawer, List, CssBaseline, Typography, ListItem, ListItemIcon, ListItemText, Collapse, ListItemAvatar, Avatar } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { SideMenuItems } from './ListItemObjects.ts';
import LogoSVGComponent from './LogoSVGComponent.jsx';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

export function SideMenu (props) {

  const [openNested, setOpenNested] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [selectedNestedItemIndex, setSelectedNestedItemIndex] = useState(0);
  const [isNestedItemSelected, setIsNestedItemSelected] = useState(false);


  useEffect(()=> {
    if(props.location){
      switch(props.location.pathname){
        case '/recommendations-manage':
          setSelectedItemIndex(1);
          setSelectedNestedItemIndex(0);
          setIsNestedItemSelected(true);
          break;
        case '/recommendations-jobs':
          setSelectedItemIndex(1);
          setSelectedNestedItemIndex(1);
          setIsNestedItemSelected(true);
          break;
        case '/recommendations-results':
          setSelectedItemIndex(1);
          setSelectedNestedItemIndex(2);
          setIsNestedItemSelected(true);
          break;
        default:
          setSelectedItemIndex(0);
          setIsNestedItemSelected(false);
          break;
      }
    }
  }, [])

  /**
   * Function that handles clicking on menu options
   * @param {*} object 
   * @param {*} index 
   */
  const handleClick = (object, index) => {
    if (object.children.length !== 0) {
      setSelectedItemIndex(index);
      setIsNestedItemSelected(true);
      setOpenNested(!openNested);
      props.history.push(object.path);
    }
    else {
      setSelectedItemIndex(index);
      setIsNestedItemSelected(false);
      if (object.path) {
        props.history.push(object.path);
      }
    }
  }

  /**
   * Function that handles clicking on nested menu options
   * @param {*} nestedIndex 
   */
  const handleClickNested = (child, nestedIndex) => {
    props.history.push(child.path);
    setSelectedItemIndex(1);
    setSelectedNestedItemIndex(nestedIndex);
    setIsNestedItemSelected(true);
  }

  const expandButton = (Icon) => (
    <IconButton size="small" onClick={() => { setOpenNested(!openNested) }}>
      <Icon className="icon-container" />
    </IconButton>
  )

  const menuOptions = (listObject, index) => {
    return (
      <List key={index}>

        <ListItem
          data-testid={'listitem' + listObject.name}
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
          {(listObject.children.length !== 0) && (openNested ? expandButton(ExpandLess) : expandButton(ExpandMore))}

        </ListItem>
        {
          listObject.children.length !== 0 &&
          <Collapse in={openNested} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {
                listObject.children.map((child, indexNested) => (
                  <ListItem
                    data-testid={"listitem" + child.name}
                    button
                    onClick={() => handleClickNested(child, indexNested)}
                    className="nested"
                    key={indexNested + 10}
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
        <div id="navigation-pages">
          <ListItem alignItems="flex-start" className="top-header" key={'header'}>
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
        </div>
        <div className="logo"><LogoSVGComponent /></div>
      </Drawer>
    </div>
  )
}

export default withRouter(SideMenu);

/* istanbul ignore next */
SideMenu.propTypes = {
  history: PropTypes.object,
}