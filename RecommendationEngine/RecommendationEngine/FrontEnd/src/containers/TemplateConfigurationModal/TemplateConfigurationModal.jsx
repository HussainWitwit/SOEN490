import React, { useState } from 'react';
import { animated } from 'react-spring';
import { Typography } from '@material-ui/core';
import { TemplateItems } from './ListTemplateItems.ts';
import Divider from '@material-ui/core/Divider';
import './TemplateConfigurationModal.css';
import { connect } from 'react-redux';
import { mapDialogStateToProps, mapDispatchToProps, mapDispatchMergedToProps } from '../../redux/AddRecDialogReducer/reducer-actions';

function TemplateConfigurationModal({ template, dialogStyle, setTemplateName, templateDetailsList }) {

  const [templateDescription, setTemplateDescription] = useState("This recommendation is used to suggest the optimal time to wash your solar panels. The algorithm takes in consideration:  dates  of soiling seasons, the rate of soiling, the energy price, predicated energy, cost of cleaning and more.");
  const [inputList, setInputList] = useState(["Center Point", "Span Increment", "Soiling Season Buffer", "Acccelerator"]);
  const [algorithmName, setAlgorithmName] = useState("Yearly Wash Optimization Algorithm");

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
                setTemplateDescription(TemplateItems[index].description);
                setAlgorithmName(TemplateItems[index].algorithName);
                setInputList(TemplateItems[index].inputList);

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

export default connect(mapDialogStateToProps, mapDispatchToProps)(TemplateConfigurationModal);
