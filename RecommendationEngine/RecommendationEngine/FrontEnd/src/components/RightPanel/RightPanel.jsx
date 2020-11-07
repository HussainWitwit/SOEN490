import React, { useState, useEffect } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import { AssetTree } from '../AssetTreeView/AssetTreeView';
import PropTypes from 'prop-types';
import '../RightPanel/RightPanel.css';

RightPanelDrawer.propType = {
    isDrawerOpen: PropTypes.bool.isRequired,
    isInternalClosed: PropTypes.bool.isRequired,
    isDrawerPinned: PropTypes.bool.isRequired
}


//Extracting props instead of calling props everytime. Might be less readable. However, dev experience is amazing. A.J.U.U
export default function RightPanelDrawer({ isDrawerOpen, isInternalClosed, isDrawerPinned }) {

    const [isOpen, setIsOpen] = useState(isDrawerOpen === undefined ? false : isDrawerOpen);
    const [isPinClicked, setIsPinClicked] = useState(false);
    
    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        isInternalClosed(open);
        setIsOpen(open);
      };

      const pinDrawerEvent = () => {
        setIsPinClicked(!isPinClicked);
        isDrawerPinned(!isPinClicked)
      }


      useEffect(() => {
        setIsOpen(isDrawerOpen);
      }, [isDrawerOpen])
    
    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <div className = 'header-space'></div>
            <SwipeableDrawer
            anchor = 'right'
            open={isPinClicked || isOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            BackdropProps={{ invisible: true }}
            variant = {'persistent'}
            classes = {{paper: 'drawer-container'}}
            >
            {<div className = 'flex-direction-column'>
                <div className = 'header-space'></div>
                <div className= 'drawer-header-container'>
                    <p>Asset Selection</p>
                    <IconButton className ='drawer-pin' onClick = {pinDrawerEvent}>
                        <Icon className = {classNames({'drawer-pinned-icon': isPinClicked, 'drawer-unpinned-icon': !isPinClicked})}>push_pin</Icon>
                    </IconButton>
                    {!isPinClicked && 
                    <IconButton className ='drawer-pin' onClick = {toggleDrawer(!isOpen)}>
                        <Close className = 'drawer-close'></Close>
                    </IconButton>
                    }
                </div>
                <div>
                    <AssetTree />
                </div>
        </div>}
        </SwipeableDrawer>
        </div>
    );
}
