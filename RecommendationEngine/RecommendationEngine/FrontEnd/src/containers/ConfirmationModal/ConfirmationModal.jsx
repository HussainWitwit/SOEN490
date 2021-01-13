import React from 'react';
import { animated } from 'react-spring';
import TextField from '@material-ui/core/TextField';
import MultiSelectAutocomplete from '../../components/MultiSelectAutocomplete/MultiSelectAutocomplete';
import { connect } from 'react-redux';
import { mapDialogStateToProps, mapDispatchToProps } from '../../redux/AddRecDialogReducer/reducer-actions';
import './ConfirmationModal.css';

const parameters = [{ title: 'To Come', year: 1994 }]; //Temporary until parameters user story is complete.
var formatYear = { month: 'long', day: 'numeric' };
var formatMonth = { day: 'numeric' };
var formatTime = { hour: 'numeric', minute: '2-digit', hour12: true};
var dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function ConfirmationModal (props) {

  const { dialogStyle, dialogsContent } = props;

  const stringRecurrenceFormatting = () => {
    let date = dialogsContent.basicConfiguration.repeatDate;
    let time = dialogsContent.basicConfiguration.repeatTime;
    switch(dialogsContent.basicConfiguration.granularity) {
      case 'Yearly':
        return(`Every year on ${date.toLocaleTimeString('en-us', formatYear).split(',')[0]} at ${time.toLocaleTimeString('en-us', formatTime)}`);
      case 'Monthly':
        return(`Every ${date.toLocaleTimeString('en-us', formatMonth).split(',')[0]}th of the month at ${time.toLocaleTimeString('en-us', formatTime)}`);
      case 'Weekly':
        let intDayOfWeek = dialogsContent.basicConfiguration.repeatDay;
        return (`Every ${dayOfWeek[intDayOfWeek - 1]} at ${time.toLocaleTimeString('en-us', formatTime)}`);
      default:
        return "Invalid";
    }
  }

  return (
    <animated.div id="confirmation-modal-container" style={dialogStyle}>
      <div id="confirmation-modal-content">
        <div id="confirmation-sub-header">Summary</div>
        <div id="confirmation-content-body">
          <TextField
            multiline = {true}
            error = {!dialogsContent.basicConfiguration.title}
            id="outlined-read-only-title"
            label="Recommendation Title"
            defaultValue={dialogsContent.basicConfiguration.title ? dialogsContent.basicConfiguration.title : "No Title"}
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
            defaultValue={dialogsContent.basicConfiguration.preferredScenario === "ROI" ? "Return On Investment" : "Net Saving"}
            InputProps={{
              readOnly: true,
              disableUnderline: true,
            }}
          />
          <MultiSelectAutocomplete
            contentLabel="Parameters..."
            items={parameters}
            defaultValue={parameters}
            boxLabelName={'Selected Parameters'}
            variant={'outlined'}
            isReadOnly={true}
            maxElement={1}
          />
          <MultiSelectAutocomplete
            contentLabel="Assets..."
            id = 'multiple-select-asset-container'
            error = {dialogsContent.basicConfiguration.asset.length === 0}
            items={dialogsContent.basicConfiguration.asset}
            defaultValue={dialogsContent.basicConfiguration.asset}
            boxLabelName={'Selected Assets'}
            variant={'outlined'}
            isReadOnly={true}
            maxElement={10}
          />
          <TextField
            id="outlined-read-only-recurrence"
            label="Recurrence"
            defaultValue={stringRecurrenceFormatting()}
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
