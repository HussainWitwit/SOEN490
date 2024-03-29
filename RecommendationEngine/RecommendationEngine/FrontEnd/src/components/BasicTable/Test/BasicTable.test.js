import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import  BasicTable, {sortingComparison, tableSort, getSortingComparison} from '../BasicTable';
import { EnhancedTableHead } from '../../BasicTableHeader/BasicTableHeader';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';

Enzyme.configure({ adapter: new Adapter() });

describe('BasicTable component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const output = shallow(<BasicTable />);
    const mockedEvent = { target: {} }

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<BasicTable />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the table in the component tree', () => {
        expect(output).toHaveLength(1);
    });

    it('It finds the paper component', () => {
        let paper = output.find(Paper);
        expect(paper).toHaveLength(1);
    });


    it('It finds the table container', () => {
        let container = output.find(TableContainer);
        expect(container).toHaveLength(1);
    });

    it('It finds the table', () => {
        let table = output.find(Table);
        expect(table).toHaveLength(1);
    });

    it('It finds the table body', () => {
        let table = output.find(TableBody);
        expect(table).toHaveLength(1);
    });

    it('It finds the table head', () => {
        let component = output.find(EnhancedTableHead);
        expect(component).toHaveLength(1);
    });

    it('It finds the table pagination and tests the onChangePage and onChangeRowsPerPage events', () => {
        let pagination = output.find(TablePagination);
        pagination.props().onChangePage();
        pagination.props().onChangeRowsPerPage(mockedEvent);
        expect(pagination).toHaveLength(1);
    });

    it('Simulate handleSort event', () => {
        output.find('#handleSort').props().handleSortingChange();
    });
    
});

describe('Testing the ascending/descending order of a function', () => {
     it('order if equal', () => {
        const obj1 = {name:"ab"};
        const obj2 = {name:"ab"};
        const sortResult = sortingComparison(obj1,obj2, 'name');
        expect(sortResult).toEqual(0);
    });

    it('order by ascending', () => {
        const obj1 = {name:"ab"};
        const obj2 = {name:"xy"};
        const sortResult = sortingComparison(obj1, obj2, 'name');
        expect(sortResult).toEqual(1);
    });

    it('order by descending ', () => {
        const obj1 = {name:"xy"};
        const obj2 = {name:"ab"};
        const sortResult = sortingComparison(obj1,obj2,'name');
        expect(sortResult).toEqual(-1);
    });

    it('table ascending sorting', ()=> {
        const originalArr = [{name:"ab"},{name:"cd"},{name:"xy"}];
        const expectedArr = [{name:"xy"},{name:"cd"},{name:"ab"}];
        
        const sortResult = tableSort(originalArr,getSortingComparison('desc', 'name'));
        expect(sortResult).toEqual(expectedArr);
    });

    it('table equal sorting', ()=> {
        const originalArr = [{name:"ab", type:"monthly"},{name:"ab", type:"yearly"},{name:"xy", type:"yearly"}];
        const expectedArr = [{name:"xy", type:"yearly"},{name:"ab", type:"monthly"},{name:"ab", type:"yearly"}];
        
        const sortResult = tableSort(originalArr,getSortingComparison('desc', 'name'));
        expect(sortResult).toEqual(expectedArr);
    });

})
