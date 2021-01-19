import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import AssetTree from '../AssetTreeView/AssetTreeView';
import ManageRecommendationDrawer from '../../components/ManageRecommendationDrawer/ManageRecommendationDrawer';
import { mapRightPanelStateToProps, mapDispatchToProps } from '../../redux/RightPanelReducer/reducer-actions'
import { connect } from 'react-redux';
import './RightPanelDrawer.css';

export function RightPanelDrawer ({
  isOpen,
  tabs,
  selectedTabIndex,
  closeAssetTreeview,
  closeScheduleDrilldown,
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
      component: (<ManageRecommendationDrawer configuredRecommendation={tabs && tabs[selectedTabIndex] && tabs[selectedTabIndex].response} />)
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
          </div>
        }
      </SwipeableDrawer>
    </div>
  );
}
export default connect(mapRightPanelStateToProps, mapDispatchToProps)(RightPanelDrawer)