import React from 'react';
import ReactDOM from 'react-dom';
import ManageRecommendationDrawer from '../ManageRecommendationDrawer';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { store } from '../../../redux/store';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { Provider } from 'react-redux';


Enzyme.configure({ adapter: new Adapter() });

describe('ManageRecommendationDrawer component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const output = shallow(<ManageRecommendationDrawer store={store}
        configuredRecommendation={{
            name: '',
            description: '',
            type: '',
            preferredScenario: '',
            granularity: '',
            recurrenceDayOfWeek: '',
            recurrenceDatetime: '',
            createdBy: '',
            assetList: [(value) => { }],
            parameters: [(value) => { }],
            lastJobs: [(value) => { }]
        }}
    />).dive();

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><ManageRecommendationDrawer store={store}
            configuredRecommendation={{
                name: '',
                description: '',
                type: '',
                preferredScenario: '',
                granularity: '',
                recurrenceDayOfWeek: '',
                recurrenceDatetime: '',
                createdBy: '',
                assetList: [(value) => { }],
                parameters: [(value) => { }],
                lastJobs: [(value) => { }]
            }} /></Provider>, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds it in the component tree main div', () => {
        expect(output).toHaveLength(1);
    });

    it('It finds all 3 buttons', () => {
        let buttons = output.find(Button);
        expect(buttons).toHaveLength(3);
    });

    it('It finds the tooltip component', () => {
        let tooltip = output.find(Tooltip);
        expect(tooltip).toHaveLength(1);
    });

    it('Simulate delete button onClick event', () => {
        output.find('#deleteRecButton').simulate('click');
    });
});