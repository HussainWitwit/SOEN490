import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import TuneRoundedIcon from '@material-ui/icons/TuneRounded';
import EventRoundedIcon from '@material-ui/icons/EventRounded';
import WorkOutlineRoundedIcon from '@material-ui/icons/WorkOutlineRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    outer: props => ({
        backgroundColor: props.backgroundColor
    }),
    nested: props => ({
        paddingLeft: theme.spacing(8),
        color: 'white',
        backgroundColor: props.backgroundColor
    }),
    mainTitles: {
        color: 'white',
        fontSize: '100%',
    },
    icon: {
        color: 'white',
        fontSize: 15,
    },
    settings: {
        color: '#9E9E9E',
        marginLeft: '5%',
        marginTop: '5%',
    },
    inline: {
        display: 'inline',
        color: 'white'
    },
    username: {
        color: 'white'
    },
    hide: {
        display: 'none',
    },
    drawer: props => ({
        width: props.drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        backgroundColor: props.backgroundColor
    }),
    drawerPaper: props => ({
        width: props.drawerWidth,
        backgroundColor: props.backgroundColor
    }),
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function SideMenu () {

    const theme = useTheme();
    const [openNested, setOpenNested] = React.useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
    const [isSelected, setIsSelected] = React.useState(true);
    const props = {
        backgroundColor: '#212529',
        drawerWidth: '18%'
    }
    const classes = useStyles(props);

    const handleClick = (event, index) => {
        setSelectedItemIndex(index);
        setOpenNested(!openNested);
    }

    const handleClickedItem = (event, index) => {
        setIsSelected(true);
        setSelectedItemIndex(index);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer

                variant="permanent"
                className={classes.drawer}
                classes={{ paper: classes.drawerPaper }}>

                <Divider />
                <List >
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Kenzo" src="../assets/images/avatar1.jpeg" />
                        </ListItemAvatar>
                        <ListItemText
                            className={classes.username}
                            primary="Kenzo"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Site Manager
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </List>
                <List>

                    <ListItem
                        style={{ backgroundColor: (isSelected && selectedItemIndex === 0) ? '#4DD3EF' : '#212529' }}
                        button
                        selected={isSelected === true}
                        onClick={(event) => handleClickedItem(event, 0)}
                        className={classes.outer}
                    >
                        <ListItemIcon className={classes.icon}>
                            <DashboardRoundedIcon className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" className={classes.mainTitles} />

                    </ListItem>

                    <ListItem button
                        style={{ backgroundColor: (isSelected && selectedItemIndex === 1) ? '#4DD3EF' : '#212529' }}
                        onClick={(event) => handleClick(event, 1)}
                        selected={selectedItemIndex === 1}>

                        <ListItemIcon className={classes.icon}>
                            <ListAltRoundedIcon className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText primary="Recommendations" className={classes.mainTitles} />
                        {openNested ? <ExpandLess className={classes.icon} /> : <ExpandMore className={classes.icon} />}
                    </ListItem>

                    <Collapse in={openNested} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItem
                                button
                                className={classes.nested}
                                onClick={(event) => handleClickedItem(event, 2)}
                                selected={selectedItemIndex === 2}
                                style={{ color: (isSelected && selectedItemIndex === 2) ? '#4DD3EF' : 'white' }}
                            >
                                <ListItemIcon className={classes.icon}>
                                    <BuildRoundedIcon
                                        className={classes.icon}
                                        style={{ color: (isSelected && selectedItemIndex === 2) ? '#4DD3EF' : 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="Manage" />
                            </ListItem>

                            <ListItem
                                button
                                className={classes.nested}
                                onClick={(event) => handleClickedItem(event, 3)}
                                selected={selectedItemIndex === 3}
                                style={{ color: (isSelected && selectedItemIndex === 3) ? '#4DD3EF' : 'white' }}>
                                <ListItemIcon className={classes.icon}>
                                    <CheckCircleOutlineRoundedIcon
                                        className={classes.icon}
                                        style={{ color: (isSelected && selectedItemIndex === 3) ? '#4DD3EF' : 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="Results" />
                            </ListItem>

                            <ListItem
                                button
                                className={classes.nested}
                                onClick={(event) => handleClickedItem(event, 4)}
                                selected={selectedItemIndex === 4}
                                style={{ color: (isSelected && selectedItemIndex === 4) ? '#4DD3EF' : 'white' }}>
                                <ListItemIcon className={classes.icon}>
                                    <TuneRoundedIcon
                                        className={classes.icon}
                                        style={{ color: (isSelected && selectedItemIndex === 4) ? '#4DD3EF' : 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="Jobs" />
                            </ListItem>

                            <ListItem
                                button
                                className={classes.nested}
                                onClick={(event) => handleClickedItem(event, 5)}
                                selected={selectedItemIndex === 5}
                                style={{ color: (isSelected && selectedItemIndex === 5) ? '#4DD3EF' : 'white' }}>
                                <ListItemIcon className={classes.icon}>
                                    <EventRoundedIcon
                                        style={{ color: (isSelected && selectedItemIndex === 5) ? '#4DD3EF' : 'white' }}
                                        className={classes.icon} />
                                </ListItemIcon>
                                <ListItemText primary="Actions" />
                            </ListItem>

                        </List>
                    </Collapse>

                    <ListItem
                        button
                        className={classes.outer}
                        selected={selectedItemIndex === 6}
                        onClick={(event) => handleClickedItem(event, 6)}
                        style={{ backgroundColor: (isSelected && selectedItemIndex === 6) ? '#4DD3EF' : '#212529' }}>
                        <ListItemIcon className={classes.icon}>
                            <WorkOutlineRoundedIcon className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText primary="Work Orders" className={classes.mainTitles} />
                    </ListItem>

                </List>

                <div className={classes.settings}>
                    <p>Settings</p>
                </div>

                <List>

                    <ListItem button
                        className={classes.outer}
                        selected={selectedItemIndex === 7}
                        onClick={(event) => handleClickedItem(event, 7)}
                        style={{ backgroundColor: (isSelected && selectedItemIndex === 7) ? '#4DD3EF' : '#212529' }}>
                        <ListItemIcon className={classes.icon}>
                            <SettingsRoundedIcon className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText primary="Main Settings" className={classes.mainTitles} />
                    </ListItem>

                    <ListItem button
                        className={classes.outer}
                        selected={selectedItemIndex === 8}
                        onClick={(event) => handleClickedItem(event, 8)}
                        style={{ backgroundColor: (isSelected && selectedItemIndex === 8) ? '#4DD3EF' : '#212529' }}>
                        <ListItemIcon className={classes.icon}>
                            <NotificationsRoundedIcon className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText primary="Notifications" className={classes.mainTitles} />
                    </ListItem>

                </List>

            </Drawer >
        </div >
    );
}