import React from 'react';
import { Container } from 'reactstrap';
import TopBar from './TopBar/TopBar';
import SideMenu from './SideMenu/SideMenu';

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