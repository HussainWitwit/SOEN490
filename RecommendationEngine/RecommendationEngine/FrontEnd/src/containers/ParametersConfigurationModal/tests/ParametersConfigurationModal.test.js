import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ParametersConfigurationModal } from '../ParametersConfigurationModal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { fireEvent, render, getAllByTestId } from '@testing-library/react';
import { store } from '../../../redux/store';

Enzyme.configure({ adapter: new Adapter() });

describe('ParametersConfigurationModal component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const wrapper = shallow(<ParametersConfigurationModal store={store}
        // parameterList={
        //     { parameterName: '', defaultValue: null, parameterValue: null },
        //     { parameterName: '', defaultValue: null, parameterValue: null },
        //     { parameterName: '', defaultValue: null, parameterValue: null },
        //     { parameterName: '', defaultValue: null, parameterValue: null }
        // }
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
        expect(tableRow).toHaveLength(1);
    });

    it('Finds the table body ', () => {
        let tableBody = wrapper.find(TableBody);
        expect(tableBody).toHaveLength(1);
    });
});
