import React from 'react';
import ReactDOM from 'react-dom';
import ManageRecommendationTable from '../components/TableComponent/ManageRecommendationTable';
import Enzyme, { shallow } from '../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EnhancedTableHead } from '../components/TableComponent/ManageRecommendationTable';
import { CssTextField } from '../components/TableComponent/ManageRecommendationTable';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';

Enzyme.configure({ adapter: new Adapter() });

describe('ManageRecommendationTable component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);


    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<ManageRecommendationTable />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the table in the component tree', () => {
        const output = shallow(<ManageRecommendationTable />);
        expect(output).toHaveLength(1);
    });

    it('It finds the table head', () => {
        const output = shallow(<EnhancedTableHead />);
        let component = output.find(TableHead);
        expect(component).toHaveLength(1);
    });

    it('It finds a table row', () => {
        const output = shallow(<EnhancedTableHead />);
        let component = output.find(TableRow);
        expect(component).toHaveLength(1);
    });

    it('It finds all table cells', () => {
        const output = shallow(<EnhancedTableHead />);
        let component = output.find(TableCell);
        expect(component).toHaveLength(5);
    });

    it("Finds the table labels", () => {
        const output = shallow(<EnhancedTableHead />);
        let component = output.find(TableSortLabel);
        expect(component).toHaveLength(4);
    })

    it('It finds the grids', () => {
        const output = shallow(<ManageRecommendationTable />);
        let component = output.find(Grid);
        expect(component).toHaveLength(7);
    });

    it('It finds the 2 buttons', () => {
        const output = shallow(<ManageRecommendationTable />);
        let button = output.find(Button);
        expect(button).toHaveLength(2);
    });

    it('It finds the title', () => {
        const output = shallow(<ManageRecommendationTable />);
        let title = output.find('h3');
        expect(title).toHaveLength(1);
    });

    it('It finds the subtitles', () => {
        const output = shallow(<ManageRecommendationTable />);
        let subtitle = output.find('h6');
        expect(subtitle).toHaveLength(2);
    });

    it('It finds the searchbar', () => {
        const output = shallow(<ManageRecommendationTable />);
        let searchbar = output.find(CssTextField);
        expect(searchbar).toHaveLength(1);
    });

    it('It finds the paper component', () => {
        const output = shallow(<ManageRecommendationTable />);
        let paper = output.find(Paper);
        expect(paper).toHaveLength(1);
    });

    it('It finds the toolbar', () => {
        const output = shallow(<ManageRecommendationTable />);
        let toolbar = output.find(Toolbar);
        expect(toolbar).toHaveLength(1);
    });

    it('It finds the table container', () => {
        const output = shallow(<ManageRecommendationTable />);
        let container = output.find(TableContainer);
        expect(container).toHaveLength(1);
    });

    it('It finds the table', () => {
        const output = shallow(<ManageRecommendationTable />);
        let table = output.find(Table);
        expect(table).toHaveLength(1);
    });

    it('It finds the table body', () => {
        const output = shallow(<ManageRecommendationTable />);
        let table = output.find(TableBody);
        expect(table).toHaveLength(1);
    });

    it('It finds the table pagination', () => {
        const output = shallow(<ManageRecommendationTable />);
        let pagination = output.find(TablePagination);
        expect(pagination).toHaveLength(1);
    });
});