import { makeStyles } from '@material-ui/core/styles';

export const DrawerStyled = makeStyles((theme) => ({
    drawerBox : {
        background: '#424242', //
        width: 200
    },
    pinIconButtonOn: {
        fontSize: 13,
        color: 'grey',
        transform: 'rotate(90)',
        transition: "all 0.5s"
    },
    pinIconButtonOff: {
        color: 'yellow',
        fontSize: 10, //gets overriden for some reason
        // width: '1em',
        // height: '1em',
        // transform: 'rotate(0)',
        // transition: 'all 0.5s'
    },
}));

export const ButtonStyled = makeStyles((theme) => ({
    drawerButton : {
        backgroundColor: 'red',
        position: 'absolute',
        fontSize: '13px',
        borderRadius: 4,
        height: '30px',
        width: '105px',
        right: '700px',
        top: '350px',
        transition: 'background 1s',
        '&:hover': {
            backgroundColor: 'linear-gradient(45deg, #FE6B8B 70%, #FF8E53 100%)',
            
        },
    }
}));