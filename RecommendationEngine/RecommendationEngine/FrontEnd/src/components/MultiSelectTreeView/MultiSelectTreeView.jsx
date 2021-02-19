import React from 'react';
import 'antd/dist/antd.css';
import { TreeSelect } from 'antd';
import './MultiSelectTreeView.css';

export default function MultiSelectTreeView (props) {

    //if we can get the level, we can make it more generic. 
    const { SHOW_ALL } = TreeSelect;
    const { items, value, placeholder, onChange } = props;

    return (
        <div className='treeview-container'>
            <TreeSelect
                id='treeview-dropdown'
                maxTagCount='responsive'
                treeCheckable
                treeData={items}
                value={value}
                showCheckedStrategy={SHOW_ALL}
                placeholder={placeholder}
                onChange={onChange}
                filterTreeNode={(search, item) => {
                    return item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
                }}
                dropdownStyle={{
                    zIndex: 100000
                }}
            />
        </div>
    )
}
