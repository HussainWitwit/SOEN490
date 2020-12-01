import React, { useState } from 'react'
import { animated } from 'react-spring';
import { Typography } from '@material-ui/core';
import './TemplateConfigurationModal.css'
import { TemplateItems } from './ListTemplateItems.ts';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

function TemplateConfigurationModal(props) {

    const [itemPressed, setItemPressed] = useState("");

    const TemplateCard = (props) => {
        return (
            <div id="item-template" onClick={props.onClick}>
                <div>
                    <props.icon id="template-icon" />
                </div>
                <div>
                    <Typography classes={{ root: 'template-label' }}>{props.name}</Typography>
                </div>
            </div>
        );
    }

    return (
        <animated.div id="modal-container" style={props.dialogStyle}>
            <div id="parent-div">
                <div id="template-grid">
                    {TemplateItems.map((item, index) => (
                        <TemplateCard name={item.name}
                            icon={item.listItemIcon}
                            onClick={() => setItemPressed(item.name)}
                        />))}
                </div>
                <div id="info-div">



                    <div id="item-info1"> 
                    <Typography classes={{ root: 'title-dialog-1' }}>Description {itemPressed == "" ? "" : "of " + itemPressed}</Typography>
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
                    <div id="item-info3">
                    <Typography classes={{ root: 'title-dialog-1' }}>Assets</Typography>
                    <Typography classes={{ root: 'subtitle-dialog-1' }}>Solar Panels</Typography>
                    </div>
                    <Divider classes={{ root: 'divider-item' }} />
                    <div id="item-info4">
                    <Typography classes={{ root: 'title-dialog-1' }}>Algorithm</Typography>
                    <Typography classes={{ root: 'subtitle-dialog-1' }}>WO Algorithm</Typography>
                    </div>
                    {/* <List>
                        <ListItem>
                            <Typography classes={{ root: 'title-dialog-1' }}>Description {itemPressed == "" ? "" : "of " + itemPressed}</Typography>
                            <ul id="item-align">
                                <li id="list-item">
                                    <Typography classes={{ root: 'subtitle-dialog-1' }}>
                                        This recommendation is used to suggest the optimal time to wash your solar panels.
                                    </Typography>
                                </li>
                            </ul>
                            <p>Yo</p>
                            <p>Test</p>
                        </ListItem>
                        <Divider classes={{ root: 'divider-item' }} />
                        <ListItem>
                            <Typography classes={{ root: 'title-dialog-1' }}>Inputs</Typography>
                            <ol id="list-align">
                                <Typography classes={{ root: 'subtitle-dialog-1' }}>
                                    <li>Input 1</li>
                                    <li>Input 2</li>
                                    <li>Input 3</li>
                                </Typography>
                            </ol>
                        </ListItem>
                        <Divider classes={{ root: 'divider-item' }} />
                        <ListItem>
                            <Typography classes={{ root: 'title-dialog-1' }}>Assets</Typography>
                            <ul id="item-align">
                                <li id="list-item">
                                    <Typography classes={{ root: 'subtitle-dialog-1' }}>
                                        Solar Panels
                                    </Typography>
                                </li>
                            </ul>
                        </ListItem>
                        <Divider classes={{ root: 'divider-item' }} />
                        <ListItem>
                            <Typography classes={{ root: 'title-dialog-1' }}>Algorithm</Typography>
                            <ul id="item-align">
                                <li id="list-item">
                                    <Typography classes={{ root: 'subtitle-dialog-1' }}>
                                        WO Algorithm
                                        </Typography>
                                </li>
                            </ul>
                        </ListItem>
                    </List> */}
                </div>
            </div>

        </animated.div>
    )
}

export default TemplateConfigurationModal
