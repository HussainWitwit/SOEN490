import React from 'react';
import { Container } from 'reactstrap';
import TopBar from './components/TopBar/TopBar';
import SideMenu from './components/SideMenu/SideMenu';

function Layout (props) {  
  return (
    <div>
      <TopBar />
      <SideMenu />
      <Container>
        {props.children}
      </Container>
      
    </div>
  );
}

export default Layout;