import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dashboard, { setClassName } from '../Dashboard';
import fetch from 'isomorphic-fetch';

Enzyme.configure({ adapter: new Adapter() });

describe.only('Dashboard component', () => {
  const widgetMetrics = [
    { title: 'Potential Net Savings', value: "14,624,099.744", sign: "$", description: "This is a description" },
    { title: 'Average ROI', value: "14,624,099.744", sign: "$", description: "This is a description" },
    { title: 'Potential Losses', value: "14,624,099.744", sign: "$", description: "This is a description" }
  ]
  React.useState = jest.fn().mockReturnValue([[widgetMetrics, widgetMetrics]]);
  const setState = jest.fn().mockReturnValue([[widgetMetrics, widgetMetrics]]);
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [widgetMetrics, setState]);
  const output = shallow(<Dashboard />);

  it('It renders without crashing', async () => {
    const div = document.createElement('div');
    ReactDOM.render(<Dashboard />, div);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  it('It finds the page in the component tree', () => {
    expect(output).toHaveLength(1);
  });

  it("Finds the divs", () => {
    let component = output.find('div');
    expect(component).toHaveLength(2);
  })

  it("Tests the class assignment function", () => {
    const id1 = setClassName('Potential Net Savings');
    expect(id1).toEqual('net-savings-widget');

    const id2 = setClassName('Average ROI');
    expect(id2).toEqual('roi-widget');

    const id3 = setClassName('Potential Losses');
    expect(id3).toEqual('inaction-widget');
  })
});