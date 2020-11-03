import React from 'react';
import { Container } from 'reactstrap';
import TopBar from './NavMenu/TopBar';
import SideMenu from './SideMenu/SideMenu';

function Layout(props) {
        return (
                <div>
                        <div>
                                <TopBar />
                                <SideMenu />
                        </div>
                        <Container>{props.children}</Container>
                </div>
        );
}

export default Layout;
