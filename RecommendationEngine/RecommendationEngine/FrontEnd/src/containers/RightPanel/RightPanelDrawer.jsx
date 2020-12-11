import React, { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import AssetTree from '../AssetTreeView/AssetTreeView';
import PropTypes from 'prop-types';
import ManageRecommendationDrawer from '../../components/ManageRecommendationDrawer/ManageRecommendationDrawer';
import { mapRightPanelStateToProps, mapDispatchToProps } from '../../redux/RightPanelReducer/reducer-actions'
import { connect } from 'react-redux';

import './RightPanelDrawer.css';

// TODO: Create a map of all tabs with their handlers, components, etc
const mockTabs = [{}];


RightPanelDrawer.propType = {
  isDrawerOpen: PropTypes.bool.isRequired,
  isInternalClosed: PropTypes.bool.isRequired,
  isDrawerPinned: PropTypes.bool.isRequired,
};

//Extracting props instead of calling props everytime. Might be less readable. However, dev experience is amazing. A.J.U.U
export function RightPanelDrawer({
  isDrawerPinned,
  isOpen,
  tabs,
  selectedTabIndex,
  closeAssetTreeview,
  closeScheduleDrilldown,
  closeAll,
  changeTabIndex
}) {
  const [isPinClicked, setIsPinClicked] = useState(false);

  // TODO: Check with Alain whats the point of InternalClosed
  /*const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    isInternalClosed(open);
    setIsOpen(open);
  };*/

  const pinDrawerEvent = () => {
    setIsPinClicked(!isPinClicked);
    isDrawerPinned(!isPinClicked);
  };

  const handleCloseAssetTreeview = () => {
    closeAssetTreeview();
  }

  const handleCloseScheduleDrilldown = () => {
    closeScheduleDrilldown();
  }

  const tabOptions = {
    AssetTreeview: {
      title: 'Asset Treeview',
      closeHandler: handleCloseAssetTreeview,
      component: (<AssetTree />)
    },
    Drilldown: {
      title: 'Drilldown',
      closeHandler: handleCloseScheduleDrilldown,
      component: (<ManageRecommendationDrawer />)
    },
  }
  
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <div className="header-space"></div>
      <SwipeableDrawer
        anchor="right"
        open={isPinClicked || isOpen}
        onClose={closeAll}
        BackdropProps={{ invisible: true }}
        variant={'persistent'}
        classes={{ paper: 'drawer-container' }}
      >
        {
          <div className="flex-direction-column">
            <div className="header-space"></div>
            <Tabs selectedIndex={selectedTabIndex} onSelect={index => changeTabIndex(index)}>
              <TabList>
                {tabs && tabs.map(tab => (<Tab>
                  {tabOptions[tab.name].title}
                  <IconButton
                    className="drawer-icon-button"
                    onClick={tabOptions[tab.name].closeHandler}
                  >
                    <Close className="drawer-close"></Close>
                  </IconButton>
                </Tab>))}
              </TabList>
              {tabs && tabs.map(tab => (<TabPanel>
                {tabOptions[tab.name].component}
              </TabPanel>))}
            </Tabs>

            {/* <div className="drawer-header-container">
              <p>Asset Selection</p>
              <IconButton className="drawer-pin" onClick={pinDrawerEvent}>
                <Icon
                  className={classNames({
                    'drawer-pinned-icon': isPinClicked,
                    'drawer-unpinned-icon': !isPinClicked,
                  })}
                >
                  push_pin
                </Icon>
              </IconButton>
              {!isPinClicked && (
                <IconButton
                  className="drawer-pin"
                  onClick={toggleDrawer(!isOpen)}
                >
                  <Close className="drawer-close"></Close>
                </IconButton>
              )}
            </div> */}
            <div>{/* <AssetTree nestedAssets = {nestedAssets} /> */}</div>
          </div>
        }
      </SwipeableDrawer>
    </div>
  );
}
export default connect(mapRightPanelStateToProps, mapDispatchToProps)(RightPanelDrawer)