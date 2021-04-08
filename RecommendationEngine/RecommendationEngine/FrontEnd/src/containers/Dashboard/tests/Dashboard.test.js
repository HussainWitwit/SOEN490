import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dashboard, { pickStylingClassName } from '../Dashboard';
import fetch from 'isomorphic-fetch';
import FullCalendar from '@fullcalendar/react'
import { Chart } from 'bizcharts';
import Grid from '@material-ui/core/Grid';
import { store } from '../../../redux/store';

Enzyme.configure({ adapter: new Adapter() });

describe('Dashboard component', () => {
  const widgetMetrics = [
    { title: 'Potential Net Savings', value: "14,624,099.744", sign: "$", description: "This is a description" },
    { title: 'Average ROI', value: "14,624,099.744", sign: "$", description: "This is a description" },
    { title: 'Potential Losses', value: "14,624,099.744", sign: "$", description: "This is a description" }
  ]

  const histogramValues = [
    { month: '01', monthName: 'Jan', total: 0 }
  ]
  useState = jest.fn().mockReturnValue([[widgetMetrics, widgetMetrics], [histogramValues, histogramValues]]);
  const setState = jest.fn().mockReturnValue([[widgetMetrics, widgetMetrics], [histogramValues, histogramValues]]);
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [widgetMetrics, setState]);
  const output = shallow(<Dashboard store={store} />).dive().dive();

  it.skip('It renders without crashing', async () => {
    const div = document.createElement('div');
    ReactDOM.render(<Dashboard store={store} />, div);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  it('It finds the page in the component tree', () => {
    expect(output).toHaveLength(1);
  });

  it("Finds the divs", () => {
    let component = output.find('div');
    expect(component).toHaveLength(7);
  })

  it("Finds the calendar", () => {
    let component = output.find(FullCalendar);
    expect(component).toHaveLength(1);
  })

  it("Finds the histogram", () => {
    let component = output.find(Chart);
    expect(component).toHaveLength(1);
  })

  it("Finds the grid", () => {
    let component = output.find(Grid);
    expect(component).toHaveLength(2);
  })

  it("Tests the class assignment function", () => {
    const class1 = pickStylingClassName('Potential Net Savings');
    expect(class1).toEqual('widget net-savings');

    const class2 = pickStylingClassName('Average ROI');
    expect(class2).toEqual('widget roi');

    const class3 = pickStylingClassName('Potential Losses');
    expect(class3).toEqual('widget inaction');
  })
});