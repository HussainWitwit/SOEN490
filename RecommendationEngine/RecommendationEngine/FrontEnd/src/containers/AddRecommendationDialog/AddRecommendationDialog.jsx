import React, { useState, useCallback, useEffect } from 'react';
import { useTransition } from 'react-spring';
import Draggable from 'react-draggable';
import { Button, Dialog, DialogActions, DialogContent, Paper, DialogTitle, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import TemplateConfigurationModal from '../../containers/TemplateConfigurationModal/TemplateConfigurationModal';
import DetailsConfigurationModal from '../../containers/DetailsConfigurationModal/DetailsConfigurationModal';
import ParametersConfigurationModal from '../../containers/ParametersConfigurationModal/ParametersConfigurationModal';
import ConfirmationModal from '../../containers/ConfirmationModal/ConfirmationModal';
import './AddRecommendationDialog.css';

const pages = [
  ({ style, updateDialogContent, content }) => <TemplateConfigurationModal content = {content.template} updateContent = {updateDialogContent} dialogStyle={style} />,
  ({ style, updateDialogContent, content}) => <DetailsConfigurationModal content = {content.basicConfiguration} updateContent = {updateDialogContent} dialogStyle={style} />,
  ({ style }) => <ParametersConfigurationModal dialogStyle={style} />,
  ({ style }) => <ConfirmationModal dialogStyle={style} />,
]

const pageTitles = ["Template", "Configuration", "Parameter Configuration", "Confirmation"];

const contentInitialValues = {
  template: 'TESSST',
  basicConfiguration: '',
  parameters: ''
}

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
  const [dialogsContent, setDialogsContent] = useState(contentInitialValues);

  const updateDialogsContent = (value) => {
    if(value.templateName) {
      setDialogsContent({...dialogsContent, template: value});
    }
    else {
      setDialogsContent({...dialogsContent, basicConfiguration: value});
    }
  }

  
  const onClickNext = useCallback(() => {
    setNext(true);
    setIndex(state => (state + 1) % 4);
  }, []);
  const onClickPrevious = useCallback(() => {
    setNext(false);
    setIndex(state => (state - 1) % 4);
  }, []);

  const onNextPreviousTransition = useTransition(index, element => element, {
    reset: true,
    from: { opacity: 0, transform: next ? 'translate3d(100%,0,0)' : 'translate3d(-100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: next ? 'translate3d(-50%,0,0)' : 'translate3d(50%,0,0)' },
  });

  useEffect(() => {
    console.log(dialogsContent);
  }, [dialogsContent])


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
      <DialogTitle style={{ cursor: 'move' }} disableTypography = {false} id="draggable-dialog-title">
        {pageTitles[index]}
      </DialogTitle>
      <DialogContent classes={{
        root: 'dialog-content',
        dividers: false
      }}>
        <div id="mocked-content">
          {onNextPreviousTransition.map(({ item, props, key }) => {
            const Page = pages[item]
            return <Page 
              key={key} 
              style={props} 
              updateDialogContent = {updateDialogsContent}
              content = {dialogsContent}
            />
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