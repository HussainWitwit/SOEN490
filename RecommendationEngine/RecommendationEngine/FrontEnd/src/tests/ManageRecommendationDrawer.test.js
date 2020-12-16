import React from 'react';
import ReactDOM from 'react-dom';
import ManageRecommendationDrawer from '../components/ManageRecommendationDrawer/ManageRecommendationDrawer';
import Enzyme, { shallow } from '../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { store } from '../redux/store';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

Enzyme.configure({ adapter: new Adapter() });

describe('ManageRecommendationDrawer component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const output = shallow(<ManageRecommendationDrawer
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
    />);

    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(output, div);
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
});