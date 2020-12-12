import React from 'react';
import ReactDOM from 'react-dom';
import { RightPanelDrawer } from '../containers/RightPanel/RightPanelDrawer.jsx';
import Enzyme, { mount } from '../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AssetTree } from '../containers/AssetTreeView/AssetTreeView';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
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

    it('It finds the asset tree', () => {
        let component = wrapper.find(AssetTree);
        expect(component).toHaveLength(1);
    });

    it('It finds the icon button', () => {
        let iconButton = wrapper.find(IconButton);
        expect(iconButton).toHaveLength(4);
    });

    it('Finds the icon', () => {
        let icon = wrapper.find(Icon);
        expect(icon).toHaveLength(1);
    });

    it('It finds the close button', () => {
        let close = wrapper.find(Icon);
        expect(close).toHaveLength(1);
    });
});