import React, { useEffect }from 'react';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {DrawerStyled, ButtonStyled} from '../RightPanel/RightPanelStyle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import MenuOpenRoundedIcon from "@material-ui/icons/MenuOpenRounded";

// import '../RightPanel/RightPanel.css';

//This component should have its own context, independant from the page shown.
export default function TemporaryDrawer() {

    const drawerStyle = DrawerStyled();
    const buttonStyle = ButtonStyled();

    const [isOpen, setIsOpen] = React.useState(false);
    const [isPinClicked, setIsPinClicked] = React.useState(false);
    
    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setIsOpen(open);
      };

    //FIXME: Pin icon is VERY annoying to style with animated rotation
    const treeViewContainer = () => {
        return(
            <div>
                <IconButton aria-label='primary'>
                    <Icon className = {clsx(isPinClicked && drawerStyle.pinIconButtonOn, !isPinClicked && drawerStyle.pinIconButtonOff)}>push_pin</Icon>
                </IconButton>
            </div>
        )
    };

    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <Button 
            variant="contained" 
            color="primary" 
            className = {buttonStyle.drawerButton}
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
            classes = {{paper: drawerStyle.drawerBox}}
            >
                {treeViewContainer()}
        </SwipeableDrawer>
        </div>
    );
}
