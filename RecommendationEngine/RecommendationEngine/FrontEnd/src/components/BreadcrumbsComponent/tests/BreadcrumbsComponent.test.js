import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { GiWindTurbine } from "react-icons/gi";
import { FaCubes } from "react-icons/fa";
import { Typography } from '@material-ui/core';
import { BreadcrumbsComponent } from '../BreadcrumbsComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('Breadcrumbs component', () => {
    const mockAssets = [{id:1, parentId:null, displayText:'Parent'}, {id:2, parentId:1, displayText:'Child', energyType:'WIND'}]
    const output = mount(<BreadcrumbsComponent selectedAsset={2} flatListAssets={mockAssets}/>);


    it('It renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(<BreadcrumbsComponent />, div);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it('It finds the BreadCrumbs component in the main tree', () => {
        expect(output).toHaveLength(1);
    });

    it('It finds the Bicube element', () => {
        let component = output.find(FaCubes);
        expect(component).toHaveLength(1);
    });

    it('It finds the GiWindTurbine element', () => {
        let component = output.find(GiWindTurbine);
        expect(component).toHaveLength(1);
    });

    it('It finds the Typography element', () => {
        let component = output.find(Typography);
        expect(component).toHaveLength(4);
    });
});