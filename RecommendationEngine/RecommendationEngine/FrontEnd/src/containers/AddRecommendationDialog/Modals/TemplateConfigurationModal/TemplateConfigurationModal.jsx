import React from 'react'
import { useTransition, animated } from 'react-spring';
import { Card, CardContent, Typography, CardMedia, Grid } from '@material-ui/core';
import DialogContentText from '@material-ui/core/DialogContentText';
import './TemplateConfigurationModal.css'
import { TemplateItems } from './ListTemplateItems.ts';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

function TemplateConfigurationModal(props) {

    const TemplateCard = (props) => {
        return (
            <div id="item">
                <div>
                <Typography classes={{ root: 'title-label' }}>{props.name}</Typography>
                </div>
                <div>
                <props.icon id="templateIcon" />
                </div>
               
                
            </div>);
    }
    return (
        <animated.div id="modal-container" style={props.dialogStyle}>
            <div id="parent-div">
                <div id="grid">
                    {TemplateItems.map((item, index) => (<TemplateCard name={item.name} icon={item.listItemIcon} />))}
                part 1
                </div>
                <div id="info-div">
                    <List>
                       
                        <ListItem>
                            <div className="onelinerAlign2">
                                <DialogContentText id="templateLabel2">
                                    <DialogContentText id="templateLabel">Description</DialogContentText>
                                    <ul className="listAlign">
                                        <li>This recommendation is used to suggest the optimal time to wash your solar panels.</li>
                                    </ul>
                                </DialogContentText>
                            </div>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <div className="onelinerAlign2">
                                <DialogContentText id="templateLabel2">
                                    <DialogContentText id="templateLabel">Inputs</DialogContentText>
                                    <ul className="listAlign">
                                        <li>Input 1</li>
                                        <li>Input 2</li>
                                        <li>Input 3</li>
                                    </ul>
                                </DialogContentText>
                            </div>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <div className="onelinerAlign2">
                                <DialogContentText id="templateLabel2">
                                    <DialogContentText id="templateLabel">Assets</DialogContentText>
                                    <ul className="listAlign">
                                        <li>Solar Panels</li>
                                    </ul>
                                </DialogContentText>
                            </div>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <div className="onelinerAlign2">
                                <DialogContentText id="templateLabel2">
                                    <DialogContentText id="templateLabel">Algorithm</DialogContentText>
                                    <ul className="listAlign">
                                        <li>WO Algorithm</li>
                                    </ul>
                                </DialogContentText>
                            </div>
                        </ListItem>
                    </List>

                </div>
            </div>

        </animated.div>
    )
}

export default TemplateConfigurationModal
