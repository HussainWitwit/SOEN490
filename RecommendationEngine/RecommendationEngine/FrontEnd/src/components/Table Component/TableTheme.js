import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

export const useStyles = makeStyles((theme) => ({
    filterBtn: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        // border: 0,
        // borderRadius: 3,
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        // color: 'white',
        // height: 48,
        // padding: '0 30px',
        color: '#212529',
        fontFamily: [
            'Segoe UI',
            ' Tahoma',
            '"Geneva"',
            'Verdana',
            '"sans-serif"',
        ].join(','),
        textTransform: 'none',
        marginLeft: '20px',
        marginRight: '100px',
        marginTop: '19px',
    },

    recBtn: {
        background: '#4DD3EF',
        float: 'right',
        color: 'white',
        textTransform: 'none',
        marginLeft: '480px',
        boxShadow: 'none',
        fontSize: 12,
     
        padding: '6px 12px',
        border: '6px solid',
        lineHeight: 1.5,
        borderColor: '#4DD3EF',
        fontFamily: [
            'Segoe UI',
            ' Tahoma',
            '"Geneva"',
            'Verdana',
            '"sans-serif"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#3DB1C9',
            borderColor: '#3DB1C9',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#3DB1C9',
            borderColor: '#3DB1C9',
        },
        // '&:focus': {
        //     boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        // },
    },
    table: {
        minWidth: 850,
    },

    root: {
        // flexShrink: 0,
        // marginLeft: theme.spacing(2.5),
        minWidth: 850,
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
    margin: {
        margin: {
            margin: theme.spacing(1),
        },
    },

    tableHeader: {
        backgroundColor: 'white',
        color:  '#687480',
        fontFamily: [
            'Segoe UI',
            ' Tahoma',
            '"Geneva"',
            'Verdana',
            '"sans-serif"',
        ].join(','),
        fontSize: 15,

    },
    tableBody: {
        backgroundColor: 'white',
        color: '252733',
        fontFamily: [
            'Segoe UI',
            ' Tahoma',
            '"Geneva"',
            'Verdana',
            '"sans-serif"',
        ].join(','),
        fontSize: 12,
    },
    toolbarRoot:{
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    toolbarHighlight:
        theme.palette.type === 'light' ? {
          color: theme.palette.secondary.main,
          backgroundColor: theme.palette.secondary.light,
        } : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    
    toolbarTitle: {
        flex: '1 1 100%',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      },
      paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        minWidth: 850,
      },

      controlLabel:{
        color: '#212529',
        fontFamily: [
            'Segoe UI',
            ' Tahoma',
            '"Geneva"',
            'Verdana',
            '"sans-serif"',
        ].join(','),
        textTransform: 'none',
         marginTop: '5px',
        fontSize: 12,
      },
    
}));

export const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.white,
        color:  '#687480',
        fontFamily: [
            'Segoe UI',
            ' Tahoma',
            '"Geneva"',
            'Verdana',
            '"sans-serif"',
        ].join(','),
    },
    body: {
        fontSize: 10,

    },
}))(TableCell);
