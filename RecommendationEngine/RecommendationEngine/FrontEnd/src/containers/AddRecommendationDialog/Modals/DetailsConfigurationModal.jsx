import React from 'react'
import { useTransition, animated } from 'react-spring';
import './DetailsConfigurationModal.css'

function DetailsConfigurationModal(props) {
    return (
            <animated.div id="ModalContainer" style={props.dialogStyle}>Details Configuration</animated.div>
    )
}

export default DetailsConfigurationModal
