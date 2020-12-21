import React, { useState } from 'react';
import { animated } from 'react-spring';
import { Typography } from '@material-ui/core';
import { TemplateItems } from './ListTemplateItems.ts';
import Divider from '@material-ui/core/Divider';
import './TemplateConfigurationModal.css';
import { connect } from 'react-redux';
import { mapDialogStateToProps, mapDispatchMergedToProps } from '../../redux/AddRecDialogReducer/reducer-actions';


function TemplateConfigurationModal(props) {

  const { templateDetailsList, template, dialogStyle, setTemplateName, setAlgorithmName, setTemplateDescription, setInputList } = props;

  const parameterNameArray = [];

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
        <div id="template-grid" data-testid="template" >
          {templateDetailsList.map((item, index) => (
            <TemplateCard
              data-testid="template-card"
              key={index}
              data-testid="template-inside"
              name={item.templateName}
              icon={TemplateItems[index].listItemIcon}
              onClick={() => {
                setTemplateName(templateDetailsList[index].templateName);
                setTemplateDescription(templateDetailsList[index].templateDescription);
                setAlgorithmName(templateDetailsList[index].algorithmName);
                {
                  templateDetailsList[index].inputList && templateDetailsList[index].inputList.map((inputItem, inputIndex) => (
                    parameterNameArray[inputIndex] = inputItem.parameterName
                  ));
                }
                setInputList((parameterNameArray.length == 0 ? [] : parameterNameArray));
              }}
              isPressed={item.templateName === template.name}
            />
          ))}
        </div>
        <div id="info-div" data-testid="templateinfodiv">
          <Typography classes={{ root: 'title-dialog-0' }}>
            {template.name}
            <Divider classes={{ root: 'divider-item' }} />
          </Typography>
          {template.description && template.description.split(".").map((item, index) => (
            <Typography key={index} classes={{ root: 'subtitle-dialog-1' }}>
              { item != "" ? item + "." : ""}
            </Typography>
          ))}
          <Typography classes={{ root: 'title-dialog-1' }}>
            Parameters Inputs
            <Divider classes={{ root: 'divider-item' }} />
          </Typography>

          {template.inputList.length == 0 &&
            <Typography classes={{ root: 'subtitle-dialog-1' }}>
              No Available Inputs
      </Typography>
          }
          {template.inputList != [] &&
            <ol id="list-align">
              <Typography classes={{ root: 'list-dialog-1' }}>
                {template.inputList && template.inputList.map((item, index) => (
                  <li id="list-item" key={index}>{item}</li>
                ))}
              </Typography>
            </ol>
          }
          <Typography classes={{ root: 'title-dialog-1' }}>
            Algorithm
              <Divider classes={{ root: 'divider-item' }} />
          </Typography>
          <Typography classes={{ root: 'subtitle-dialog-1' }}>
            {template.algorithmName}
          </Typography>
        </div>
      </div>
    </animated.div>
  );
}

export default connect(mapDialogStateToProps, mapDispatchMergedToProps)(TemplateConfigurationModal);
