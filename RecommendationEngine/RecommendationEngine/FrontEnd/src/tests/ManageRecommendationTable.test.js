import React from 'react';
import ReactDOM from 'react-dom';
import ManageRecommendationPage from '../containers/ManageRecommendationPage/ManageRecommendationPage';
import Enzyme, { shallow } from '../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EnhancedTableHead } from '../containers/ManageRecommendationPage/ManageRecommendationPage';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';


Enzyme.configure({ adapter: new Adapter() });

describe('ManageRecommendationPage component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);


    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<ManageRecommendationPage />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the main div', () => {
        const output = shallow(<ManageRecommendationPage />);
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
        expect(component).toHaveLength(5);
        expect(output.find('#table-cell')).toBeTruthy();
    });

    it("Finds the table labels", () => {
        const output = shallow(<EnhancedTableHead />);
        let component = output.find(TableSortLabel);
        expect(component).toHaveLength(4);
        expect(output.find('#sort-label')).toBeTruthy();
    })

    it('It finds the grid container', () => {
        const output = shallow(<ManageRecommendationPage />);
        expect(output.find('#grid-container1')).toBeTruthy();
    });

    it('It finds the grid', () => {
        const output = shallow(<ManageRecommendationPage />);
        expect(output.find('#grid1')).toBeTruthy();
    });

    it('It finds the title', () => {
        const output = shallow(<ManageRecommendationPage />);
        expect(output.find('#title')).toBeTruthy();
    });

    it('It finds the subtitle', () => {
        const output = shallow(<ManageRecommendationPage />);
        expect(output.find('#subtitle')).toBeTruthy();
    });

    it('It finds the create recommendation button', () => {
        const output = shallow(<ManageRecommendationPage />);
        expect(output.find('#recBtn')).toBeTruthy();
    });

    it('It finds the grid container', () => {
        const output = shallow(<ManageRecommendationPage />);
        expect(output.find('#grid-container2')).toBeTruthy();
    });

    it('It finds the grid', () => {
        const output = shallow(<ManageRecommendationPage />);
        expect(output.find('#grid2')).toBeTruthy();
    });

    it('It finds the searchbar', () => {
        const output = shallow(<ManageRecommendationPage />);
        expect(output.find('#search')).toBeTruthy();
    });

    it('It finds the textfield', () => {
        const output = shallow(<ManageRecommendationPage />);
        expect(output.find('#custom-css-standard-input')).toBeTruthy();
    });

    it('It finds the root', () => {
        const output = shallow(<ManageRecommendationPage />);
        expect(output.find('#root')).toBeTruthy();
    });

    it('It finds the paper component', () => {
        const output = shallow(<ManageRecommendationPage />);
        expect(output.find('#paper')).toBeTruthy();
    });

    it('It finds the toolbar', () => {
        const output = shallow(<ManageRecommendationPage />);
        expect(output.find('#toolbar')).toBeTruthy();
    });

    it('It finds the table', () => {
        const output = shallow(<ManageRecommendationPage />);
        expect(output.find('#table')).toBeTruthy();
    });

    it('It finds the table body', () => {
        const output = shallow(<ManageRecommendationPage />);
        expect(output.find('#table-body')).toBeTruthy();
    });

    it('It finds the table pagination', () => {
        const output = shallow(<ManageRecommendationPage />);
        expect(output.find('#pagination')).toBeTruthy();
    });

    it("Finds the Dialog", () => {
        const output = shallow(<ManageRecommendationPage />);
        let dialog = output.find(Dialog);
        expect(dialog).toHaveLength(4);
    })

    it("Finds the Dialog", () => {
        const output = shallow(<ManageRecommendationPage />);
        let dialog = output.find(Dialog);
        expect(dialog).toHaveLength(4);
    })

    it("Finds the DialogContent", () => {
        const output = shallow(<ManageRecommendationPage />);
        let dialogContent = output.find(DialogContent);
        expect(dialogContent).toHaveLength(27);
    })

    it("Finds the DialogContentText", () => {
        const output = shallow(<ManageRecommendationPage />);
        let dialogContentText = output.find(DialogContentText);
        expect(dialogContentText).toHaveLength(49);
    })

    it("Finds the DialogActions", () => {
        const output = shallow(<ManageRecommendationPage />);
        let dialogActions = output.find(DialogActions);
        expect(dialogActions).toHaveLength(4);
    })

    it("Finds FormControl", () => {
        const output = shallow(<ManageRecommendationPage />);
        let formControl = output.find(FormControl);
        expect(formControl).toHaveLength(3);
    })
});