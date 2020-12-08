import React, { useState, useCallback, useEffect } from 'react';
import { useTransition } from 'react-spring';
import Draggable from 'react-draggable';
import {
  Button, Dialog, DialogActions, DialogContent, Paper, DialogTitle, IconButton, Fade, Slide
} from '@material-ui/core';
import { connect } from 'react-redux';
import { mapDialogStateToProps, mapDispatchMergedToProps } from '../../redux/AddRecDialogReducer/reducer-actions';
import CloseIcon from '@material-ui/icons/Close';
import TemplateConfigurationModal from '../../containers/TemplateConfigurationModal/TemplateConfigurationModal';
import DetailsConfigurationModal from '../../containers/DetailsConfigurationModal/DetailsConfigurationModal';
import ParametersConfigurationModal from '../../containers/ParametersConfigurationModal/ParametersConfigurationModal';
import ConfirmationModal from '../../containers/ConfirmationModal/ConfirmationModal';
import './AddRecommendationDialog.css';

const pages = [
  ({ style, updateDialogContent }) => (
    <TemplateConfigurationModal
      updateContent={updateDialogContent}
      dialogStyle={style}
    />
  ),
  ({ style, updateDialogContent }) => (
    <DetailsConfigurationModal
      updateContent={updateDialogContent}
      dialogStyle={style}
    />
  ),
  ({ style }) => <ParametersConfigurationModal dialogStyle={style} />,
  ({ style }) => <ConfirmationModal dialogStyle={style} />,
];

const pageTitles = [
  'Template',
  'Configuration',
  'Parameter Configuration',
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

function AddRecommendationDialog (props) {
  const { clear, isDialogOpen, all, basicConfiguration, template, postConfiguredRecommendation} = props;
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
    clear();
    setIndex(0);
  }
  //Post method
  const confirmDialogEvent = async () => {
    postConfiguredRecommendation({
        type: template.name,
        name: basicConfiguration.title,
        granularity: basicConfiguration.granularity,
        createdBy: basicConfiguration.createdBy,
        recurrenceDayOfWeek: basicConfiguration.repeatDay,
        recurrenceDatetime: basicConfiguration.repeatDate, //Not correct format,
        assetIdList: basicConfiguration.asset.map((e) => { //Could perhaps have it in store...Also duplicated with assets:Asset[]
          return e.id;
        })
    })
  }

  useEffect(() => {
    console.log(all);
  }, [all]);

  return (
    <Dialog
      data-testid="dialog"
      open={isDialogOpen}
      onClose={closeDialog}
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
        <Button id="cancel-btn" onClick={closeDialog} variant="outlined">
          Cancel
        </Button>
        {index > 0 && (
          <Button
            data-testid="cancel-button"
            id="previous-btn"
            onClick={onClickPrevious}
            variant="outlined"
          >
            Previous
          </Button>
        )}
        {index <= 2 && (
          <Button id="next-btn" onClick={onClickNext} variant="outlined">
            Next
          </Button>
        )}
        {index === 3 && (
          <Button id="next-btn" onClick={() => { }} variant="outlined">
            Confirm
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
export default connect(mapDialogStateToProps, mapDispatchMergedToProps)(AddRecommendationDialog)