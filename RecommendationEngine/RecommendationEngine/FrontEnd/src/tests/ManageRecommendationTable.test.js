import React from 'react';
import ReactDOM from 'react-dom';
import ManageRecommendationTable from '../components/TableComponent/ManageRecommendationTable';
import Enzyme, { shallow } from '../enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { EnhancedTableHead } from '../components/TableComponent/ManageRecommendationTable';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';


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

    it('It finds the main div', () => {
        const output = shallow(<ManageRecommendationTable />);
        expect(output.find('#main-container')).toBeTruthy();
    });

    it('It finds the table head', () => {
        const output = shallow(<EnhancedTableHead />);
        let component = output.find(TableHead);
        expect(component).toHaveLength(1);
        expect(output.find('#table-head')).toBeTruthy();
    });

    it('It finds a table row', () => {
        const output = shallow(<EnhancedTableHead />);
        let component = output.find(TableRow);
        expect(component).toHaveLength(1);
        expect(output.find('#table-row')).toBeTruthy();
    });

    it('It finds all table cells', () => {
        const output = shallow(<EnhancedTableHead />);
        let component = output.find(TableCell);
        expect(component).toHaveLength(8);
        expect(output.find('#table-cell')).toBeTruthy();
    });

    it("Finds the table labels", () => {
        const output = shallow(<EnhancedTableHead />);
        let component = output.find(TableSortLabel);
        expect(component).toHaveLength(7);
        expect(output.find('#sort-label')).toBeTruthy();
    })

    it('It finds the grid container', () => {
        const output = shallow(<ManageRecommendationTable />);
        expect(output.find('#grid-container1')).toBeTruthy();
    });

    it('It finds the grid', () => {
        const output = shallow(<ManageRecommendationTable />);
        expect(output.find('#grid1')).toBeTruthy();
    });

    it('It finds the title', () => {
        const output = shallow(<ManageRecommendationTable />);
        expect(output.find('#title')).toBeTruthy();
    });

    it('It finds the subtitle', () => {
        const output = shallow(<ManageRecommendationTable />);
        expect(output.find('#subtitle')).toBeTruthy();
    });

    it('It finds the create recommendation button', () => {
        const output = shallow(<ManageRecommendationTable />);
        expect(output.find('#recBtn')).toBeTruthy();
    });

    it('It finds the grid container', () => {
        const output = shallow(<ManageRecommendationTable />);
        expect(output.find('#grid-container2')).toBeTruthy();
    });

    it('It finds the grid', () => {
        const output = shallow(<ManageRecommendationTable />);
        expect(output.find('#grid2')).toBeTruthy();
    });

    it('It finds the searchbar', () => {
        const output = shallow(<ManageRecommendationTable />);
        expect(output.find('#search')).toBeTruthy();
    });

    it('It finds the textfield', () => {
        const output = shallow(<ManageRecommendationTable />);
        expect(output.find('#custom-css-standard-input')).toBeTruthy();
    });

    it('It finds the root', () => {
        const output = shallow(<ManageRecommendationTable />);
        expect(output.find('#root')).toBeTruthy();
    });

    it('It finds the paper component', () => {
        const output = shallow(<ManageRecommendationTable />);
        expect(output.find('#paper')).toBeTruthy();
    });

    it('It finds the toolbar', () => {
        const output = shallow(<ManageRecommendationTable />);
        expect(output.find('#toolbar')).toBeTruthy();
    });

    it('It finds the table', () => {
        const output = shallow(<ManageRecommendationTable />);
        expect(output.find('#table')).toBeTruthy();
    });

    it('It finds the table body', () => {
        const output = shallow(<ManageRecommendationTable />);
        expect(output.find('#table-body')).toBeTruthy();
    });

    it('It finds the table pagination', () => {
        const output = shallow(<ManageRecommendationTable />);
        expect(output.find('#pagination')).toBeTruthy();
    });
});