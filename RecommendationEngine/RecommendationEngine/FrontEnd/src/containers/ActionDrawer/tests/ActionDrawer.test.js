import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ActionDrawer from '../ActionDrawer';
import Grid from '@material-ui/core/Grid';
import { store } from '../../../redux/store';

Enzyme.configure({ adapter: new Adapter() });

describe('ActionDrawer component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const output = shallow(<ActionDrawer store={store} assets={[]} actions={[]} />).dive().dive();

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<ActionDrawer store={store} />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the all the grids', () => {
        let grids = output.find(Grid);
        expect(grids).toHaveLength(3);
    });

    it('Finds all the paragraphs', () => {
        let p = output.find('p');
        expect(p).toHaveLength(4);
    })

})
