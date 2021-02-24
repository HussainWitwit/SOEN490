import React from 'react';
import PropTypes from 'prop-types';
import { SvgIcon, Typography, TextField, Collapse } from '@material-ui/core';
import { TreeView, TreeItem, Autocomplete } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faCubes, faSun, faUsers, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import { connect } from 'react-redux';
import { mapStateToProps } from '../../redux/SharedReducer/reducer-actions';
import './AssetTreeView.css';

export function MinusSquare (props) {
  return (
    <SvgIcon id="svg-icon1" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

export function PlusSquare (props) {
  return (
    <SvgIcon id="svg-icon2" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

export function TransitionComponent (props) {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  in: PropTypes.bool,
};

function AssetIcon ({ type }) {

  switch (type) {
    case 'client':
      return <FontAwesomeIcon className='label-icon' icon={faUsers} />;
    case 'portfolio':
      return <FontAwesomeIcon className='label-icon' icon={faCubes} />;
    case 'plant':
      return <FontAwesomeIcon className='label-icon' icon={faCube} />;
    case 'asset':
      return <FontAwesomeIcon className='label-icon' icon={faSun} />;
    default:
      return <FontAwesomeIcon className='label-icon' icon={faQuestion} />;
  }
}

AssetIcon.propTypes = {
  type: PropTypes.string
}


export function AssetTreeItem (props) {
  const { labelText, assetType, labelInfo, color, bgColor, ...other } = props;

  return (
    <TreeItem
      TransitionComponent={TransitionComponent}
      label={
        <div className='label-root'>
          <AssetIcon type={assetType} />
          <Typography variant="body2" className='label-text'>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      classes={{
        root: 'asset-tree-item-root',
        group: 'asset-tree-item-group',
      }}
      {...other}
    />
  );
}

AssetTreeItem.propTypes = {
  nodeId: PropTypes.string,
  labelText: PropTypes.string,
  assetType: PropTypes.string,
  labelInfo: PropTypes.string,
};

export const SearchComboBox = () => {
  return (
    <Autocomplete
      options={mockList}
      getOptionLabel={(option) => option.title}
      className='autocomplete-style'
      renderInput={(params) => <TextField
        {...params}
        label="Combo box"
        variant="outlined"
        className='search-box-container '
        color='secondary'
      />}
    />
  );
}

const mockList = [
  { title: 'Asset Title 1' },
  { title: 'Asset Title 2' },
  { title: 'Asset Title 3' },
  { title: 'Asset Title 4' },
];

export function AssetTree ({ nestedAssets }) {
  const DisplayAssetNodeTree = (displayData) => (
    <AssetTreeItem nodeId={displayData.id} labelText={displayData.displayText} assetType='asset' key={displayData.id}>
      {displayData.children && displayData.children.length > 0 && displayData.children.map((child) => (
        DisplayAssetNodeTree(child)
      ))
      }
    </AssetTreeItem>
  );
  return (
    <div className='flex-direction-column'>
      <SearchComboBox />
      <TreeView
        className='asset-tree-container '
        defaultExpanded={[nestedAssets ? nestedAssets.id: '1']}
        defaultCollapseIcon={<MinusSquare />}
        defaultExpandIcon={<PlusSquare />}
      >
        {nestedAssets &&
          DisplayAssetNodeTree(nestedAssets)
        }
      </TreeView>
    </div>
  );

}
export default connect(mapStateToProps)(AssetTree);
