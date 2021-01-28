import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ActionDrawer from '../ActionDrawer';
import Grid from '@material-ui/core/Grid';

Enzyme.configure({ adapter: new Adapter() });

describe('ActionDrawer component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const output = shallow(<ActionDrawer />);

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<ActionDrawer />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the all the grids', () => {
        let grids = output.find(Grid);
        expect(grids).toHaveLength(3);
    });

})
