import React from 'react'
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl';
import 'date-fns';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import "./RecommendationConfiguration.css";
import { setTitle, setAsset, setCenterPoint, setSpan } from '../ReduxActions/ParametersConfigurationActions';
import { useSelector, useDispatch } from 'react-redux';
import {batchActions} from 'redux-batched-actions';

const Slide = styled.div`

`;

export const CssTextField = withStyles({

  root: {
    width: '360px',
    color: '252733',
    fontSize: 100,

    '& label.Mui-focused': {
      color: '#868282',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#252733',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#252733',
      },
      '&:hover fieldset': {
        borderColor: '#252733',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#252733',
      },
    },
  },

})(TextField);

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Segoe UI', "Tahoma", "Geneva", "Verdana", "sans-serif"
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const RecommendationConfiguration = (props) => {

  const dispatchTitle = useDispatch();
  const dispatchAsset = useDispatch();
  const dispatchCenterPoint = useDispatch();
  const dispatchSpan = useDispatch();

  // Setting the Title attribute
  const [titleOnChange, setTitleOnChange] = React.useState("");
  const handleTitle = (event) => {
    setTitleOnChange(event.target.value);
  };

  // Setting the Asset attribute
  const [assetOnChange, setAssetOnChange] = React.useState("");
  const handleAsset = (event) => {
    setAssetOnChange(event.target.value);
  }

  // Setting the Parameters attribute
  const [parametersOnChange, setParametersOnChange] = React.useState("");
  const handleParameters = (event) => {
    setParametersOnChange(event.target.value);
  };


  // Seeting the Center Point attribute 
  const [centerPointOnChange, setCenterPointOnChange] = React.useState(null)
  const handleCenterPoint = (event) => {
    setCenterPointOnChange(event.target.value);
  };

  // Seeing the Span attribute
  const [spanOnChange, setSpanOnChange] = React.useState(null);
  const handleSpan = (event) => {
    setSpanOnChange(event.target.value);
  };

  return (
    <Slide>
      <IconButton aria-label="close" id="closeButton" onClick={props.dismiss}>
        <CloseIcon />
      </IconButton>
      <DialogTitle id="form-dialog-title" className="dialogTitle">Recommendation Configuration</DialogTitle>
      <DialogContent className="recConfigPaper">

        <DialogContentText id="recLabel">Title of Recommendation</DialogContentText>
        <CssTextField autoFocus margin="dense" id="name" type="text" placeholder="Wash Optimization P20" onChange={handleTitle}></CssTextField>

        <DialogContent>
          <br></br>
          <div className="onelinerAlign">
            <DialogContentText id="recLabel2">Asset: </DialogContentText>
            <FormControl>
              <NativeSelect
                id="demo-customized-select-native"
                className="recBoxDate"
                value={assetOnChange}
                onChange={handleAsset}
                input={<BootstrapInput />}
              >
                <option aria-label="None" value="" >None</option>
              </NativeSelect>
            </FormControl>
          </div>
        </DialogContent>

        <DialogContent>
          <div className="onelinerAlign">
            <DialogContentText id="recLabel2">Parameters: </DialogContentText>
            <FormControl>
              <NativeSelect
                id="demo-customized-select-native"
                className="recBoxDate"
                value={parametersOnChange}
                onChange={handleParameters}
                input={<BootstrapInput />}
              >
                <option aria-label="None" value="" >None</option>
                <option value={"centerPointSpan"}>Center Point and Span</option>
              </NativeSelect>
            </FormControl>
          </div>
        </DialogContent>

        {parametersOnChange == "centerPointSpan" &&
          <DialogContent>
            <div className="onelinerAlign">
              <DialogContentText id="recLabel3">Center Point Increment: </DialogContentText>
              <TextField
                id="outlined-number"
                className="recBoxNumber"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleCenterPoint}
                variant="outlined"
                size="small"
              />
            </div>
          </DialogContent>
        }
        {parametersOnChange == "centerPointSpan" &&
          <DialogContent>
            <div className="onelinerAlign">
              <DialogContentText id="recLabel3">Span Increment: </DialogContentText>
              <TextField
                id="outlined-number"
                className="recBoxNumber"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleSpan}
                variant="outlined"
                size="small"
              />
            </div>
          </DialogContent>
        }

      </DialogContent>

      <DialogActions>
        <Button id="cancelBtn" onClick={() => props.select(1)}>Back</Button>
        <Button id="nextBtn" onClick={() => {
          props.select(3);
          dispatchTitle(batchActions([setTitle(titleOnChange), setSpan(spanOnChange)], 'DO_BOTH'))
          // dispatchAsset(setAsset(assetOnChange)),
          // dispatchCenterPoint(setCenterPoint(centerPointOnChange)),
          // dispatchSpan(setSpan(spanOnChange))
        }}>Next</Button>
      </DialogActions>

    </Slide>
  )
};

export default RecommendationConfiguration