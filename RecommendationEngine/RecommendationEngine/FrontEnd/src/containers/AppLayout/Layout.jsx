import React from 'react';
import { Container } from 'reactstrap';
import TopBar from '../TopBar/TopBar';
import SideMenu from '../SideMenu/SideMenu';
import RightPanelDrawer from '../RightPanel/RightPanelDrawer';
import NotificationAlert from '../../components/NotificationAlert/NotificationAlert'
import './Layout.css';
import { mapRightPanelStateToProps } from '../../redux/RightPanelReducer/reducer-actions';
import { connect } from 'react-redux';

function Layout (props) {
  return (
    <div>
      <div className='app-context'>
        <SideMenu />
        <div className='right-main-context'>
          <TopBar />
          <div className={props.isOpen ? 'route-context-drawer' : 'route-context'}>
            <Container fluid={true}>
              {props.children}
            </Container>
          </div>
        </div>
      </div>
      <NotificationAlert />
      <RightPanelDrawer />
    </div>
  );
}

export default connect(mapRightPanelStateToProps)(Layout);