import React from 'react';
import ReactDOM from 'react-dom';
import TopBar from '../components/TopBar/TopBar.js';
import NotificationBell from '../components/Notification/NotificationBell.js';
import Enzyme, { shallow } from '../enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('TopBar component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);


    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<TopBar />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the main div', () => {
        const output = shallow(<TopBar />);
        expect(output.find('#main-container')).toBeTruthy();
    });

    it('It finds the breadcrumb element', () => {
        const output = shallow(<TopBar />);
        expect(output.find('#breadcrumb')).toBeTruthy();
    });

    it('It finds the weather div', () => {
        const output = shallow(<TopBar />);
        expect(output.find('#weather-div')).toBeTruthy();
    });

    it('It finds the img element', () => {
        const output = shallow(<TopBar />);
        expect(output.find('#img')).toBeTruthy();
    });

    it('It finds the change button element', () => {
        const output = shallow(<TopBar />);
        expect(output.find('#change_button')).toBeTruthy();
    });

    it('It finds the img element', () => {
        const output = shallow(<TopBar />);
        expect(output.find('#img')).toBeTruthy();
    });

    it('It finds the NotificationBell element', () => {
        const output = shallow(<TopBar />);
        let component = output.find(NotificationBell);
        expect(component).toHaveLength(1);
        expect(output.find('#notification-bell')).toBeTruthy();
    });
});