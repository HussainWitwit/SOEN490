import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConfirmationModal from '../ConfirmationModal';
import TextField from '@material-ui/core/TextField';
import MultiSelectAutocomplete from '../../../common/MultiSelectAutocomplete/MultiSelectAutocomplete';
import { store } from '../../../redux/store';

Enzyme.configure({ adapter: new Adapter() });

describe('ConfirmationModal component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const wrapperYearly = shallow(<ConfirmationModal store={store} dialogsContent={{ basicConfiguration: { repeatDate: "Yearly" } }} />).dive().dive();
    const wrapperMonthly = shallow(<ConfirmationModal store={store} dialogsContent={{ basicConfiguration: { repeatDate: "Monthly" } }} />).dive().dive();
    const wrapperWeekly = shallow(<ConfirmationModal store={store} dialogsContent={{ basicConfiguration: { repeatDate: "Weekly" } }} />).dive().dive();

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<ConfirmationModal store={store} />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the divs in the component', () => {
        let divs = wrapperYearly.find('div');
        expect(divs).toHaveLength(3);
    });

    it('It finds the textfield with yearly recurrence', () => {
        let text = wrapperYearly.find(TextField);
        expect(text).toHaveLength(4);
    });

    it('It finds the textfield with monthly recurrence', () => {
        let text = wrapperMonthly.find(TextField);
        expect(text).toHaveLength(4);
    });

    it('It finds the textfield with weekly recurrence', () => {
        let text = wrapperWeekly.find(TextField);
        expect(text).toHaveLength(4);
    });

    it('It finds the MultiSelectAutocomplete', () => {
        let select = wrapperYearly.find(MultiSelectAutocomplete);
        expect(select).toHaveLength(2);
    });
});