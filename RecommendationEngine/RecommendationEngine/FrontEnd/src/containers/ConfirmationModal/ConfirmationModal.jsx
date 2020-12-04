import React from 'react'
import { useTransition, animated } from 'react-spring';
import './ConfirmationModal.css'

function ConfirmationModal(props) {
    return (
            <animated.div id="confirmation-modal-container" style={props.dialogStyle}>
                <div id ='confirmation-modal-content'>Confirmation Modal</div>
            </animated.div>
    )
}

export default ConfirmationModal
