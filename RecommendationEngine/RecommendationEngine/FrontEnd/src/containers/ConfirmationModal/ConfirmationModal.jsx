import React from 'react'
import { animated } from 'react-spring';
import TextField from '@material-ui/core/TextField';
import './ConfirmationModal.css'

function ConfirmationModal(props) {
    return (
      <animated.div id="confirmation-modal-container" style={props.dialogStyle}>
        <div id="confirmation-modal-content">
          <div id="confirmation-sub-header">Summary</div>
          <div id="confirmation-content-body">
            <TextField
              id="outlined-read-only-input"
              label="Recommendation Title"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
                disableUnderline: true,
              }}
            />
            <TextField
              id="outlined-read-only-input"
              label="Recommendation Type"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
                disableUnderline: true,
              }}
            />
            <TextField
              id="outlined-read-only-input"
              label="Algorithm"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
                disableUnderline: true,
              }}
            />
            <TextField
              id="outlined-read-only-input"
              label="Granularity"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
                disableUnderline: true,
              }}
            />
            <TextField
              id="outlined-read-only-input"
              label="Repeat Date/day"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
                disableUnderline: true,
              }}
            //   variant="outlined"
            />
            <TextField
              id="outlined-read-only-input"
              label="Repeat Time"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
                disableUnderline: true

              }}
            />
            <TextField
              id="outlined-read-only-input"
              label="Asset (s)"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
                disableUnderline: true
              }}
            />
            <TextField
              id="outlined-read-only-input"
              label="Preferred Scenario"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
                disableUnderline: true

              }}
            />
          </div>
        </div>
      </animated.div>
    );
}

export default ConfirmationModal
