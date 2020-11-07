import React from 'react';
import './Breadcrumb.css';
import { BiCube } from "react-icons/bi";
import { GiWindTurbine } from "react-icons/gi";

function Breadcrumb (props) {
    // eslint-disable-next-line
    const [crumbs, setCrumbs] = React.useState(['All Portfolio', '23-kahuku', '001-kahuku']);

    function isLastCrumb (index) {
        return index === crumbs.length - 1;
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
                                <a className="change_anchor" href="/">Change</a>
                            }
                        </li>
                    );
                })
            }
        </ol>
    );
}

export default Breadcrumb;
