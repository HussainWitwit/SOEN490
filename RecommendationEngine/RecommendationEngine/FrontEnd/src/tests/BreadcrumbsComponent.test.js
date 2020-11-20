import React from 'react';
import ReactDOM from 'react-dom';
import BreadcrumbsComponent from '../components/BreadcrumbsComponent/BreadcrumbsComponent'
import Enzyme, { shallow } from '../enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Breadcrumbs component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);


    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<BreadcrumbsComponent />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the main div', () => {
        const output = shallow(<BreadcrumbsComponent />);
        expect(output.find('#main-container')).toBeTruthy();
    });

    it('It finds the breadcrumb element', () => {
        const output = shallow(<BreadcrumbsComponent />);
        expect(output.find('#breadcrumb')).toBeTruthy();
    });

    it('It finds the link element', () => {
        const output = shallow(<BreadcrumbsComponent />);
        expect(output.find('#link')).toBeTruthy();
    });

    it('It finds the Bicube element', () => {
        const output = shallow(<BreadcrumbsComponent />);
        expect(output.find('#Bicube')).toBeTruthy();
    });

    it('It finds the GiWindTurbine element', () => {
        const output = shallow(<BreadcrumbsComponent />);
        expect(output.find('#GiWindTurbine')).toBeTruthy();
    });

    it('It finds the Typography element', () => {
        const output = shallow(<BreadcrumbsComponent />);
        expect(output.find('#Typography')).toBeTruthy();
    });

});