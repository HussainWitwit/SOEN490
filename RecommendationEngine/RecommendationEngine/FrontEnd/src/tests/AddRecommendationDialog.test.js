import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddRecommendationDialog, {
    PaperComponent
} from '../containers/AddRecommendationDialog/AddRecommendationDialog';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

Enzyme.configure({ adapter: new Adapter() });

describe('AddRecommendationDialog component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);


    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<AddRecommendationDialog />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the dialog component', () => {
        const output = shallow(<AddRecommendationDialog />);
        let component = output.find(Dialog);
        expect(component).toHaveLength(1);
    });

    it('It finds the icon button', () => {
        const output = shallow(<AddRecommendationDialog />);
        let component = output.find(IconButton);
        expect(component).toHaveLength(1);
    });

    it('Finds the close icon', () => {
        const output = shallow(<AddRecommendationDialog />);
        let component = output.find(CloseIcon);
        expect(component).toHaveLength(1);
    });

    it('Finds the dialog title', () => {
        const output = shallow(<AddRecommendationDialog />);
        let component = output.find(DialogTitle);
        expect(component).toHaveLength(1);
    });

    it('Finds the dialog content', () => {
        const output = shallow(<AddRecommendationDialog />);
        let component = output.find(DialogContent);
        expect(component).toHaveLength(1);
    });

    it('Finds the dialog actions', () => {
        const output = shallow(<AddRecommendationDialog />);
        let component = output.find(DialogActions);
        expect(component).toHaveLength(1);
    });

    it('Finds the action buttons', () => {
        const output = shallow(<AddRecommendationDialog />);
        let component = output.find(Button);
        expect(component).toHaveLength(3);
    });

    it('Finds the paper component', () => {
        const output = shallow(<AddRecommendationDialog />);
        let component = output.find(PaperComponent);
        expect(component).toHaveLength(1);
    });

});