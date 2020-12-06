import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConfirmationModal from '../containers/ConfirmationModal/ConfirmationModal';
import TextField from '@material-ui/core/TextField';
import { store } from '../configure-store';
import MultiSelectAutocomplete from '../components/MultiSelectAutocomplete/MultiSelectAutocomplete';

Enzyme.configure({ adapter: new Adapter() });

describe('ConfirmationModal component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const wrapper = shallow(<ConfirmationModal store={store} />).dive().dive();

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<ConfirmationModal store={store} />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the divs in the component', () => {
        let divs = wrapper.find('div');
        expect(divs).toHaveLength(3);
    });

    it('It finds the textfield', () => {
        let text = wrapper.find(TextField);
        expect(text).toHaveLength(4);
    });

    it('It finds the MultiSelectAutocomplete', () => {
        let select = wrapper.find(MultiSelectAutocomplete);
        expect(select).toHaveLength(2);
    });
});