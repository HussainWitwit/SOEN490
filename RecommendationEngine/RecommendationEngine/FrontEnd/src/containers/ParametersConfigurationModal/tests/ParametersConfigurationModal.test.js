import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ParametersConfigurationModal, ParamTextField } from '../ParametersConfigurationModal';
import{ Table, TextField, TableBody, TableHead, TableRow }from '@material-ui/core';
import {isCorrectType} from '../../../utilities/GeneralUtilities';
import { fireEvent, render, getAllByTestId } from '@testing-library/react';
import { store } from '../../../redux/store';

Enzyme.configure({ adapter: new Adapter() });

describe('ParametersConfigurationModal component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    let params = [
        { parameterName: '', defaultValue: null, parameterValue: null, displayText: null, parameterType: 'POSITIVE_INT_1' },
        { parameterName: '', defaultValue: null, parameterValue: null, displayText: null, parameterType: 'NEGATIVE_FLOAT_-0.02' },
        { parameterName: 'StartSoilingSeason', defaultValue: null, parameterValue: null, displayText: null, parameterType: 'DATE'  },
        { parameterName: '', defaultValue: null, parameterValue: null, displayText: null, parameterType: 'DATE' }
    ];
    useStateSpy.mockImplementation((init) => [init, setState]);
    const wrapper = shallow(<ParametersConfigurationModal store={store}
        parameterList={params}
        setParamValue={(value) => { }}
    />);

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(wrapper, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('Finds the divs', () => {
        let divs = wrapper.find('div');
        expect(divs).toHaveLength(2);
    });

    it('Finds the table', () => {
        let table = wrapper.find(Table);
        expect(table).toHaveLength(1);
    });

    it('Finds the table head ', () => {
        let tableHead = wrapper.find(TableHead);
        expect(tableHead).toHaveLength(1);
    });

    it('Finds the table rows ', () => {
        let tableRow = wrapper.find(TableRow);
        expect(tableRow).toHaveLength(5);
    });

    it('Finds the table body ', () => {
        let tableBody = wrapper.find(TableBody);
        expect(tableBody).toHaveLength(1);
    });

    it('Verify if correct type', () => {
        expect(isCorrectType('INT','1')).toBe(true);
    });

    it('Verify if incorrect type', () => {
        expect(isCorrectType('INT','1.34')).toBe(false);
    });

    it('Verify if correct typefloat', () => {
        expect(isCorrectType('FLOAT','1.34')).toBe(true);
    });

    it('Verify date range', () => {
        expect(isCorrectType(params[2])).toBe(false);
    });

    it('Verifying correct implementation of paramtextfield ', () => {
        let textFieldComponent = shallow(<ParamTextField paramObject = {params[0]} index={0} onChangeEvent = {()=>{}}/>)
        let tableRow = textFieldComponent.find(TextField);
        expect(tableRow).toHaveLength(1);
    });
});
