import React from 'react';
import ReactDOM from 'react-dom';
import SideMenu from '../components/SideMenu/SideMenu.js';
import '../components/SideMenu/SideMenu.css';
import Enzyme, { shallow } from '../enzyme';
import { Drawer, ListItem, Avatar } from '@material-ui/core';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('SideMenu component', () => {
    let component;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);

    test('It renders correctly', () => {
        const tree = renderer.create(<SideMenu />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<SideMenu />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the main div', () => {
        const output = shallow(<SideMenu />);
        expect(output.find('#main-container')).toBeTruthy();
    });

    it('It finds the drawer element', () => {
        const output = shallow(<SideMenu />);
        let drawer = output.find(Drawer);
        expect(drawer).toHaveLength(1);
        expect(output.find('#drawer')).toBeTruthy();
    });

    it('It finds the avatar container', () => {
        const output = shallow(<SideMenu />);
        let drawer = output.find(Avatar);
        expect(drawer).toHaveLength(1);
        expect(output.find('#drawer')).toBeTruthy();
    });

    it('It opens nested items', () => {
        const onButtonClickMock = jest.fn();
        const wrapper = shallow(
            <SideMenu handleClick={onButtonClickMock} />
        );
        wrapper.find('#recommendations')
            .dive()
            // .find('.main-titles')
            // .simulate('click');
            .invoke('onClick');

        expect(onButtonClickMock).toHaveBeenCalledTimes(0); // step 3
    });

    it('Checks that Settings separator text is there', () => {
        const wrapper = shallow(<SideMenu />);
        expect(wrapper.find('p').text()).toEqual('Settings');
    });

    describe('Checks for contents of the drawer component', () => {
        it('It finds all the list elements inside the drawer', () => {
            let wrapper = shallow(<SideMenu />);
            let listItems = wrapper.find(ListItem);
            expect(listItems).toHaveLength(10);

            listItems.filter('#dashboard').simulate('click');
            expect(wrapper.find(ListItem)).toHaveLength(10);

            listItems.filter('#recommendations').simulate('click');
            expect(wrapper.find(ListItem)).toHaveLength(10);

            listItems.filter('#manage').simulate('click');
            expect(wrapper.find(ListItem)).toHaveLength(10);

            listItems.filter('#results').simulate('click');
            expect(wrapper.find(ListItem)).toHaveLength(10);

            listItems.filter('#jobs').simulate('click');
            expect(wrapper.find(ListItem)).toHaveLength(10);

            listItems.filter('#actions').simulate('click');
            expect(wrapper.find(ListItem)).toHaveLength(10);

            listItems.filter('#work-orders').simulate('click');
            expect(wrapper.find(ListItem)).toHaveLength(10);

            listItems.filter('#main-settings').simulate('click');
            expect(wrapper.find(ListItem)).toHaveLength(10);

            listItems.filter('#notifications').simulate('click');
            expect(wrapper.find(ListItem)).toHaveLength(10);
        });
    });
});