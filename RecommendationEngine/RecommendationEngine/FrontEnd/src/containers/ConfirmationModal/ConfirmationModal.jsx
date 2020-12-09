import React from 'react';
import { animated } from 'react-spring';
import TextField from '@material-ui/core/TextField';
import MultiSelectAutocomplete from '../../components/MultiSelectAutocomplete/MultiSelectAutocomplete';
import { connect } from 'react-redux';
import {
  mapDialogStateToProps,
  mapDispatchToProps,
} from '../../redux/AddRecDialogReducer/reducer-actions';
import './ConfirmationModal.css';

//TODO: Implement parameters
const parameters = [{ title: 'To Come', year: 1994 }];


export function ConfirmationModal (props) {

  const { dialogStyle, dialogsContent } = props;

  return (
    <animated.div id="confirmation-modal-container" style={dialogStyle}>
      <div id="confirmation-modal-content">
        <div id="confirmation-sub-header">Summary</div>
        <div id="confirmation-content-body">
          <TextField
            id="outlined-read-only-title"
            label="Recommendation Title"
            defaultValue={dialogsContent.basicConfiguration.title}
            InputProps={{
              readOnly: true,
              disableUnderline: true,
            }}
          />
          <TextField
            id="outlined-read-only-algo"
            label="Recommendation Type"
            defaultValue={dialogsContent.template.name}
            InputProps={{
              readOnly: true,
              disableUnderline: true,
            }}
          />
          <TextField
            id="outlined-read-only-small"
            label="Preferred Scenario"
            defaultValue={dialogsContent.basicConfiguration.preferredScenario}
            InputProps={{
              readOnly: true,
              disableUnderline: true,
            }}
          />
          <MultiSelectAutocomplete
            contentLabel="Parameters..."
            items={parameters}
            defaultValue={parameters}
            boxLabelName={'Parameters'}
            variant={'outlined'}
            isReadOnly={true}
            maxElement={1}
          />
          <MultiSelectAutocomplete
            contentLabel="Assets..."
            items={dialogsContent.basicConfiguration.asset}
            defaultValue={dialogsContent.basicConfiguration.asset}
            boxLabelName={'Assets'}
            variant={'outlined'}
            isReadOnly={true}
            maxElement={10}
          />
          <TextField
            id="outlined-read-only-recurrence"
            label="Recurrence"
            //String manipulation could be done to display a more cleaner text... 
            defaultValue={`${dialogsContent.basicConfiguration.granularity}, ${dialogsContent.basicConfiguration.repeatDate},  ${dialogsContent.basicConfiguration.repeatTime}`}
            InputProps={{
              readOnly: true,
              disableUnderline: true,
            }}
          />
        </div>
      </div>
    </animated.div>
  );
}

export default connect(
  mapDialogStateToProps,
  mapDispatchToProps
)(ConfirmationModal);
