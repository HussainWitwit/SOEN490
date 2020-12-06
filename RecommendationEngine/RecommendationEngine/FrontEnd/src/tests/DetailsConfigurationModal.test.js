import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DetailsConfigurationModal from '../containers/DetailsConfigurationModal/DetailsConfigurationModal';
import { store } from '../configure-store';
import MultiSelectAutocomplete from '../components/MultiSelectAutocomplete/MultiSelectAutocomplete';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { fireEvent, render, getAllByTestId } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

describe('DetailsConfigurationModal component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const wrapper = shallow(<DetailsConfigurationModal store={store} />).dive().dive();
    const component = shallow(<DetailsConfigurationModal store={store} />).dive().dive().dive()

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<DetailsConfigurationModal store={store} />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('Finds the divs', () => {
        let divs = wrapper.find('div');
        expect(divs).toHaveLength(10);
    });

    it('Finds the subtitle', () => {
        let p = wrapper.find('p');
        expect(p).toHaveLength(7);
    });

    it('Finds the form', () => {
        let form = wrapper.find(FormControlLabel);
        expect(form).toHaveLength(2);
    });

    it('Finds the multiselect', () => {
        let multiselect = wrapper.find(MultiSelectAutocomplete);
        expect(multiselect).toHaveLength(1);
    });

    it('Finds the radio buttons', () => {
        let radioButtons = component.find(RadioGroup);
        expect(radioButtons).toHaveLength(1);
    });

    it('Finds the text', () => {
        let text = component.find(TextField);
        expect(text).toHaveLength(1);
    });

    describe('Test clicks', () => {
        it("Simulates clicks on different options", () => {
            const { container } = render(<DetailsConfigurationModal store={store} />);

            const buttonRon = getAllByTestId(container, 'option-ron');
            const buttonNetSaving = getAllByTestId(container, 'option-net');
            const granularity = getAllByTestId(container, 'granularity');
            const granularityOption = getAllByTestId(container, 'granularity-option');
            const granularityOptionDate = getAllByTestId(container, 'date');
            const day = getAllByTestId(container, 'title');

            fireEvent.click(buttonRon[0]); // return on investment
            fireEvent.click(buttonNetSaving[0]); // net saving
            fireEvent.click(granularity[0]); // granularity dropdown
            fireEvent.click(granularityOption[0]); // daily
            fireEvent.click(granularityOption[1]); // weekly 
            fireEvent.click(granularityOptionDate[0]);
            fireEvent.click(granularityOption[2]); // monthly 
            fireEvent.click(granularityOption[3]); // yearly
            fireEvent.click(day[0]); // day
        });
    })

});
