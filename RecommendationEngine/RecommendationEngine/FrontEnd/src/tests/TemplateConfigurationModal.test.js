import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { store } from '../configure-store';
import TemplateConfigurationModal from '../containers/TemplateConfigurationModal/TemplateConfigurationModal';
import { Typography } from '@material-ui/core';
import { fireEvent, render, getAllByTestId } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

describe('TemplateConfigurationModal component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const wrapper = shallow(<TemplateConfigurationModal store={store} />).dive().dive();

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<TemplateConfigurationModal store={store} />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('Finds the divs', () => {
        let divs = wrapper.find('div');
        expect(divs).toHaveLength(6);
    });

    it('Finds the typography elements', () => {
        let p = wrapper.find(Typography);
        expect(p).toHaveLength(6);
    });

    describe('Test clicks', () => {
        it("Simulates clicks on different options", () => {
            const { container } = render(<TemplateConfigurationModal store={store} />);

            const templates = getAllByTestId(container, 'template-label');
            const template = getAllByTestId(container, 'template');

            fireEvent.click(template[0]);
            fireEvent.click(templates[1]);
        });
    })
});
