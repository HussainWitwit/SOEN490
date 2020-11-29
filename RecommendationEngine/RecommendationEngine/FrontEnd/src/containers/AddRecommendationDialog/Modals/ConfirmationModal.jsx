import React from 'react'
import { useTransition, animated } from 'react-spring';
import './ConfirmationModal.css'

function ConfirmationModal(props) {
    return (
            <animated.div id="ModalContainer" style={props.dialogStyle}>Confirmation Modal</animated.div>
    )
}

export default ConfirmationModal
