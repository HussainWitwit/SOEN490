import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { GiWindTurbine } from "react-icons/gi";
import { FaSolarPanel, FaCubes } from "react-icons/fa"
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../redux/AssetFilterReducer/reducer-actions';
import './BreadcrumbsComponent.css';
import PropTypes from 'prop-types';

const getAssetAncestry = (id, assets) => {
  if (!id)
    return false;
  let asset = assets.find(el => el.id === Number(id));
  let res = { currentAsset: asset, ancestry: [] };
  while (asset.parentId) {
    asset = assets.find(el => el.id === asset.parentId)
    res.ancestry.unshift(asset.displayText);
  }
  return res;
}

function EnergyTypeIcon ({ energyType }) {
  switch (energyType) {
    case "PV":
      return <FaSolarPanel id="energy-type-icon" />;
    case "WIND":
      return <GiWindTurbine id="energy-type-icon" />;
    default:
      return null;
  }
}

export function BreadcrumbsComponent (props) {
  const [asset, setAsset] = useState({});
  useEffect(() => {
    setAsset(getAssetAncestry(props.selectedAsset, props.flatListAssets));
  }, [props.selectedAsset, props.flatListAssets])
  return (
    <div id="main-container">
      <Breadcrumbs
        aria-label="breadcrumb"
        separator="›"
        id="breadcrumbsComponent"
      >
        <Typography
          color={asset.currentAsset ? 'inherit' : 'textPrimary'}
          id={asset.currentAsset ? 'link' : 'Typography'}
        >
          <FaCubes id="energy-type-icon" />
            All Portfolio
          </Typography>
        {asset.ancestry &&
          asset.ancestry.map((el) => (
            <Typography color="inherit" id="link">
              {el}
            </Typography>
          ))}
        {asset.currentAsset && (
          <Typography color="textPrimary" id="Typography">
            <EnergyTypeIcon
              energyType={asset.currentAsset && asset.currentAsset.energyType}
            />
            {asset.currentAsset && asset.currentAsset.displayText}
          </Typography>
        )}
      </Breadcrumbs>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BreadcrumbsComponent);

/* istanbul ignore next */
EnergyTypeIcon.propTypes = {
  energyType: PropTypes.string.isRequired,
};

/* istanbul ignore next */

BreadcrumbsComponent.propTypes = {
  selectedAsset: PropTypes.string.isRequired,
  flatListAssets: PropTypes.array.isRequired
}