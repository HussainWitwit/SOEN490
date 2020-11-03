import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu/NavMenu';
import SideMenu from './SideMenu/SideMenu';

function Layout(props) {
        return (
                <div>
                  <div>
                        <NavMenu />
                        <SideMenu />
                  </div>
                        <Container>{props.children}</Container>
                </div>
        );
}

export default Layout;
