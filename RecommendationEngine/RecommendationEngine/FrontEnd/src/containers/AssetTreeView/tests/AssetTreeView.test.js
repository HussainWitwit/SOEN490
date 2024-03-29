import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MinusSquare, PlusSquare, TransitionComponent, AssetTreeItem, AssetTree } from '../AssetTreeView';
import Collapse from '@material-ui/core/Collapse';
import TreeItem from '@material-ui/lab/TreeItem';

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
});