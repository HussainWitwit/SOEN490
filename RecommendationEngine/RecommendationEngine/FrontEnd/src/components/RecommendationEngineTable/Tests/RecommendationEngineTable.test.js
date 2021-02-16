import React from "react";
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import RecommendationEngineTable from '../RecommendationEngineTable';

Enzyme.configure({adapter: new Adapter()});

describe('Recommendation table component', () =>{
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const output = shallow(<RecommendationEngineTable />);

    it('It finds the table in the component tree', () => {
        expect(output).toHaveLength(1);
    });

    it('It finds the DataGrid table', ()=>{
        let datagrid = output.find(DataGrid)
        expect(datagrid).toHaveLength(1);
    })

});