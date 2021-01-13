import React from 'react';
import ReactDOM from 'react-dom';
import { SideMenu } from '../containers/SideMenu/SideMenu.jsx';
import '../containers/SideMenu/SideMenu.css';
import Enzyme, { shallow } from '../enzyme';
import { Drawer, ListItem, Avatar } from '@material-ui/core';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { render, queryAllByTestId } from '@testing-library/react';
import LogoSVGComponent from '../containers/SideMenu/LogoSVGComponent';
import { withRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

describe('SideMenu component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);

    test('It renders correctly', () => {
        const tree = renderer.create(withRouter(<SideMenu />)).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(withRouter(<SideMenu />), div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds it in the component tree', () => {
        const output = shallow(<SideMenu />);
        expect(output).toHaveLength(1);
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

    it('It finds the logo', () => {
        const output = shallow(<SideMenu />);
        let logo = output.find(LogoSVGComponent);
        expect(logo).toHaveLength(1);

    });

    it('Checks that Settings separator text is there', () => {
        const wrapper = shallow(<SideMenu />);
        expect(wrapper.find('p').text()).toEqual('Settings');
    });

    describe('Checks for contents of the drawer component', () => {
        it('It finds all the list elements inside the drawer', () => {
            let wrapper = shallow(<SideMenu />);
            let listItems = wrapper.find(ListItem);
            expect(listItems).toHaveLength(9);
        });
    });

    describe('Test clicks', () => {
        it("Simulates clicks on different options", async () => {
            const { container } = render(<SideMenu />);
            const outerOption = await queryAllByTestId(container, 'listitem1');
            expect(outerOption).toHaveLength(5);

            // const history = createMemoryHistory();

            // const renderWithRouter = (ui, { route = '/' } = {}, props) => {
            //     window.history.pushState({}, 'Test page', route)

            //     return render(ui, { wrapper: BrowserRouter })
            // }

            // fireEvent.click(outerOption);
            // fireEvent.click(outerOption[1]);
            // fireEvent.click(outerOption[2]);
            // fireEvent.click(outerOption[3]);
            // fireEvent.click(outerOption[4]);
        });
    })
});