import React from 'react'
import {useLocation, useHistory} from "react-router";

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '100px',
    zIndex: 1000
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)'
}

// const colour = {
//     backgroundColor:'#ff0000',
//     padding: '100px',
    
// }

export default function DateConfiguration(props) {
    const history = useHistory();

    function goBackHandle(){
        history.goBack();
    }
    return (
        <div>
         {/* <div style={OVERLAY_STYLES}></div> */}
            <div style={MODAL_STYLES}>
            Date Configuration
            <button onClick={goBackHandle}>Go Back</button>
            </div>
            {props.childrenProps}
        </div>
        
    )
}
