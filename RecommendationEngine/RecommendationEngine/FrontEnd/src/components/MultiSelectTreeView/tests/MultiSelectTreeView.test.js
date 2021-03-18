import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TreeSelect } from 'antd/lib/tree-select';
import MultiSelectTreeView from '../MultiSelectTreeView';

Enzyme.configure({ adapter: new Adapter() });

describe('MultiSelectTreeView component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const wrapper = shallow(<MultiSelectTreeView />);

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(wrapper, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('Finds the TreeSelect component', () => {
        let treeSelect = wrapper.find(TreeSelect);
        expect(treeSelect).toHaveLength(1);
    });
});
