import React from 'react';
import ReactDOM from 'react-dom';
import RightPanelDrawer from '../containers/RightPanel/RightPanelDrawer.jsx';
import Enzyme, { shallow } from '../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { AssetTree } from '../components/AssetTreeView/AssetTreeView';

Enzyme.configure({ adapter: new Adapter() });

describe('RightPanel component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);


    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<RightPanelDrawer />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the main div', () => {
        const output = shallow(<RightPanelDrawer />);
        expect(output.find('#main-container')).toBeTruthy();
    });

    it('It finds the swipeable drawer component', () => {
        const output = shallow(<RightPanelDrawer />);
        let component = output.find(SwipeableDrawer);
        expect(component).toHaveLength(1);
    });

    it('It finds the asset tree', () => {
        const output = shallow(<RightPanelDrawer />);
        let component = output.find(AssetTree);
        expect(component).toHaveLength(1);
    });

    it('It finds the icon button', () => {
        const output = shallow(<RightPanelDrawer />);
        expect(output.find('#icon-button')).toBeTruthy();
    });

    it('It finds the close button', () => {
        const output = shallow(<RightPanelDrawer />);
        expect(output.find('#close')).toBeTruthy();
    });
});