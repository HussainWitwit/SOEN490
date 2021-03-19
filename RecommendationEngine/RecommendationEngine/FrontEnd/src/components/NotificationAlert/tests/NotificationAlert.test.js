import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NotificationAlert from '../NotificationAlert';
import { ToastContainer } from 'react-toastify';

Enzyme.configure({ adapter: new Adapter() });

describe('NotificationAlert component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);


    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<NotificationAlert />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the toast container tree', () => {
        const output = shallow(<ToastContainer />);
        expect(output).toHaveLength(1);
    });
});