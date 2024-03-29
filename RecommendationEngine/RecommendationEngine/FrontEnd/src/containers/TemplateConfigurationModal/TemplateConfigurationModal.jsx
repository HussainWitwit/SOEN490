import React from 'react';
import { animated } from 'react-spring';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { FaSolarPanel } from 'react-icons/fa';
import { BsFillGearFill } from 'react-icons/bs';
import { GiBatteryPackAlt } from 'react-icons/gi';
import { BiShapeTriangle } from 'react-icons/bi';
import { VscCircuitBoard } from 'react-icons/vsc';
import { GoCalendar } from 'react-icons/go';
import './TemplateConfigurationModal.css';
import { connect } from 'react-redux';
import { mapDialogStateToProps, mapDispatchToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import PropTypes from 'prop-types';

function TemplateConfigurationModal (props) {

  const { dialogsContent, dialogStyle, setRecommendationType } = props;
  const { templateDetailsList, template } = dialogsContent;

  const TemplateIcon1 = FaSolarPanel;
  const TemplateIcon2 = GoCalendar;
  const TemplateIcon3 = BsFillGearFill;
  const TemplateIcon4 = GiBatteryPackAlt;
  const TemplateIcon5 = BiShapeTriangle;
  const TemplateIcon6 = VscCircuitBoard;

  const iconsList = [TemplateIcon1, TemplateIcon2, TemplateIcon3, TemplateIcon4, TemplateIcon5, TemplateIcon6];

  const TemplateCard = (innerProps) => {
    return (
      <div
        id={
          innerProps.isPressed ? 'item-template-selected' : 'item-template-default'
        }
        onClick={innerProps.onClick}
      >
        <div data-testid="template-label">
          <innerProps.icon id="template-icon" />
        </div>
        <Typography id="template-label">{innerProps.name}</Typography>
      </div>
    );
  };

  return (
    <animated.div id="template-modal-container" style={dialogStyle}>
      <div data-testid="templates" id="parent-div">
        <div id="template-grid" data-testid="template" >
          {templateDetailsList.map((item, index) => (
            <TemplateCard
              key={index}
              name={item.templateName}
              icon={iconsList[index]}
              onClick={() => {
                setRecommendationType(item)
              }}
              isPressed={item.templateName === template.name}
            />
          ))}
        </div>
        <div id="info-div" data-testid="templateinfodiv">
          <Typography component={'span'} classes={{ root: 'title-dialog-0' }}>
            {templateDetailsList.length ? template.name : "No template available"}
            <Divider classes={{ root: 'divider-item' }} />
          </Typography>
          {template.description && template.description.split(".").map((item, index) => (
            <Typography key={index} component={'span'} classes={{ root: 'subtitle-dialog-1' }}>
              { item !== "" ? item + "." : ""}
            </Typography>
          ))}
          <Typography component={'span'} classes={{ root: 'title-dialog-1' }}>
            Parameters Inputs
            <Divider classes={{ root: 'divider-item' }} />
          </Typography>

          {template.inputList.length === 0 &&
            <Typography component={'span'} classes={{ root: 'subtitle-dialog-1' }}>
              No Available Inputs
      </Typography>
          }
          {template.inputList !== [] &&
            <ol id="list-align">
              <Typography component={'span'} classes={{ root: 'list-dialog-1' }}>
                {template.inputList && template.inputList.map((item, index) => (
                  <li id="list-item" key={index}>{item.displayText}</li>
                ))}
              </Typography>
            </ol>
          }
          <Typography component={'span'} classes={{ root: 'title-dialog-1' }}>
            Algorithm
              <Divider classes={{ root: 'divider-item' }} />
          </Typography>
          <Typography component={'span'} classes={{ root: 'subtitle-dialog-1' }}>
            {template.algorithmName}
          </Typography>
        </div>
      </div>
    </animated.div>
  );
}

export default connect(mapDialogStateToProps, mapDispatchToProps)(TemplateConfigurationModal);

/* istanbul ignore next */
TemplateConfigurationModal.propTypes = {
  dialogsContent: PropTypes.object.isRequired,
  dialogStyle: PropTypes.object,
  setRecommendationType: PropTypes.func.isRequired,
}
