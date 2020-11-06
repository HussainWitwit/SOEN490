import React, { useState } from 'react';
import { Container } from 'reactstrap';
import TopBar from './TopBar/TopBar';
import SideMenu from './SideMenu/SideMenu';
import RightPanelDrawer from '../components/RightPanel/RightPanel';
import '../components/Layout.css';

function Layout (props) {
  
  const [isChangeAssetClicked, setIsChangeAssetClicked] = useState(false);

  const getChangedAssetTopBarEvent = (value) => {
    setIsChangeAssetClicked(value);
  } 
  return (
    <div>
      <div className = 'app-context'>
        <SideMenu />
        <div className = 'right-main-context'>
          <TopBar changeAsset = {getChangedAssetTopBarEvent} sharedChangeAssetValue = {isChangeAssetClicked}/>
          <div className = 'route-context'>
            <Container fluid = {true}>
              {props.children} 
            </Container>         
            <RightPanelDrawer isDrawerOpen = {isChangeAssetClicked} isInternalClosed = {getChangedAssetTopBarEvent}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;