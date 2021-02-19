import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MinusSquare, PlusSquare, TransitionComponent, AssetTreeItem, SearchComboBox, AssetTree } from '../AssetTreeView';
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
        ReactDOM.render(<AssetTree nestedAssets={{id: 1}}/>, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It is visible in the component tree', () => {
        const output = shallow(<AssetTree nestedAssets={{id: 1}}/>);
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
        const output = shallow(<AssetTreeItem nestedAssets={{id: 1}}/>);
        let component = output.find(TreeItem);
        expect(component).toHaveLength(1);
    })

    it("It finds the AssetTree component", () => {
        const output = shallow(<AssetTree nestedAssets={{id: 1}}/>);
        let component1 = output.find(SearchComboBox);
        let component2 = output.find(TreeView);
        expect(component1).toHaveLength(1);
        expect(component2).toHaveLength(1);
    })
});