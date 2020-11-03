import React from 'react';
import { Container } from 'reactstrap';
import SideMenu from './SideMenu/SideMenu';

function Layout (props) {
  return (
    <div>
      <SideMenu />
      <Container>
        {props.children}
      </Container>
    </div>
  );
}

export default Layout;