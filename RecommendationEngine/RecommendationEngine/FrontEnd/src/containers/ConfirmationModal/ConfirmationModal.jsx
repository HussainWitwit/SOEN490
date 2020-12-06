import React from 'react'
import { animated } from 'react-spring';
import TextField from '@material-ui/core/TextField';
import MultiSelectAutocomplete from '../../components/MultiSelectAutocomplete/MultiSelectAutocomplete';
import { connect } from 'react-redux';
import { mapDialogStateToProps, mapDispatchToProps } from '../AddRecommendationDialog/redux/reducer-actions';
import './ConfirmationModal.css';

// TODO: fetch real assets
const assets = [
  { title: 'The Shawshank Redemption', year: 1994 },
   { title: 'The Godfather', year: 1972 },
   { title: 'The Godfather: Part II', year: 1974 },
   { title: 'The Godfather: Part II', year: 1974 },
   { title: 'The Godfather: Part II', year: 1974 },
   { title: 'The Godfather: Part II', year: 1974 },
   { title: 'The Godfather: Part II', year: 1974 },
   { title: 'The Godfather: Part II', year: 1974 },
   { title: 'The Godfather: Part II', year: 1974 },
   { title: 'The Godfather: Part II', year: 1974 },
   { title: 'The Godfather: Part II', year: 1974 },
 ];

const parameters = [{ title: 'To Come', year: 1994 }];

function ConfirmationModal(props) {
  const {dialogStyle, dialogsContent} = props;

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
              label="Algorithm"
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
                  disableUnderline: true
                }}
              />
            <MultiSelectAutocomplete 
              contentLabel = "Parameters..." 
              items = {parameters} 
              defaultValue = {assets}
              boxLabelName = {"Parameters"}
              variant = {"outlined"}
              isReadOnly = {true}
              maxElement = {1}
              />
            <MultiSelectAutocomplete 
              contentLabel = "Assets..." 
              items = {assets} 
              defaultValue = {dialogsContent.basicConfiguration.asset}
              boxLabelName = {"Assets"}
              variant = {"outlined"}
              isReadOnly = {true}
              maxElement = {10}
              />
               <TextField
              id="outlined-read-only-recurrence"
              label="Recurrence"
              defaultValue={`${dialogsContent.basicConfiguration.granularity}, ${dialogsContent.basicConfiguration.repeatDate}, ${dialogsContent.basicConfiguration.repeatDay}, ${dialogsContent.basicConfiguration.repeatDate}, ${dialogsContent.basicConfiguration.repeatTime}`}
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

export default connect(mapDialogStateToProps, mapDispatchToProps)(ConfirmationModal);
