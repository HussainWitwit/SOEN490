import React from 'react';
import 'antd/dist/antd.css';
import { TreeSelect } from 'antd';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../redux/SharedReducer/reducer-actions';

// TODO: 
// 1. Return an ARRAY of objects with assets and ther children from the backend 
// 2. Pass the array in the DetailsConfigurationModal
// 3. A treeView of the assets will then be displayed

export function MultiSelectTreeView (props) {
    const { SHOW_ALL } = TreeSelect;
    const { assetList } = props;
    console.log(assetList);

    // sample data, replace assetList with treeData to see what it looks like
    const treeData = [
        {
            title: 'Node1',
            value: '0-0',
            key: '0-0',
            children: [
                {
                    title: 'Child Node1',
                    value: '0-0-0',
                    key: '0-0-0',
                },
            ],
        },
        {
            title: 'Node2',
            value: '0-1',
            key: '0-1',
            children: [
                {
                    title: 'Child Node3',
                    value: '0-1-0',
                    key: '0-1-0',
                },
                {
                    title: 'Child Node4',
                    value: '0-1-1',
                    key: '0-1-1',
                },
                {
                    title: 'Child Node5',
                    value: '0-1-2',
                    key: '0-1-2',
                },
            ],
        },
    ];


    const tProps = {
        // treeData,
        assetList,
        value: props.value,
        onChange: props.onChange,
        treeCheckable: true,
        showCheckedStrategy: SHOW_ALL,
        placeholder: props.placeholder,
        style: {
            width: '2000%',
        }
    }

    return (
        <div>
            <TreeSelect
                {...tProps} />
        </div>
    )

}

export default connect(mapStateToProps)(MultiSelectTreeView);
