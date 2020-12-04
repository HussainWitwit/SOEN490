import React, { useState, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';
import Draggable from 'react-draggable';
import { Button, Dialog, DialogActions, DialogContent, Paper, DialogTitle, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import TemplateConfigurationModal from '../../containers/TemplateConfigurationModal/TemplateConfigurationModal';
import DetailsConfigurationModal from '../../containers/DetailsConfigurationModal/DetailsConfigurationModal';
import ParametersConfigurationModal from '../../containers/ParametersConfigurationModal/ParametersConfigurationModal';
import ConfirmationModal from '../../containers/ConfirmationModal/ConfirmationModal';
import './AddRecommendationDialog.css';

const pages = [
  ({ style }) => <TemplateConfigurationModal dialogStyle={style} />,
  ({ style }) => <DetailsConfigurationModal dialogStyle={style} />,
  ({ style }) => <ParametersConfigurationModal dialogStyle={style} />,
  ({ style }) => <ConfirmationModal dialogStyle={style} />,
]

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function AddRecommendationDialog(props) {
  const [index, setIndex] = useState(0);
  const [next, setNext] = useState(true);
  const onClickNext = useCallback(() => {
    setNext(true);
    setIndex(state => (state + 1) % 4);
  }, []);
  const onClickPrevious = useCallback(() => {
    setNext(false);
    setIndex(state => (state - 1) % 4);
  }, []);

  const onNextPreviousTransition = useTransition(index, element => element, {
    // initial: { transform: 'translate3d(0%, 0%,0)' },
    reset: true,
    from: { opacity: 0, transform: next ? 'translate3d(100%,0,0)' : 'translate3d(-100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: next ? 'translate3d(-50%,0,0)' : 'translate3d(50%,0,0)' },
  });

  const initialTransitions = useTransition(index, element => element, {
    from: {
      opacity: 0,
      x: next ? 200 : -200,
    },
    enter: { opacity: 1, x: 0 },
    leave: {
      opacity: 0,
      x: next ? -100 : 100,
    },
    delay: 1
  });


  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      maxWidth={false}
      classes={{
        paper: 'dialog-container'
      }}
    >
      <IconButton aria-label="close" id="closeButton" onClick={props.close}>
        <CloseIcon />
      </IconButton>
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Configuration
        </DialogTitle>
      <DialogContent classes={{
        root: 'dialog-content',
        dividers: false
      }}>
        <div id="mocked-content">
          {onNextPreviousTransition.map(({ item, props, key }) => {
            const Page = pages[item]
            return <Page key={key} style={props} />
          })
          }
        </div>
      </DialogContent>
      <DialogActions>
        <Button id='cancel-btn' onClick={props.close} variant='outlined'>Cancel</Button>
        {index > 0 &&
          <Button id='previous-btn' onClick={onClickPrevious} variant='outlined'>Previous</Button>
        }
        {index <= 2 &&
          <Button id='next-btn' onClick={onClickNext} variant='outlined'>Next</Button>
        }
        {index == 3 &&
          <Button id='next-btn' onClick={props.close} variant='outlined'>Confirm</Button>
        }
      </DialogActions>
    </Dialog>

  );
}