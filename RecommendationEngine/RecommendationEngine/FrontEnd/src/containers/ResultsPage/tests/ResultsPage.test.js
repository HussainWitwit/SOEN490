import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ResultsPage from '../ResultsPage';

Enzyme.configure({ adapter: new Adapter() });

describe.only('ResultsPage component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const output = shallow(<ResultsPage />);

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<ResultsPage />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the page in the component tree', () => {
        expect(output).toHaveLength(1);
    });

    it("Finds the divs", () => {
        let component = output.find('div');
        expect(component).toHaveLength(5);
    })

    it('It finds the grids', () => {
        let component = output.find(Grid);
        expect(component).toHaveLength(5);
    });

    it('It finds the 2 buttons', () => {
        let button = output.find(Button);
        expect(button).toHaveLength(1);
    });

    it('It finds the title', () => {
        let title = output.find('h3');
        expect(title).toHaveLength(1);
    });

    it('It finds the subtitles', () => {
        let subtitle = output.find('h6');
        expect(subtitle).toHaveLength(1);
    });
});