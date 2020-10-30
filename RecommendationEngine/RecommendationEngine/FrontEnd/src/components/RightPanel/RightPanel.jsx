import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {drawerStyle, ButtonStyled} from '../RightPanel/RightPanelStyle';
import Button from '@material-ui/core/Button';
// import '../RightPanel/RightPanel.css';
export default function TemporaryDrawer() {

    const style = drawerStyle();

    return (
        // <div className ={drawerStyle.drawerBox}></div>
        <SwipeableDrawer
        disableBackdropTransition = {true}
        anchor = {"right"}
        classes = {style.drawerBox}
        >
        </SwipeableDrawer>
    );

}

export function DrawerButton() {
    const style = ButtonStyled();
    return (
        <div>
        <Button variant="contained" color="primary" className = {style.drawerButton}>PRESSSS</Button>
        </div>
    );
}
