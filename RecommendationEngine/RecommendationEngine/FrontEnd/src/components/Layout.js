import React from 'react';
import { Container } from 'reactstrap';
import SideMenu from './SideMenu/SideMenu';

function Layout (props) {
  //FIXME: This hook shouldn't be here
  //TODO: The left Main Menu should be declared at this level. and the top-bar should be a sub-component of the mainMenu.
  const [crumbs, setCrumbs] = React.useState(['All Portfolio', '23-kahuku', '001-kahuku']);

  const selected = (crumb) => {
    console.log(crumb);
  }
  
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