import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../components/Home/Home.js';
import Enzyme, { shallow } from '../enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import '../components/Home/Home.css';
import ManageRecommendationTable from '../components/Table Component/ManageRecommendationTable';


Enzyme.configure({ adapter: new Adapter() });

describe('Home component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);


    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Home />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the main div', () => {
        const output = shallow(<Home />);
        expect(output.find('#main-container')).toBeTruthy();
    });

    it('It finds the ManageRecommendationTable component', () => {
        const output = shallow(<Home />);
        let component = output.find(ManageRecommendationTable);
        expect(component).toHaveLength(1);
        expect(output.find('#manage-table')).toBeTruthy();
    });
});