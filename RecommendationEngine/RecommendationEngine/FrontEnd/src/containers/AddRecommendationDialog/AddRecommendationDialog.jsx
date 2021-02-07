import React, { useState, useCallback, useEffect } from 'react';
import { useTransition } from 'react-spring';
import Draggable from 'react-draggable';
import {
  Button, Dialog, DialogActions, DialogContent, Paper, DialogTitle, IconButton, Slide
} from '@material-ui/core';
import { connect } from 'react-redux';
import { mapDialogStateToProps, mapDispatchToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import CloseIcon from '@material-ui/icons/Close';
import TemplateConfigurationModal from '../../containers/TemplateConfigurationModal/TemplateConfigurationModal';
import DetailsConfigurationModal from '../../containers/DetailsConfigurationModal/DetailsConfigurationModal';
import ParametersConfigurationModal from '../../containers/ParametersConfigurationModal/ParametersConfigurationModal';
import ConfirmationModal from '../../containers/ConfirmationModal/ConfirmationModal';
import { transformParameterListPost } from '../../utilities/ArrayManipulationUtilities';
import './AddRecommendationDialog.css';

const pages = [
  ({ style }) => (
    <TemplateConfigurationModal
      dialogStyle={style}
    />
  ),
  ({ style }) => (
    <DetailsConfigurationModal
      dialogStyle={style}
    />
  ),
  ({ style }) => <ParametersConfigurationModal dialogStyle={style} />,
  ({ style }) => <ConfirmationModal dialogStyle={style} />,
];

const pageTitles = [
  'Template Selection',
  'Recommendation Configuration',
  'Parameters Configuration',
  'Confirmation',
];

export function PaperComponent (props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function AddRecommendationDialog (props) {
  const { dialogsContent, setBackToInitialValues, postConfiguredRecommendation } = props;
  const { isDialogOpen, basicConfiguration, template, isEditing, id } = dialogsContent;

  const [index, setIndex] = useState(0);
  const [next, setNext] = useState(true);

  const onClickNext = useCallback(() => {
    setNext(true);
    setIndex((state) => (state + 1) % 4);
  }, []);
  const onClickPrevious = useCallback(() => {
    setNext(false);
    setIndex((state) => (state - 1) % 4);
  }, []);

  const onNextPreviousTransition = useTransition(index, (element) => element, {
    reset: true,
    from: {
      opacity: 0,
      transform: next ? 'translate3d(100%,0,0)' : 'translate3d(-100%,0,0)',
    },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: {
      opacity: 0,
      transform: next ? 'translate3d(-50%,0,0)' : 'translate3d(50%,0,0)',
    },
  });

  const closeDialog = () => {
    setBackToInitialValues();
    setIndex(0);
  }

  //Post method
  const confirmDialogEvent = async () => {
    await postConfiguredRecommendation({
      type: template.name,
      name: basicConfiguration.title,
      granularity: basicConfiguration.granularity,
      createdBy: basicConfiguration.createdBy,
      createdOn: new Date(),
      preferredScenario: basicConfiguration.preferredScenario,
      recurrenceDayOfWeek: basicConfiguration.repeatDay,
      parameters: transformParameterListPost(template.inputList),
      modifiedBy: '',
      recurrenceDatetime: basicConfiguration.granularity === "Weekly" ? basicConfiguration.repeatTime : basicConfiguration.repeatDate,
      assetIdList: basicConfiguration.asset.map((e) => {
        return e.id;
      }),

    }, { isEditing: isEditing, id: id });
    closeDialog();
  }

  useEffect(() => {
    if (isEditing) {
      setIndex(1);
    }
  }, [isEditing])

  return (
    <Dialog
      data-testid="dialog"
      open={isDialogOpen}
      onClose={closeDialog}
      disableBackdropClick={true}
      PaperComponent={PaperComponent}
      TransitionComponent={Transition}
      aria-labelledby="draggable-dialog-title"
      maxWidth={false}
      classes={{
        paper: 'dialog-container',
      }}
    >
      <IconButton aria-label="close" id="closeButton" onClick={closeDialog}>
        <CloseIcon />
      </IconButton>
      <DialogTitle
        style={{ cursor: 'move' }}
        disableTypography={false}
        id="draggable-dialog-title"
      >
        {pageTitles[index]}
      </DialogTitle>
      <DialogContent
        classes={{
          root: 'dialog-content',
          dividers: false,
        }}
      >
        <div id="mocked-content">
          {onNextPreviousTransition.map(({ item, props, key }) => {
            const Page = pages[item];
            return (<Page key={key} style={props} />);
          })}
        </div>
      </DialogContent>
      <DialogActions>
        <Button data-testid="cancel-button" id="cancel-btn" onClick={closeDialog} variant="outlined">
          Cancel
        </Button>
        {(index === 1 && !isEditing) && (
          <Button
            data-testid="previous-button"
            id="previous-btn"
            onClick={onClickPrevious}
            variant="outlined"
          >
            Previous
          </Button>
        )
        }
        {index > 1 && (
          <Button
            data-testid="previous-button"
            id="previous-btn"
            onClick={onClickPrevious}
            variant="outlined"
          >
            Previous
          </Button>
        )}
        {index === 0 && (
          <Button id="next-btn" onClick={onClickNext} variant="outlined" disabled={!template.name}>
            Next
          </Button>
        )}
        {(index <= 2 && index > 0) && (
          <Button id="next-btn" onClick={onClickNext} variant="outlined" disabled={!basicConfiguration.title || basicConfiguration.asset === null || basicConfiguration.preferredScenario === null}>
            Next
          </Button>
        )}
        {index === 3 && (
          <Button id="next-btn" data-testid="confirm-button" onClick={confirmDialogEvent} variant="outlined" disabled={!basicConfiguration.title || (basicConfiguration.asset != null && basicConfiguration.asset.length === 0)}>
            {isEditing ? "Save" : "Confirm"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default connect(mapDialogStateToProps, mapDispatchToProps)(AddRecommendationDialog)