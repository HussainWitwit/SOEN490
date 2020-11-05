import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from "@material-ui/core/Typography";
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { faCube, faCubes, faSun,  faUsers, faWind   } from '@fortawesome/free-solid-svg-icons'
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import '../RightPanel/AssetTreeView.scss';

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
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

function AssetIcon({ type }) {

    switch(type) {
        case 'client':
            return <FontAwesomeIcon className='Label-Icon' icon={faUsers} />;
        case 'portfolio':
            return <FontAwesomeIcon className='Label-Icon' icon={faCubes} />;
        case 'plant':
            return <FontAwesomeIcon className='Label-Icon' icon={faCube} />;
        case 'asset': //TODO: Need extra logic for energy type
            return <FontAwesomeIcon className='Label-Icon' icon={faSun} />;
    };
}

AssetIcon.propTypes = {
    type: PropTypes.string.isRequired
}


function AssetTreeItem (props) {
const { labelText, assetType, labelInfo, color, bgColor, ...other } = props;

 return(
     <TreeItem 
     TransitionComponent={TransitionComponent} 
     label = {
        <div className='Label-Root'>
        <AssetIcon type={assetType}/>
        <Typography variant="body2" className='Label-Text'>
          {labelText}
        </Typography>
        <Typography variant="caption" color="inherit">
          {labelInfo}
        </Typography>
      </div>
     }
     classes = {{
        root: 'Asset-Tree-Item-Root',
        group: 'Asset-Tree-Item-Group',
     }}
     {...other}
     />
 );   
}

AssetTreeItem.propTypes = {
    nodeId: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    assetType: PropTypes.string.isRequired,
    labelInfo: PropTypes.string,
};

//TODO: Need to be done 50% from scratch.
const SearchComboBox = () => {
    return (
        <Autocomplete
          options={mockList}
          getOptionLabel={(option) => option.title}
          style={{ width: 200, height: 40, marginLeft:10 , marginRight: 10, marginBottom: 25}}
          renderInput={(params) => <TextField 
            {...params} 
            label="Combo box" 
            variant="outlined" 
            className ='Search-Box-Container '
            color = 'secondary'
            />}
        />
      );
}

const mockList = [
    { title: 'Asset Title 1'},
    { title: 'Asset Title 2'},
    { title: 'Asset Title 3'},
    { title: 'Asset Title 4'},
];



export function AssetTree() {

    return (
        <div className = 'flex-direction-column'>
        <SearchComboBox />       
        <TreeView
          className= 'Asset-Tree-Container '
          defaultExpanded={['1']}
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
        >
          <AssetTreeItem nodeId ="1" labelText="Client SolarWorld" assetType = 'client'>
            <AssetTreeItem nodeId="2" labelText="08 - DG 2015 Portfolio 2" assetType = 'asset' />
            <AssetTreeItem nodeId="3" labelText="Porfotlio Night Eve" assetType = 'asset' >
              <AssetTreeItem nodeId="6" labelText="Asset" assetType = 'asset' />
              <AssetTreeItem nodeId="7" labelText="Solar Asset with children" assetType = 'asset' >
                <AssetTreeItem nodeId="9" labelText="Child 1" assetType = 'asset' />
                <AssetTreeItem nodeId="10" labelText="Child 2" assetType = 'asset' />
                <AssetTreeItem nodeId="11" labelText="Child 3" assetType = 'asset' />
              </AssetTreeItem>
              <AssetTreeItem nodeId="8" labelText="Hello" assetType = 'plant' />
            </AssetTreeItem>
            <AssetTreeItem nodeId="4" labelText="World" assetType = 'asset' />
            <AssetTreeItem nodeId="5" labelText="Something something" assetType = 'asset' />
          </AssetTreeItem>
        </TreeView>
        </div>
      );

}
