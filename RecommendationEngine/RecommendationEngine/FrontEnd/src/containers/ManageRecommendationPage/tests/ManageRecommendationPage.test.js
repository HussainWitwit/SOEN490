import React from 'react';
import ReactDOM from 'react-dom';
import ManageRecommendationPage from '../ManageRecommendationPage';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { store } from '../../../redux/store';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

describe.only('ManageRecommendationPage component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const output = shallow(<ManageRecommendationPage store={store} />).dive().dive();


    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><ManageRecommendationPage store={store} /></Provider>, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the page in the component tree', () => {
        expect(output).toHaveLength(1);
    });
  
});