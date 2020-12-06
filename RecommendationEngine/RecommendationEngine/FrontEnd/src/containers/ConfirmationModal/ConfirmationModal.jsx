import React from 'react';
import { animated } from 'react-spring';
import TextField from '@material-ui/core/TextField';
import MultiSelectAutocomplete from '../../components/MultiSelectAutocomplete/MultiSelectAutocomplete';
import { connect } from 'react-redux';
import {
  mapDialogStateToProps,
  mapDispatchToProps,
} from '../AddRecommendationDialog/redux/reducer-actions';
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

// const requestOptions = {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     name: '',
//     type: 'Yearly Wash Optimization',
//     recurrenceDayOfWeek: '',
//     createdOn: new Date().toJSON(),
//     createdBy: '',
//     recurrenceDateTime: '2025-01-01T' + hourRepeated + ':00',
//     granularity: '',
//     parameters: null,
//   }),
// };

function ConfirmationModal(props) {
  const { dialogStyle, dialogsContent } = props;

  // const [postResponse, setPostResponse] = React.useState(null);
  // //FIXME: Syntax Errror here
  // const postAddRecommendation = () => {
  //   fetch('http://localhost:5000/ConfiguredRecommendation/add/', requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => setPostResponse({ postResultId: data.id }));
  // };

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
              disableUnderline: true,
            }}
          />
          <MultiSelectAutocomplete
            contentLabel="Parameters..."
            items={parameters}
            defaultValue={assets}
            boxLabelName={'Parameters'}
            variant={'outlined'}
            isReadOnly={true}
            maxElement={1}
          />
          <MultiSelectAutocomplete
            contentLabel="Assets..."
            items={assets}
            defaultValue={dialogsContent.basicConfiguration.asset}
            boxLabelName={'Assets'}
            variant={'outlined'}
            isReadOnly={true}
            maxElement={10}
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

export default connect(
  mapDialogStateToProps,
  mapDispatchToProps
)(ConfirmationModal);
