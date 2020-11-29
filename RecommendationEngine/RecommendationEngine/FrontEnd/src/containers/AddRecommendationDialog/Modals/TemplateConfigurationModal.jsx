import React from 'react'
import { useTransition, animated } from 'react-spring';
import './TemplateConfigurationModal.css'

function TemplateConfigurationModal(props) {
    return (
            <animated.div id="ModalContainer" style={props.dialogStyle}>Template Configuration</animated.div>
    )
}

export default TemplateConfigurationModal
