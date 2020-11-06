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
      <div className = 'main-context'>
        <SideMenu />
        <div className = 'sub-context'>
          <TopBar changeAsset = {getChangedAssetTopBarEvent} sharedChangeAssetValue = {isChangeAssetClicked}/>
          <RightPanelDrawer isDrawerOpen = {isChangeAssetClicked} isInternalClosed = {getChangedAssetTopBarEvent}/>
          <Container>
            {props.children}
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Layout;