import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Notifications from "react-notifications-menu";
import Adapter from 'enzyme-adapter-react-16';
import NotificationBell from '../NotificationBell';

Enzyme.configure({ adapter: new Adapter() });

describe('NotificationBell component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);


    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<NotificationBell />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds it in the component tree', () => {
        const output = shallow(<NotificationBell />);
        expect(output).toHaveLength(1);
    });

    it('It finds the notifications element', () => {
        const output = shallow(<NotificationBell />);
        let component = output.find(Notifications);
        expect(component).toHaveLength(1);
    });
});