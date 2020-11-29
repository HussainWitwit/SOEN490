import React, { useState, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';
import Draggable from 'react-draggable';
import { Button, Dialog, DialogActions, DialogContent, Paper, DialogTitle, DialogContentText} from '@material-ui/core';
import TemplateConfigurationModal from '../AddRecommendationDialog/Modals/TemplateConfigurationModal';
import DetailsConfigurationModal from '../AddRecommendationDialog/Modals/DetailsConfigurationModal';
import ParametersConfigurationModal from '../AddRecommendationDialog/Modals/ParametersConfigurationModal';
import ConfirmationModal from '../AddRecommendationDialog/Modals/ConfirmationModal';
import './AddRecommendationDialog.css';


const pages = [
    ({ style }) => <TemplateConfigurationModal dialogStyle={style}/>,
    ({ style }) => <DetailsConfigurationModal dialogStyle={style}/>,
    ({ style }) => <ParametersConfigurationModal dialogStyle={style}/>,
    ({ style }) => <ConfirmationModal dialogStyle={style}/>,
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
        from: { opacity: 0, transform: next ? 'translate3d(100%,0,0)' : 'translate3d(-100%,0,0)'},
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: next ? 'translate3d(-50%,0,0)': 'translate3d(50%,0,0)'},
    });

    const initialTransitions = useTransition(index, element => element, {
        from: {
            opacity: 0,
            x:  next ? 200 : -200,
          },
          enter: { opacity: 1, x: 0 },
          leave: {
            opacity: 0,
            x:  next ? -100 : 100,
          },
          delay: 1
    });


    return (
        <Dialog
        open={props.open}
        onClose={props.close}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        maxWidth = {false}
        classes = {{
            paper: 'dialog-container'
        }}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Configuration 
        </DialogTitle>
        <DialogContent classes = {{
            root: 'dialog-content',
            dividers: false
        }}>
        <div className = 'mocked-content'>
            {onNextPreviousTransition.map(({ item, props, key }) => {
                    const Page = pages[item]
                    return <Page key={key} style={props} />
                })
            }
        </div>
        </DialogContent>
        <DialogActions>
            <Button id = 'cancel-btn' onClick={props.close} variant = 'outlined'>Cancel</Button>
            {index > 0 &&
                <Button id = 'previous-btn' onClick={onClickPrevious} variant = 'outlined'>Previous</Button>
            }
            {index <= 2 &&
                <Button id = 'next-btn' onClick={onClickNext} variant = 'outlined'>Next</Button>
            }
            {index == 3 &&
                <Button id = 'next-btn' onClick={props.close} variant = 'outlined'>Confirm</Button>
            }
        </DialogActions>
      </Dialog>
 
    );
}