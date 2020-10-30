import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

function Layout (props) {
  const [crumbs, setCrumbs] = React.useState(['All Portfolio', '23-kahuku', '001-kahuku']); //this should be in topbar

  const selected = (crumb) => {
    console.log(crumb);
  }
  
  return (
    <div>
      <NavMenu crumbs={ crumbs } selected={ selected }  />
      <Container>
        {props.children}
      </Container>
    </div>
  );
}

export default Layout;