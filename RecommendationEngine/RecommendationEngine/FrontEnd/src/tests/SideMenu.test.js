import React from 'react';
import ReactDOM from 'react-dom';
import SideMenu from '../components/SideMenu/SideMenu.jsx';
import '../components/SideMenu/SideMenu.css';
import Enzyme, { shallow } from '../enzyme';
import { Drawer, ListItem, Avatar } from '@material-ui/core';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { fireEvent, render, getAllByTestId } from '@testing-library/react';


Enzyme.configure({ adapter: new Adapter() });

describe('SideMenu component', () => {
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

    it('It finds the nested items', () => {
        const output = shallow(<SideMenu />);
        expect(output.find('#nested')).toBeTruthy();
    });

    it('It finds the drawer element', () => {
        const output = shallow(<SideMenu />);
        let drawer = output.find(Drawer);
        expect(drawer).toHaveLength(1);
    });

    it('It finds the avatar container', () => {
        const output = shallow(<SideMenu />);
        let avatar = output.find(Avatar);
        expect(avatar).toHaveLength(1);

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
        });
    });

    describe('Test clicks', () => {
        it("Simulates clicks on different options", () => {
            const { container } = render(<SideMenu />);

            const outerOption = getAllByTestId(container, 'listitem1');

            fireEvent.click(outerOption[0]);
            fireEvent.click(outerOption[1]);
            fireEvent.click(outerOption[2]);
            fireEvent.click(outerOption[3]);
            fireEvent.click(outerOption[4]);
        });
    })
});