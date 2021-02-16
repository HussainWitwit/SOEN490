import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import JobLogPopUp from '../JobLogPopUp';
import JobLogTable from '../../../components/JobLogTable/JobLogTable';
Enzyme.configure({ adapter: new Adapter() });

describe('JobLogPopUp component', () => {
    const myInitialState = [{id: 23 , time: "17:24:10", level: "Information", description:"This is a description"},
    {id: 24 , time: "17:24:10", level: "Warning", description:"This is a description"},
    {id: 25 , time: "17:24:10", level: "Error", description:"This is a description"},
    {id: 26 , time: "17:24:10", level: "Fatal", description:"This is a description"},
    {id: 27 , time: "17:24:10", level: "", description:"This is a description"}]
    React.useState = jest.fn().mockReturnValue([[myInitialState, myInitialState]])
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [myInitialState, setState]);
    const output = shallow(<JobLogPopUp />);

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<JobLogPopUp />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the page in the component tree', () => {
        expect(output).toHaveLength(1);
    });

    it("Finds the divs", () => {
        let component = output.find('div');
        expect(component).toHaveLength(1);
    })

    it('It finds the 2 buttons', () => {
        let button = output.find(Button);
        expect(button).toHaveLength(2);
    });

    it('It finds the open log icon and presses it', () => {
        output.find(Button).at(0).simulate('click');
    });

    it('It finds the dialog', () => {
        let button = output.find(Dialog);
        expect(button).toHaveLength(1);
    });

    it('It finds the dialog title', () => {
        let button = output.find(DialogTitle);
        expect(button).toHaveLength(1);
    });

    it('It finds the dialog content', () => {
        let button = output.find(DialogContent);
        expect(button).toHaveLength(1);
    });

    it('It finds the dialog actions', () => {
        let button = output.find(DialogActions);
        expect(button).toHaveLength(1);
    });

    it('It finds the close and open buttons', () => {
        let button = output.find(Button);
        expect(button).toHaveLength(2);
    });

    it('It finds the dialog actions', () => {
        let button = output.find(JobLogTable);
        expect(button).toHaveLength(1);
    });

    it('It finds the close button and presses it', () => {
        output.find(Button).at(1).simulate('click');
    });

});