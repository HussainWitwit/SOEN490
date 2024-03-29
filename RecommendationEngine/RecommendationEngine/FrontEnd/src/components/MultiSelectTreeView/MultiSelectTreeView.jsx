import React from 'react';
import 'antd/dist/antd.css';
import { TreeSelect } from 'antd';
import './MultiSelectTreeView.css';
import PropTypes from 'prop-types';

export default function MultiSelectTreeView (props) {

    const { SHOW_ALL } = TreeSelect;
    const { items, value, placeholder, onChange } = props;

    return (
        <div className='treeview-container'>
            <TreeSelect
                id='treeview-dropdown'
                maxTagCount='responsive'
                treeData={items}
                treeCheckable
                treeDefaultExpandedKeys={items ? [items[0].key] : ['']}
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

/* istanbul ignore next */
MultiSelectTreeView.propTypes = {
    items: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
