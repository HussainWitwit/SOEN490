import React, { useState, useEffect } from 'react'
import { animated } from 'react-spring';
import { Typography } from '@material-ui/core';
import { TemplateItems } from './ListTemplateItems.ts';
import Divider from '@material-ui/core/Divider';
import './TemplateConfigurationModal.css';


function TemplateConfigurationModal(props) {


    const [itemPressedIndex, setItemPressedIndex] = useState(0);
    const [screenContentSelection, setScreenContentSelection] = useState(props.content ? props.content: {templateName: TemplateItems[itemPressedIndex].name});

    const TemplateCard = (props) => {
        return (
          <div id={props.isPressed ? 'item-template-selected': 'item-template-default'} onClick={props.onClick}>
            <div >
              <props.icon id="template-icon" />
            </div>
              <Typography id ='template-label' >
                {props.name}
              </Typography>
          </div>
        );
    }
    useEffect(() => {
        // setScreenContentSelection({templateName: TemplateItems[itemPressedIndex].name});
        props.updateContent({templateName: TemplateItems[itemPressedIndex].name});
    }, [screenContentSelection])

    return (
        <animated.div id="template-modal-container" style={props.dialogStyle}>
            <div id="parent-div">
                <div id="template-grid">
                    {TemplateItems.map((item, index) => (

                        <TemplateCard
                        name={item.name}
                        icon={item.listItemIcon}
                        onClick={() => {
                            setItemPressedIndex(index); 
                            setScreenContentSelection({templateName: TemplateItems[index].name});
                        }}
                        isPressed={index === itemPressedIndex}
                        />

                    ))}
                </div>
                <div id="info-div">
                    <div id="item-info1">
                    <Typography classes={{ root: 'title-dialog-1' }}>Description {TemplateItems[itemPressedIndex].name}</Typography>
                        <Typography classes={{ root: 'subtitle-dialog-1' }}>This recommendation is used to suggest the optimal time to wash your solar panels.</Typography>
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
                        <Typography classes={{ root: 'title-dialog-1' }}>Algorithm</Typography>
                        <Typography classes={{ root: 'subtitle-dialog-1' }}>WO Algorithm</Typography>
                    </div>
                </div>
            </div>

        </animated.div>
    )
}

export default TemplateConfigurationModal;
