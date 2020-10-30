import { makeStyles } from '@material-ui/core/styles';

export const drawerStyle = makeStyles((theme) => ({
    drawerBox : {
        background: '#424242' //
    }
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