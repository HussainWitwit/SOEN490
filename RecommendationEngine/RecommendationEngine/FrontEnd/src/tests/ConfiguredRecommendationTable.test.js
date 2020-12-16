import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConfiguredRecommendationTable from '../components/ConfiguredRecommendationTable/ConfiguredRecommendationTable';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { EnhancedTableHead } from '../components/RecommendationTableHeader/RecommendationTableHeader';
import { store } from '../redux/store';

Enzyme.configure({ adapter: new Adapter() });

describe.only('ConfiguredRecommendationTable component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const output = shallow(<ConfiguredRecommendationTable store={store} />).dive();

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<ConfiguredRecommendationTable store={store} />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the table in the component tree', () => {
        expect(output).toHaveLength(1);
    });

    it('It finds the paper component', () => {
        let paper = output.find(Paper);
        expect(paper).toHaveLength(1);
    });

    it('It finds the toolbar', () => {
        let toolbar = output.find(Toolbar);
        expect(toolbar).toHaveLength(1);
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

    it("Finds the table labels", () => {
        let component = output.find(FormControlLabel);
        expect(component).toHaveLength(1);
    });

    it('It finds the subtitle', () => {
        let subtitle = output.find('h6');
        expect(subtitle).toHaveLength(1);
    });

    it('It finds the table pagination', () => {
        let pagination = output.find(TablePagination);
        expect(pagination).toHaveLength(1);
    });
});