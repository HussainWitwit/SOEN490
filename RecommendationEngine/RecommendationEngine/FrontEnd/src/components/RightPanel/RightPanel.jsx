import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import { AssetTree } from '../AssetTreeView/AssetTreeView';
import '../RightPanel/RightPanel.css';


//This component should have its own context, independant from the page shown.
export default function TemporaryDrawer() {

    const [isOpen, setIsOpen] = React.useState(false);
    const [isPinClicked, setIsPinClicked] = React.useState(false);
    
    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setIsOpen(open);
      };

    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <Button 
            variant="contained" 
            color="primary" 
            classes = {{root: 'Drawer-Button-Styled'}}
            onClick = {toggleDrawer(!isOpen)}
            >
            PRESSSS
            </Button>
            <SwipeableDrawer
            anchor = 'right'
            open={isOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            BackdropProps={{ invisible: true }}
            variant = {'persistent'}
            classes = {{paper: 'Drawer-Container'}}
            >
            {<div className = 'flex-direction-column'>
                <div className= 'Drawer-Header-Container'>
                    <p>Asset Selection</p>
                    <IconButton className ='Drawer-Pin' onClick = {() =>{setIsPinClicked(!isPinClicked);}}>
                        <Icon className = {classNames({'Drawer-Pinned-Icon': isPinClicked, 'Drawer-UnPinned-Icon': !isPinClicked})}>push_pin</Icon>
                    </IconButton>
                    <IconButton className ='Drawer-Pin' onClick = {toggleDrawer(!isOpen)}>
                        <Close className = 'Drawer-Close'></Close>
                    </IconButton>
                </div>
                <div>
                    <AssetTree />
                </div>
        </div>}
        </SwipeableDrawer>
        </div>
    );
}
