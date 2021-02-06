import React from 'react';
import { animated } from 'react-spring';
import TextField from '@material-ui/core/TextField';
import MultiSelectAutocomplete from '../../components/MultiSelectAutocomplete/MultiSelectAutocomplete';
import { connect } from 'react-redux';
import { mapDialogStateToProps, mapDispatchToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import { stringRecurrenceFormatting } from '../../utilities/DateTimeUtilities';
import './ConfirmationModal.css';
import { convertObjectToArrayOfObjects } from '../../utilities/ConfiguredRecommendationUtilities';

export function ConfirmationModal (props) {

  const { dialogStyle, dialogsContent } = props;

  return (
    <animated.div id="confirmation-modal-container" style={dialogStyle}>
      <div id="confirmation-modal-content">
        <div id="confirmation-sub-header">Summary</div>
        <div id="confirmation-content-body">
          <TextField
            multiline={true}
            error={!dialogsContent.basicConfiguration.title}
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
            items={convertObjectToArrayOfObjects(dialogsContent.parameterConfiguration)}
            defaultValue={convertObjectToArrayOfObjects(dialogsContent.parameterConfiguration).map((value) => { if (value !== 0) { return value } })}
            boxLabelName={'Selected Parameters'}
            variant={'outlined'}
            isReadOnly={true}
            maxElement={1}
          />
          <MultiSelectAutocomplete
            contentLabel="Assets..."
            id='multiple-select-asset-container'
            error={dialogsContent.basicConfiguration.asset.length === 0}
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
            defaultValue={stringRecurrenceFormatting(dialogsContent.basicConfiguration.granularity, dialogsContent.basicConfiguration.repeatDate, dialogsContent.basicConfiguration.repeatDay)}
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
