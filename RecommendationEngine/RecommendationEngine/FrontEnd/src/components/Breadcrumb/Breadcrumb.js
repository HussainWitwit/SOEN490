import React from 'react';
import './Breadcrumb.css';
import { BiCube } from "react-icons/bi";
import { GiWindTurbine } from "react-icons/gi";
import Button from '@material-ui/core/Button';

function Breadcrumb(props) {
    //CLEANUP: Useless to create a hook to assign variables that you never change afterwards...
    const [crumbs, setCrumbs] = React.useState(['All Portfolio', '23-kahuku', '001-kahuku']);

    const [isChangeClicked, setIsChangeClicked] = React.useState(false);

    function isLastCrumb(index) {
        return index === crumbs.length - 1;
      }
    const changeAssetEvent = () => {
        props.changeAsset(!props.sharedChangeAssetValue || !isChangeClicked);
        setIsChangeClicked(!props.sharedChangeAssetValue || !isChangeClicked);
    }

    return (
        <ol className="breadcrumb">
            {
                crumbs.map((crumb, ci) => {
                    const disabled = isLastCrumb(ci) ? 'disabled' : '';
                    return (
                        <li key={ci} className="breadcrumb-item align-items-center">
                        {crumb === "All Portfolio" &&
                        <BiCube />
                        }
                        {ci === 1 &&
                        <GiWindTurbine />
                        }
                        <button className={`btn btn-sm shadow-none ${disabled}`}>
                            {crumb}
                        </button>
                        {isLastCrumb(ci) &&
                        <Button classes={{root:'change-button-container'}} color='primary' onClick = {changeAssetEvent}>Change</Button>
                        }
                        </li>
                    );
                })
            }
        </ol>
    );
}

export default Breadcrumb;
