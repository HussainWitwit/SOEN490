import React from 'react';
import ReactDOM from 'react-dom';
import { RightPanelDrawer } from '../containers/RightPanel/RightPanelDrawer.jsx';
import Enzyme, { mount } from '../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Tabs, TabList } from 'react-tabs';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

Enzyme.configure({ adapter: new Adapter() });

describe('RightPanel component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);

    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Provider store={store}><RightPanelDrawer /></Provider>);
    })

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><RightPanelDrawer /></Provider>, div);
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
});