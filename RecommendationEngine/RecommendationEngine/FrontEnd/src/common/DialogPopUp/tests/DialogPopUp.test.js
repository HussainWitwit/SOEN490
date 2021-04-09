import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button, Dialog, DialogActions, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { store } from '../../../redux/store';
import { DialogPopUp } from '../DialogPopUp';

Enzyme.configure({ adapter: new Adapter() });

describe('DialogPopUp component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const output = shallow(<DialogPopUp store={store} title={''} handleDeletePopUpOpen={jest.fn} handleForceRunPopUpOpen={jest.fn} open={jest.fn} recommendationId={1} closeScheduleDrilldown={jest.fn} updateScheduleDrilldown={jest.fn} />);

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<DialogPopUp store={store} />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the dialog component', () => {
        let component = output.find(Dialog);
        expect(component).toHaveLength(1);
    });

    it('It finds the icon button', () => {
        let component = output.find(IconButton);
        expect(component).toHaveLength(1);
    });

    it('Finds the close icon', () => {
        let component = output.find(CloseIcon);
        expect(component).toHaveLength(1);
    });

    it('Finds the dialog title', () => {
        let component = output.find(DialogTitle);
        expect(component).toHaveLength(1);
    });

    it('Finds the dialog actions', () => {
        let component = output.find(DialogActions);
        expect(component).toHaveLength(1);
    });

    it('Finds the action buttons', () => {
        let component = output.find(Button);
        expect(component).toHaveLength(2);
    });

});