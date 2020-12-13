import React from 'react'
import { animated } from 'react-spring';
import './ParametersConfigurationModal.css'

function ParametersConfigurationModal(props) {
    return (
            <animated.div  id="confirmation-modal-container" style={props.dialogStyle}>
                <div id = 'paramater-modal-content'>
                    <div>Parameters Configuration</div>
                    <div id = "sub-title">Feature in development</div>
                </div>
            </animated.div>
    )
}

export default ParametersConfigurationModal
