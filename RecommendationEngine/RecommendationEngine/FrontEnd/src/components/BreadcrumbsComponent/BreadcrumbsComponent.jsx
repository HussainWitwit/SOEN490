import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { GiWindTurbine } from "react-icons/gi";
import { BiCube } from "react-icons/bi";
import './BreadcrumbsComponent.css';

function BreadcrumbsComponent(props) {
    return (
        <div id="main-container">
            <Breadcrumbs aria-label="breadcrumb" separator="›" id="breadcrumbsComponent">
                <Link color="inherit" id="link">
                <BiCube id="BiCube"/>
                All Portfolio
                </Link>
                <Link color="inherit" id="link">
                <GiWindTurbine id="GiWindTurbine"/>
                23-kahuku
                </Link>
                <Typography color="textPrimary" id="Typography">001-kahuku</Typography>
            </Breadcrumbs>
        </div>
    );
}

export default BreadcrumbsComponent;