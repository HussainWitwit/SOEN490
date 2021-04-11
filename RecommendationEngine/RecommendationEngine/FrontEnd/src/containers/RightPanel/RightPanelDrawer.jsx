import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import AssetTree from '../AssetTreeView/AssetTreeView';
import ManageRecommendationDrawer from '../../containers/ManageRecommendationDrawer/ManageRecommendationDrawer';
import { mapRightPanelStateToProps, mapDispatchToProps } from '../../redux/RightPanelReducer/reducer-actions';
import { connect } from 'react-redux';
import './RightPanelDrawer.css';
import ActionDrawer from '../ActionDrawer/ActionDrawer';
import { findFirstTabOrFalse } from '../../utilities/ArrayManipulationUtilities';
import PropTypes from 'prop-types';

export function RightPanelDrawer ({
  isOpen,
  tabs,
  selectedTabIndex,
  closeAssetTreeview,
  closeScheduleDrilldown,
  closeResultDrilldown,
  closeAll,
  changeTabIndex
}) {

  const tabOptions = {
    AssetTreeview: {
      title: 'Asset Treeview',
      closeHandler: closeAssetTreeview,
      component: (<AssetTree />)
    },
    Details: {
      title: 'Details',
      closeHandler: closeScheduleDrilldown,
      component: (
        <ManageRecommendationDrawer configuredRecommendation={findFirstTabOrFalse(tabs, 'Details')} />)
    },
    Actions: {
      title: 'Actions',
      closeHandler: closeResultDrilldown,
      component: (<ActionDrawer actionGrouping={findFirstTabOrFalse(tabs, 'Actions')} />)
    }
  }

  const handleClose = (e, closeTabCallback) => {
    e.stopPropagation();
    closeTabCallback();
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
        open={isOpen}
        onOpen={() => { }}
        onClose={closeAll}
        BackdropProps={{ invisible: true }}
        variant={'persistent'}
        classes={{ paper: 'drawer-container' }}
      >
        {
          <div className="flex-direction-column">
            <div className="header-space"></div>
            <Tabs selectedIndex={selectedTabIndex} onSelect={index => changeTabIndex(index)} forceRenderTabPanel>
              <TabList>
                {tabs && tabs.map(tab => (<Tab key={tab.name}>
                  {tabOptions[tab.name].title}
                  <IconButton
                    className="drawer-icon-button"
                    onClick={(e) => handleClose(e, tabOptions[tab.name].closeHandler)}
                  >
                    <Close className="drawer-close"></Close>
                  </IconButton>
                </Tab>))}
              </TabList>
              {tabs && tabs.map(tab => (<TabPanel key={tab.name}>
                {tabOptions[tab.name].component}
              </TabPanel>))}
            </Tabs>
          </div>
        }
      </SwipeableDrawer>
    </div>
  );
}

export default connect(mapRightPanelStateToProps, mapDispatchToProps)(RightPanelDrawer);

/* istanbul ignore next */
RightPanelDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  tabs: PropTypes.array.isRequired,
  selectedTabIndex: PropTypes.number.isRequired,
  closeAssetTreeview: PropTypes.func.isRequired,
  closeScheduleDrilldown: PropTypes.func.isRequired,
  closeResultDrilldown: PropTypes.func.isRequired,
  closeAll: PropTypes.func.isRequired,
  changeTabIndex: PropTypes.func.isRequired,
};