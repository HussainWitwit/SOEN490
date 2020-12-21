import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ParametersConfigurationModal } from '../containers/ParametersConfigurationModal/ParametersConfigurationModal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { fireEvent, render, getAllByTestId } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

describe('ParametersConfigurationModal component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const wrapper = shallow(<ParametersConfigurationModal
        parameterConfiguration={{
            centerPointIncrement: null,
            spanIncrement: null,
            accelerator: null,
            soilingSeasonBuffer: null
        }}
        setCenterPointIncrement={(value) => { }}
        setSpanIncrement={(value) => { }}
        setAccelerator={(value) => { }}
        setSoilingSeasonBuffer={(value) => { }}
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

    it('Finds the table cells ', () => {
        let tableCell = wrapper.find(TableCell);
        expect(tableCell).toHaveLength(10);
    });

    it('Finds the table body ', () => {
        let tableBody = wrapper.find(TableBody);
        expect(tableBody).toHaveLength(1);
    });

    it('Finds the text field ', () => {
        let textField = wrapper.find(TextField);
        expect(textField).toHaveLength(4);
    });

    describe('Test clicks', () => {
        it("Simulates clicks on the textfields", () => {
            const { container } = render(wrapper);
            console.log(container);
            const parameter = getAllByTestId(container, 'parameter-value');
            fireEvent.click(parameter[0]); // parameter value
        });
    });
});
