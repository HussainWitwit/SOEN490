import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { GiWindTurbine } from "react-icons/gi";
import { FaSolarPanel } from "react-icons/fa"
import { BiCube } from "react-icons/bi";
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
    const [asset, setAsset] = React.useState({});
    React.useEffect(()=> {
        setAsset(getAssetAncestry(props.selectedAsset, props.flatListAssets));
    }, [props.selectedAsset])
    return (
        <div id="main-container">
            <Breadcrumbs aria-label="breadcrumb" separator="›" id="breadcrumbsComponent">
                <Link color="inherit" id="link">
                    <BiCube id="energy-type-icon" />
                All Portfolio
                </Link>
                {asset.ancestry && asset.ancestry.map((el)=> (<Link color="inherit" id="link">{el}
                </Link>))}
                <Typography color="textPrimary" id="Typography"><EnergyTypeIcon energyType={asset.currentAsset && asset.currentAsset.energyType} />{asset.currentAsset && asset.currentAsset.displayText}</Typography>
            </Breadcrumbs>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(BreadcrumbsComponent);