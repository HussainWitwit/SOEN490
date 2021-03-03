import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { GiWindTurbine } from "react-icons/gi";
import { FaSolarPanel, FaCubes } from "react-icons/fa"
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps} from '../../redux/AssetFilterReducer/reducer-actions';
import './BreadcrumbsComponent.css';

const getAssetAncestry = (id, assets) => {
    if(!id)
        return false;
    let asset = assets.find(el => el.id === id);
    let res = {currentAsset: asset, ancestry: []};
    while (asset.parentId) {
        asset = assets.find(el=> el.id === asset.parentId)
        res.ancestry.unshift(asset.displayText);
    }
    return res;
}

function EnergyTypeIcon({energyType}){
    switch(energyType){
        case "PV":
            return <FaSolarPanel id="energy-type-icon" />;
        case "WIND":
            return <GiWindTurbine id="energy-type-icon" />;
        default:
            return null;
    }
}

function BreadcrumbsComponent (props) {
    const [asset, setAsset] = useState({});
    useEffect(()=> {
        setAsset(getAssetAncestry(props.selectedAsset, props.flatListAssets));
    }, [props.selectedAsset])
    return (
      <div id="main-container">
        <Breadcrumbs
          aria-label="breadcrumb"
          separator="›"
          id="breadcrumbsComponent"
        >
          {asset.currentAsset ? (
            <Link color="inherit" id="link">
              <FaCubes id="energy-type-icon" />
              All Portfolio
            </Link>
          ) : (
            <Typography color="textPrimary" id="Typography">
              <FaCubes id="energy-type-icon" />
              All Portfolio
            </Typography>
          )}
          {asset.ancestry &&
            asset.ancestry.map((el) => (
              <Link color="inherit" id="link">
                {el}
              </Link>
            ))}
          {asset.currentAsset && <Typography color="textPrimary" id="Typography">
            <EnergyTypeIcon
              energyType={asset.currentAsset && asset.currentAsset.energyType}
            />
            {asset.currentAsset && asset.currentAsset.displayText}
          </Typography>}
        </Breadcrumbs>
      </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(BreadcrumbsComponent);