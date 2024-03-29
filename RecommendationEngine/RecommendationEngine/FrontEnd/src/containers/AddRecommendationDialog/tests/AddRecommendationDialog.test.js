import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
    AddRecommendationDialog, PaperComponent, Transition
} from '../AddRecommendationDialog';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Slide
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { store } from '../../../redux/store';
import Draggable from 'react-draggable';

Enzyme.configure({ adapter: new Adapter() });

describe('AddRecommendationDialog component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const output = shallow(<AddRecommendationDialog store={store} dialogsContent={{ template: { name: '' }, basicConfiguration: {} }} setBackToInitialValues={jest.fn} />);
    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<AddRecommendationDialog store={store} dialogsContent={{ template: { name: '' } }} />, div);
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
        const result = shallow(<PaperComponent />);
        expect(result).toHaveLength(1);
        let component = result.find(Draggable);
        expect(component).toHaveLength(1);
    });

    it('Finds the transition component', () => {
        const result = shallow(<Transition />);
        let component = result.find(Slide);
        expect(component).toHaveLength(1);
    });

    it('Simulate cancel button onClick', () => {
        output.find('#cancel-btn').simulate('click');
    });

    it('Simulate onClickNext function', () => {
        output.find('#next-btn').simulate('click');
    });

    it('Simulate onClickPrevious function', () => {
        output.find('#previous-btn').simulate('click');
    });
});