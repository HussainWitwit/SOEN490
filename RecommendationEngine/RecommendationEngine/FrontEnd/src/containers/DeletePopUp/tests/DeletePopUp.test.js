import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { store } from '../../../redux/store';
import { DeletePopUp } from '../DeletePopUp'

Enzyme.configure({ adapter: new Adapter() });

describe('DeletePopUp component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const output = shallow(<DeletePopUp store={store} title={''} handleDeletePopUpOpen={jest.fn} open={jest.fn} recommendationId={1} closeScheduleDrilldown={jest.fn} />);

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<DeletePopUp store={store} />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });
});