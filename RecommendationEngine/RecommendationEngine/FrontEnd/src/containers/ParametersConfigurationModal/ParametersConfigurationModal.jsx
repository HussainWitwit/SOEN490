import React from 'react'
import { useTransition, animated } from 'react-spring';
import './ParametersConfigurationModal.css'

function ParametersConfigurationModal(props) {
    return (
            <animated.div id="ModalContainer" style={props.dialogStyle}>Parameters Configuration</animated.div>
    )
}

export default ParametersConfigurationModal
