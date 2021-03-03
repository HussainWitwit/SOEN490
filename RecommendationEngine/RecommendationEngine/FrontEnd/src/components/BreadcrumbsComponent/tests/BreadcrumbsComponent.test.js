import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Link from '@material-ui/core/Link';
import { GiWindTurbine } from "react-icons/gi";
import { BiCube } from "react-icons/bi";
import { store } from '../../../redux/store';
import { Typography } from '@material-ui/core';
import BreadcrumbsComponent from '../BreadcrumbsComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('Breadcrumbs component', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const output = shallow(<BreadcrumbsComponent store={store}/>);


    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<BreadcrumbsComponent  store={store}/>, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the BreadCrumbs component in the main tree', () => {
        expect(output).toHaveLength(1);
    });

    it('It finds the link element', () => {
        let component = output.find(Link);
        expect(component).toHaveLength(2);
    });

    it('It finds the Bicube element', () => {
        let component = output.find(BiCube);
        expect(component).toHaveLength(1);
    });

    it('It finds the GiWindTurbine element', () => {
        let component = output.find(GiWindTurbine);
        expect(component).toHaveLength(1);
    });

    it('It finds the Typography element', () => {
        let component = output.find(Typography);
        expect(component).toHaveLength(1);
    });
});