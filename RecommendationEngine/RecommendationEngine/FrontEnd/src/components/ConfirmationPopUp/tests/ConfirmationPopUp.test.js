import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button, Dialog, DialogActions, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { store } from '../../../redux/store';
import { ConfirmationPopUp } from '../ConfirmationPopUp'

Enzyme.configure({ adapter: new Adapter() });

describe('DeletePopUp component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const deletePopUp = shallow(<ConfirmationPopUp type="Delete" store={store} title={''} handleDeletePopUpOpen={jest.fn} open={jest.fn} recommendationId={1} closeScheduleDrilldown={jest.fn} />);
    const forceRunPopUp = shallow(<ConfirmationPopUp type="Force Run" store={store} title={''} handleForceRunPopUpOpen={jest.fn} open={jest.fn} recommendationId={1} closeScheduleDrilldown={jest.fn} updateScheduleDrilldown={jest.fn}/>);

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<ConfirmationPopUp store={store} />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the dialog component', () => {
        let component = deletePopUp.find(Dialog);
        expect(component).toHaveLength(1);
    });

    it('It finds the icon button', () => {
        let component = deletePopUp.find(IconButton);
        expect(component).toHaveLength(1);
    });

    it('Finds the close icon', () => {
        let component = deletePopUp.find(CloseIcon);
        expect(component).toHaveLength(1);
    });

    it('Finds the dialog title', () => {
        let component = deletePopUp.find(DialogTitle);
        expect(component).toHaveLength(1);
    });

    it('Finds the dialog actions', () => {
        let component = deletePopUp.find(DialogActions);
        expect(component).toHaveLength(1);
    });

    it('Finds the action buttons', () => {
        let component = deletePopUp.find(Button);
        expect(component).toHaveLength(2);
    });

    it('Simulate delete button onClick event', () => {
        deletePopUp.find('#deleteButton').simulate('click');
    });

    it('Simulate forceRun button onClick event', () => {
        forceRunPopUp.find('#forceRunButton').simulate('click');
    });
});