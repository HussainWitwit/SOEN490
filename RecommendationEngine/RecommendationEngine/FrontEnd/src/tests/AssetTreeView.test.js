import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AssetTree }  from '../containers/AssetTreeView/AssetTreeView';
import { MinusSquare, PlusSquare, TransitionComponent, AssetTreeItem, SearchComboBox } from '../containers/AssetTreeView/AssetTreeView';
import Collapse from '@material-ui/core/Collapse';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';

Enzyme.configure({ adapter: new Adapter() });

describe('AssetTreeView component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);


    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<AssetTree />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It is visible in the component tree', () => {
        const output = shallow(<AssetTree />);
        expect(output).toHaveLength(1);
    });

    it('It finds svg icon', () => {
        const output = shallow(<MinusSquare />);
        expect(output).toHaveLength(1);
    });

    it('It finds svg icon', () => {
        const output = shallow(<PlusSquare />);
        expect(output).toHaveLength(1);
    });

    it('It finds the animated div', () => {
        const output = shallow(<TransitionComponent />);
        expect(output).toHaveLength(1);
    });

    it("It finds the collapse component", () => {
        const output = shallow(<TransitionComponent />);
        let component = output.find(Collapse);
        expect(component).toHaveLength(1);
    })

    it("It finds the AssetTreeItem component", () => {
        const output = shallow(<AssetTreeItem />);
        let component = output.find(TreeItem);
        expect(component).toHaveLength(1);
    })

    it("It finds the AssetTree component", () => {
        const output = shallow(<AssetTree />);
        let component1 = output.find(SearchComboBox);
        let component2 = output.find(TreeView);
        expect(component1).toHaveLength(1);
        expect(component2).toHaveLength(1);
    })
});