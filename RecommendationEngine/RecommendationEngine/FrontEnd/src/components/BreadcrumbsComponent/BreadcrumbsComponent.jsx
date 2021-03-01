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
    let path = asset.elementPath.split('.');
    let currentAggregatedPath = path[0];
    let res = {currentAsset: asset, ancestry: [currentAggregatedPath]}
    for (let i = 1; i < path.length-1; i++) {
        currentAggregatedPath += '.'+ path[i];
        console.log(currentAggregatedPath);
        res.ancestry.push(assets.find(el=> el.elementPath === currentAggregatedPath).displayText);
    }
    console.log(res);
    return res;
}

function BreadcrumbsComponent (props) {
    React.useEffect(()=> {
        getAssetAncestry(props.selectedAsset, props.flatListAssets)
    }, [props.selectedAsset])
    return (
        <div id="main-container">
            <Breadcrumbs aria-label="breadcrumb" separator="›" id="breadcrumbsComponent">
                <Link color="inherit" id="link">
                    <BiCube id="bi-cube" />
                All Portfolio
                </Link>
                <Link color="inherit" id="link">
                    {/* <GiWindTurbine id="gi-wind-turbine" /> */}
                23-kahuku
                </Link>
                <Typography color="textPrimary" id="Typography"><FaSolarPanel id="gi-wind-turbine" />001-kahuku</Typography>
            </Breadcrumbs>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(BreadcrumbsComponent);