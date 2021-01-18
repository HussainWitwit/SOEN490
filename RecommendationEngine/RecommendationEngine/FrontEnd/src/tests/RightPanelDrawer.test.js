import React from 'react';
import ReactDOM from 'react-dom';
import { RightPanelDrawer } from '../containers/RightPanel/RightPanelDrawer.jsx';
import Enzyme, { mount } from '../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import IconButton from '@material-ui/core/IconButton';
import { Provider } from 'react-redux';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { store } from '../redux/store';

Enzyme.configure({ adapter: new Adapter() });

describe('RightPanel component', () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  let wrapper;

  let mockTabs = [{
      name: "AssetTreeview"
  }];

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <RightPanelDrawer tabs={mockTabs} changeTabIndex={(id)=> void 0} closeAssetTreeview={()=> void 0} isOpen={true} closeAll={()=> void 0} />
      </Provider>
    );
  });

  it('It renders without crashing', async () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <RightPanelDrawer tabs={mockTabs} changeTabIndex={(id)=> void 0} closeAssetTreeview={()=> void 0} isOpen={true} closeAll={()=> void 0} />
      </Provider>,
      div
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  it('It finds it in the component tree main div', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('It finds the swipeable drawer component', () => {
    let component = wrapper.find(SwipeableDrawer);
    expect(component).toHaveLength(1);
  });

  it('It finds the tab', () => {
    let component = wrapper.find(Tabs);
    expect(component).toHaveLength(1);
  });

  it('It finds the tabs titles', () => {
    let component = wrapper.find(TabList);
    expect(component).toHaveLength(1);
  });

  it('It finds the asset treeview tab', () => {
    let component = wrapper.find(Tab);
    expect(component).toHaveLength(1);
  });

  it('It finds the assets and close icons', () => {
    let component = wrapper.find(IconButton);
    expect(component).toHaveLength(3);
  });

  it('It finds the assets and close icons', () => {
    let component = wrapper.find(TabPanel);
    expect(component).toHaveLength(1);
  });

  it('It finds the assets treeview', () => {
    let component = wrapper.find(TabPanel);
    expect(component).toHaveLength(1);
  });

  it('It finds the close icon and presses it', () => {
    wrapper.find('.drawer-icon-button').first().childAt(0).simulate('click');
  });

});
