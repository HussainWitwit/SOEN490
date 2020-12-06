import React from 'react';
import ReactDOM from 'react-dom';
import RightPanelDrawer from '../containers/RightPanel/RightPanelDrawer.jsx';
import Enzyme, { shallow } from '../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { AssetTree } from '../components/AssetTreeView/AssetTreeView';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';

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

    it('It finds it in the component tree main div', () => {
        const output = shallow(<RightPanelDrawer />);
        expect(output).toHaveLength(1);
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
        let iconButton = output.find(IconButton);
        expect(iconButton).toHaveLength(2);
    });

    it('Finds the icon', () => {
        const output = shallow(<RightPanelDrawer />);
        let icon = output.find(Icon);
        expect(icon).toHaveLength(1);
    });

    it('It finds the close button', () => {
        const output = shallow(<RightPanelDrawer />);
        let close = output.find(Icon);
        expect(close).toHaveLength(1);
    });
});