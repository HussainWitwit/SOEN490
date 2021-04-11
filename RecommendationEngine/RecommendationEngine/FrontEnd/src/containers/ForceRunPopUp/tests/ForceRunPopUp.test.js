import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { store } from '../../../redux/store';
import { ForceRunPopUp } from '../ForceRunPopUp'

Enzyme.configure({ adapter: new Adapter() });

describe('ForceRunPopUp component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<ForceRunPopUp store={store} />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });
});