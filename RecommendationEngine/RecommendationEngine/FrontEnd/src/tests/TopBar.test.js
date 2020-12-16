import React from 'react';
import ReactDOM from 'react-dom';
import TopBar from '../containers/TopBar/TopBar.jsx';
import NotificationBell from '../components/Notification/NotificationBell.jsx';
import Enzyme, { shallow } from '../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { store } from '../redux/store';
import BreadcrumbsComponent from '../components/BreadcrumbsComponent/BreadcrumbsComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('TopBar component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);


    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<TopBar store={store} />, div)
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds it in the component tree', () => {
        const output = shallow(<TopBar store={store} />).dive();
        expect(output).toHaveLength(1);
    });

    it('Finds the nav element', () => {
        const output = shallow(<TopBar store={store} />).dive();
        let nav = output.find('nav');
        expect(nav).toHaveLength(1);
    })

    it('It finds the breadcrumb element', () => {
        const output = shallow(<TopBar store={store} />).dive();
        let breadCrumb = output.find(BreadcrumbsComponent);
        expect(breadCrumb).toHaveLength(1);
    });

    it('It finds the weather div', () => {
        const output = shallow(<TopBar store={store} />).dive();
        let weatherDiv = output.find('div');
        expect(weatherDiv).toHaveLength(2);
    });

    it('It finds the img element', () => {
        const output = shallow(<TopBar store={store} />).dive();
        let img = output.find('img');
        expect(img).toHaveLength(1);
    });

    it('It finds the change button element', () => {
        const output = shallow(<TopBar store={store} />).dive();
        let change = output.find('p');
        expect(change).toHaveLength(3);
    });

    it('It finds the NotificationBell element', () => {
        const output = shallow(<TopBar store={store} />).dive();
        let component = output.find(NotificationBell);
        expect(component).toHaveLength(1);
    });
});
