import React from 'react';
import 'antd/dist/antd.css';
import { TreeSelect } from 'antd';
// import { renameAttributes } from '../../utilities/ArrayManipulationUtilities';

// TODO: 
// 1. Return an ARRAY of objects with assets and ther children from the backend 
// 2. Pass the array in the DetailsConfigurationModal
// 3. A treeView of the assets will then be displayed

export default function MultiSelectTreeView (props) {

    //if we can get the level, we can make it more generic. 
    const { SHOW_CHILD } = TreeSelect;

    const { assetList, value, placeholder, onChange } = props;

    return (
        <div>
            <TreeSelect
                treeCheckable
                treeData = {assetList}
                value = {value}
                showCheckedStrategy = {SHOW_CHILD}
                placeholder = {placeholder}
                onChange ={onChange}
                filterTreeNode= {(search, item) => {
                    return item.title.toLowerCase().indexOf(search.toLowerCase()) >=0;
                }}
                style ={{width: '2000%'}}
                dropdownStyle={{
                    zIndex: 100000
                }}
                />
        </div>
    )

}
