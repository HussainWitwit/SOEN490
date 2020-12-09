import React from 'react';
import { animated } from 'react-spring';
import { Typography } from '@material-ui/core';
import { TemplateItems } from './ListTemplateItems.ts';
import Divider from '@material-ui/core/Divider';
import './TemplateConfigurationModal.css';
import { connect } from 'react-redux';
import { mapDialogStateToProps, mapDispatchToProps } from '../../redux/AddRecDialogReducer/reducer-actions';

function TemplateConfigurationModal ({ template, dialogStyle, setTemplateName }) {

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
              }}
              isPressed={item.name === template.name}
            />
          ))}
        </div>
        <div id="info-div">
          <div id="item-info1">
            <Typography classes={{ root: 'title-dialog-1' }}>
              Description {template.name}
            </Typography>
            <Typography classes={{ root: 'subtitle-dialog-1' }}>
              This recommendation is used to suggest the optimal time to wash
              your solar panels.
            </Typography>
          </div>
          <Divider classes={{ root: 'divider-item' }} />
          <div id="item-info2">
            <Typography classes={{ root: 'title-dialog-1' }}>Inputs</Typography>
            <ol id="list-align">
              <Typography classes={{ root: 'list-dialog-1' }}>
                <li>Input 1</li>
                <li>Input 2</li>
                <li>Input 3</li>
              </Typography>
            </ol>
          </div>

          <Divider classes={{ root: 'divider-item' }} />
          <div id="item-info4">
            <Typography classes={{ root: 'title-dialog-1' }}>
              Algorithm
            </Typography>
            <Typography classes={{ root: 'subtitle-dialog-1' }}>
              WO Algorithm
            </Typography>
          </div>
        </div>
      </div>
    </animated.div>
  );
}

export default connect(mapDialogStateToProps, mapDispatchToProps)(TemplateConfigurationModal);
