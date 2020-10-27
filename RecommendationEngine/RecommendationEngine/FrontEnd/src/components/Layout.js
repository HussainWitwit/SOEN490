import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

function Layout (props) {
  const [crumbs, setCrumbs] = React.useState(['Home', 'Category', 'Sub Category']);

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