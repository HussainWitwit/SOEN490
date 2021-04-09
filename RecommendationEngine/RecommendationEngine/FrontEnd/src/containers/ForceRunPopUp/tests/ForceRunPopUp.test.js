import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { store } from '../../../redux/store';
import { ForceRunPopUp } from '../ForceRunPopUp'

Enzyme.configure({ adapter: new Adapter() });

describe('ForceRunPopUp component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const output = shallow(<ForceRunPopUp store={store} title={''} handleForceRunPopUpOpen={jest.fn} open={jest.fn} recommendationId={1} closeScheduleDrilldown={jest.fn} updateScheduleDrilldown={jest.fn} />);

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<ForceRunPopUp store={store} />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

});