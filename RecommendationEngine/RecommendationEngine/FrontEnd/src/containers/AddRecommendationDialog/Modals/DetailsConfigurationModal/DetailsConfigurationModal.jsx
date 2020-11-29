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

function DetailsConfigurationModal(props) {
    const [granularity, setGranularity] = useState(granularityItems[0]);
    const [asset, setAsset] = useState(assetItems[0]);
    const RadioButtonChoice = (props) => {
        return (
            <div id = 'element-container'>
                 <Form.Check type="radio" aria-label="radio 1" />
            </div>
        );
    }

    const handleDropDownSelect = (event, type) => {
        event.preventDefault();
        if(type == TYPE_ASSET) {
            setAsset(event.target.value);
        }
        else if(type == TYPE_GRANULARITY){
            setGranularity(event.target.value);
        }
    }
    
    const InputText = (props) => {
        return (
            <div id = 'element-container'>
                <p id = 'text'>{props.title}</p>
                {!props.drownDown &&
                <Form.Control type="email" className="text-input-container" onChange={() => {}} placeholder="Wash Optimization P20" />
                }   
                {props.drownDown &&
                    <Form.Control as="select" onChange = {event => handleDropDownSelect(event, props.type)} value = {props.type == TYPE_ASSET ? asset: granularity} className="text-input-container"> 
                        {props.items && props.items.map((element) => {
                            return <option>{element}</option>
                        })}
                    </Form.Control>
                }   
            </div>
        );
    }
    return (
            <animated.div id="ModalContainer" style={props.dialogStyle}>
                <div id = 'basic-information-container'>
                    <p>Basic information</p>
                    <InputText title = {'Title: '} drownDown = {false}></InputText>
                    <InputText title = {'Asset: '} drownDown = {true} items = {assetItems} type = {TYPE_ASSET}></InputText>
                    <div id = 'scenario-container'>
                        <p id = 'text'>Prefered Scenario: </p>
                        <RadioGroup row aria-label="position" name="position" defaultValue="start">
                        <FormControlLabel
                            value="Return On Investment"
                            control={<Radio color="primary" />}
                            label="Return On Investment"
                            labelPlacement="start"
                            />
                        <FormControlLabel
                            value="Net Saving"
                            control={<Radio color="primary" />}
                            label="Net Saving"
                            labelPlacement="start"
                            />
                            </RadioGroup>
                    </div>          
                </div>
                <div id = 'basic-information-container'>
                    <p>Recurrence</p>
                    <InputText title = {'Granularity: '} drownDown = {true} items = {granularityItems} type = {TYPE_GRANULARITY}></InputText>
                    <div id = 'repeat-container'>
                        <p id = 'text-2'>Repeat on: </p>
                        {granularity == granularityItems[1] &&
                        <ButtonGroup id = 'day-of-week-container' aria-label="small outlined button group">
                            <Button value="1" onClick={() => {}}>M</Button>
                            <Button value="2" onClick={() => {}}>T</Button>
                            <Button value="3" onClick={() => {}}>W</Button>
                            <Button value="4" onClick={() => {}}>T</Button>
                            <Button value="5" onClick={() => {}}>F</Button>
                            <Button value="6" onClick={() => {}}>S</Button>
                            <Button value="0" onClick={() => {}}>S</Button>
                        </ButtonGroup>
                        }
                        {(granularity == granularityItems[2] || granularity == granularityItems[3]) &&
                        <TextField
                            id="date"
                            type="date"
                            size="small"
                            defaultValue="2020-01-01"
                            className="timePickerTextfield"
                            onChange={() => {}}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        }
                        {granularity != granularityItems[3] &&
                        <TextField
                            id="time"
                            size="small"
                            type="time"
                            defaultValue="07:30"
                            className="timePickerTextfield"
                            onChange={() => {}}
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
