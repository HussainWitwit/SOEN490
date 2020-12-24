import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { store } from '../redux/store';
import ParametersConfigurationModal from '../containers/TemplateConfigurationModal/TemplateConfigurationModal';


Enzyme.configure({ adapter: new Adapter() });

describe('ParametersConfigurationModal component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const wrapper = shallow(<ParametersConfigurationModal store={store} />).dive().dive();

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<ParametersConfigurationModal store={store} />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('Finds the divs', () => {
        let divs = wrapper.find('div');
        expect(divs).toHaveLength(3);
    });
});
