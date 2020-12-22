import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
    AddRecommendationDialog, PaperComponent, Transition
} from '../containers/AddRecommendationDialog/AddRecommendationDialog';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Slide
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { store } from '../redux/store';
import Draggable from 'react-draggable';

Enzyme.configure({ adapter: new Adapter() });

describe('AddRecommendationDialog component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const output = shallow(<AddRecommendationDialog template={{ name: '' }} />);
    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<AddRecommendationDialog template={{ name: '' }} />, div);
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

    it('Finds the dialog content', () => {
        let component = output.find(DialogContent);
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

    it('Finds the paper component', () => {
        const output = shallow(<PaperComponent />);
        expect(output).toHaveLength(1);
        let component = output.find(Draggable);
        expect(component).toHaveLength(1);
    });

    it('Finds the transition component', () => {
        const output = shallow(<Transition />);
        let component = output.find(Slide);
        expect(component).toHaveLength(1);
    });
});