import React, { useState } from 'react'
import { useTransition, animated } from 'react-spring';
import { Form } from 'react-bootstrap';
import './DetailsConfigurationModal.css'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



const assetItems = ['Asset 1', 'Asset 2', 'Asset 3','Asset 3','Asset 4'];
const TYPE_ASSET = 'Asset';
const granularityItems = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
const TYPE_GRANULARITY = 'Granularity';

const contentObjectValues = {
    title: null,
    asset: null,
    ron: null,
    granularity: null,
    repeatDay: null,
    repeatDate: null,
    repeatTime: null
}

function DetailsConfigurationModal(props) {
    const [granularity, setGranularity] = useState(granularityItems[0]);
    const [asset, setAsset] = useState(assetItems[0]);
    const [screenContent, setScreenContent] = useState(contentObjectValues);
    const [test, setTest] = useState('');
    const handleDropDownSelect = (event, type) => {
        event.preventDefault();
        if(type == TYPE_ASSET) {
            setAsset(event.target.value);
            setScreenContent(...{asset: event.target.value});
        }
        else if(type == TYPE_GRANULARITY){
            setGranularity(event.target.value);
            // setScreenContent(...{granularity: event.target.value});
        }
    }

    const handleTitleEvent = (event) => {
        console.log(event.target.value);
        // setTest(event.target.value);
    }
    
    const InputText = (props) => {
        return (
            <div id = 'element-container'>
                <div id = 'text-container'>
                <p id = 'text'>{props.title}</p>
                </div>
                {!props.drownDown &&
                    <Form.Control type="email"className="text-input-container" onChange={handleTitleEvent} placeholder="Wash Optimization P20" />
                }   
                {props.drownDown &&
                    <Form.Control as="select" onChange = {event => handleDropDownSelect(event, props.type)} value = {props.type == TYPE_ASSET ? screenContent.asset: screenContent.granularity} className="text-input-container"> 
                        {props.items && props.items.map((element) => {
                            return <option>{element}</option>
                        })}
                    </Form.Control>
                }   
            </div>
        );
    }
    // console.log(test)
    return (
            <animated.div id="ModalContainer" style={props.dialogStyle}>
                <div id = 'basic-information-container'>
                    <p>Basic information</p>
                    <InputText title = {'Title: '} drownDown = {false}></InputText>
                    <InputText title = {'Asset: '} drownDown = {true} items = {assetItems} type = {TYPE_ASSET}></InputText>
                    <div id = 'scenario-container'>
                        <p id = 'text-3'>Prefered Scenario: </p>
                        <RadioGroup row aria-label="position" name="position" defaultValue="start">
                        <FormControlLabel
                            value="Return On Investment"
                            control={<Radio color="primary" />}
                            label="Return On Investment"
                            labelPlacement="top"
                            />
                        <FormControlLabel
                            value="Net Saving"
                            control={<Radio color="primary" />}
                            label="Net Saving"
                            labelPlacement="top"
                            />
                            </RadioGroup>
                    </div>          
                </div>
                <div id = 'basic-information-container'>
                    <p>Recurrence</p>
                    <InputText title = {'Granularity: '} drownDown = {true} items = {granularityItems} type = {TYPE_GRANULARITY}></InputText>
                    <div id = 'repeat-container'>
                        <p id = 'text'>Repeat on: </p>
                        {screenContent.granularity == granularityItems[1] &&
                        <ButtonGroup id = 'day-of-week-container' aria-label="small outlined button group">
                            {['S','M', 'T', 'W', 'T', 'F', 'S'].map((element, index) => {
                                return <Button value = {index.toString()} onClick = {() => setScreenContent(... {repeatDay: index})}>{element}</Button>
                            })
                            }
                            {/* <Button value="1" onClick={() => {}}>M</Button>
                            <Button value="2" onClick={() => {}}>T</Button>
                            <Button value="3" onClick={() => {}}>W</Button>
                            <Button value="4" onClick={() => {}}>T</Button>
                            <Button value="5" onClick={() => {}}>F</Button>
                            <Button value="6" onClick={() => {}}>S</Button>
                            <Button value="0" onClick={() => {}}>S</Button> */}
                        </ButtonGroup>
                        }
                        {(screenContent.granularity == granularityItems[2] || screenContent.granularity == granularityItems[3]) &&
                        <div id = 'date-container'>
                        <TextField
                            id="date"
                            type="date"
                            size="small"
                            defaultValue="2020-01-01"
                            onChange={(event) => setScreenContent(... {repeatDate: event.target.value})}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        /> 
                        <div id= 'space-right'></div>
                        </div>
                        }
                        {screenContent.granularity != granularityItems[3] &&
                        <TextField
                            id="time"
                            size="small"
                            type="time"
                            defaultValue="06:30"
                            onChange={(event) => setScreenContent(... {repeatTime: event.target.value})}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            inputProps={{
                            step: 300,
                            }}
                        />
                        }          
                </div>
            </div>
        </animated.div>
    )
}

export default DetailsConfigurationModal
