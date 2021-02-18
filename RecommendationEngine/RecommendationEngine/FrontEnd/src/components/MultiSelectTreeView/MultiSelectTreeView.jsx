import React from 'react';
import 'antd/dist/antd.css';
import { TreeSelect } from 'antd';
import { renameAttributes } from '../../utilities/ArrayManipulationUtilities';

// TODO: 
// 1. Return an ARRAY of objects with assets and ther children from the backend 
// 2. Pass the array in the DetailsConfigurationModal
// 3. A treeView of the assets will then be displayed

export default function MultiSelectTreeView (props) {

    const { SHOW_PARENT } = TreeSelect;
    const { assetList } = props;

    console.log(renameAttributes(assetList));

    // sample data, replace assetList with treeData to see what it looks like
    const treeData = [
        {
            displayText: 'Node1',
            value: '0-0',
            id: '0-0',
            children: [
                {
                    displayText: 'Child Node1',
                    value: '0-0-0',
                    id: '0-0-0',
                },
            ],
        },
        {
            displayText: 'Node2',
            value: '0-1',
            id: '0-1',
            children: [
                {
                    displayText: 'Child Node3',
                    value: '0-1-0',
                    id: '0-1-0',
                },
                {
                    displayText: 'Child Node4',
                    value: '0-1-1',
                    id: '0-1-1',
                },
                {
                    displayText: 'Child Node5',
                    value: '0-1-2',
                    id: '0-1-2',
                },
            ],
        },
    ];


    const tProps = {
        treeData: assetList,
        // assetList,
        value: props.value,
        onChange: props.onChange,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: props.placeholder,
        style: {
            width: '2000%'
        }
    }

    return (
        <div>
            <TreeSelect
                dropdownStyle={{
                    zIndex: 100000
                }}
                {...tProps} />
        </div>
    )

}
