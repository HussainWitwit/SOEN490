import React, { useState } from 'react';
import { animated } from 'react-spring';
import { Typography } from '@material-ui/core';
import { TemplateItems } from './ListTemplateItems.ts';
import Divider from '@material-ui/core/Divider';
import './TemplateConfigurationModal.css';
import { connect } from 'react-redux';
import { mapDialogStateToProps, mapDispatchMergedToProps } from '../../redux/AddRecDialogReducer/reducer-actions';

function TemplateConfigurationModal(props) {

  const {templateDetailsList, template, dialogStyle, setTemplateName} = props;

  const defaultParameterNameArray = [];
  const parameterNameArray = [];

  const [templateDescription, setTemplateDescription] = useState(templateDetailsList[0].templateDescription);
  templateDetailsList[0].inputList.map((item,index) => (
    defaultParameterNameArray[index] = item.parameterName
  ));
  const [inputList, setInputList] = useState(defaultParameterNameArray);
  const [algorithmName, setAlgorithmName] = useState(templateDetailsList[0].algorithmName);

  const TemplateCard = (props) => {
    return (
      <div
        id={
          props.isPressed ? 'item-template-selected' : 'item-template-default'
        }
        onClick={props.onClick}
      >
        <div data-testid="template-label">
          <props.icon id="template-icon" />
        </div>
        <Typography id="template-label">{props.name}</Typography>
      </div>
    );
  };

  return (
    <animated.div id="template-modal-container" style={dialogStyle}>
      <div data-testid="templates" id="parent-div">
        <div id="template-grid" data-testid="template">
          {TemplateItems.map((item, index) => (
            <TemplateCard
              data-testid="template-inside"
              name={item.name}
              icon={item.listItemIcon}
              onClick={() => {
                setTemplateName(TemplateItems[index].name);
                setTemplateDescription(templateDetailsList[index].templateDescription);
                setAlgorithmName(templateDetailsList[index].algorithmName);
                templateDetailsList[index].inputList.map((inputItem, inputIndex) => (
                  parameterNameArray[inputIndex] = inputItem.parameterName
                ));
                setInputList(parameterNameArray);
              }}
              isPressed={item.name === template.name}
            />
          ))}
        </div>


        <div id="info-div">
          <div id="item-info1">
            <Typography classes={{ root: 'title-dialog-0' }}>
            {template.name}
            </Typography>

            {templateDescription.split(".").map((item, index) => (

              <Typography classes={{ root: 'subtitle-dialog-1' }}>
                {item}
              </Typography>

            ))}

          </div>
          <Divider classes={{ root: 'divider-item' }} />
          <div id="item-info2">
            <Typography classes={{ root: 'title-dialog-1' }}>Parameters Inputs</Typography>
            <ol id="list-align">
              <Typography classes={{ root: 'list-dialog-1' }}>
                {inputList.map((item) => (
                  <li>{item}</li>
                ))}

              </Typography>
            </ol>
          </div>

          <Divider classes={{ root: 'divider-item' }} />
          <div id="item-info3">
            <Typography classes={{ root: 'title-dialog-1' }}>
              Algorithm
            </Typography>
            <Typography classes={{ root: 'subtitle-dialog-1' }}>
              {algorithmName}
            </Typography>
          </div>
        </div>

      </div>
    </animated.div>
  );
}

export default connect(mapDialogStateToProps, mapDispatchMergedToProps)(TemplateConfigurationModal);
