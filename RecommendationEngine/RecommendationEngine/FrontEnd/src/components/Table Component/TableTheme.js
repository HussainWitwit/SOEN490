import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

export const useStyles = makeStyles((theme) =>({
    filterBtn: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },

    recBtn: {
        background: '#4DD3EF',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        float: 'right',
    },

    table: {
        minWidth: 650,
    },

    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    toolbar: {
        fontSize: 12,
    },


    rootSearchBar: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.grey,
    },
    body: {
        fontSize: 10,

    },
}))(TableCell);
