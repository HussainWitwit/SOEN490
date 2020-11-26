import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { FilterList, Search } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import 'date-fns';
import './ManageRecommendationTable.css';
import InputBase from '@material-ui/core/InputBase';
import { getAllRecommendations } from '../../api/get/TableEndpoints';
import CarouselDialog from '../AddRecommendation/CarouselDialog';
import Carousel from '../AddRecommendation/Carousel';
import TemplateConfiguration from '../AddRecommendation/TemplateConfiguration';
import DateConfiguration from '../AddRecommendation/DateConfiguration';
import ParametersConfiguration from '../AddRecommendation/ParametersConfiguration';
import ConfirmationPage from '../AddRecommendation/ConfirmationPage';

export const CssTextField = withStyles({
  root: {
    width: '360px',
    color: '252733',
    fontSize: 100,

    '& label.Mui-focused': {
      color: '#868282',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#252733',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#252733',
      },
      '&:hover fieldset': {
        borderColor: '#252733',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#252733',
      },
    },
  },
})(TextField);

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'].join(
      ','
    ),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

// export function descendingComparator (a, b, orderBy) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }

// export function getComparator (order, orderBy) {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }

// export function stableSort (array, comparator) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) return order;
//         return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
// }

const headCells = [
  { id: 'title', numeric: false, label: 'Title' },
  { id: 'frequency', numeric: false, label: 'Frequency' },
  { id: 'template', numeric: true, label: 'Template' },
  { id: 'createdOn', numeric: true, label: 'created On' },
];

/**
 * cMethod that will serve for the creation of the table header
 * @param {*} props
 */

export function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead id="table-head" className="custom">
      <TableRow id="table-row">
        <TableCell id="table-cell" className="custom"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            className="custom"
            key={headCell.id}
            // align={headCell.numeric ? 'left' : 'center'}
            sortDirection={orderBy === headCell.id ? order : false}
            id="tableHeader"
          >
            <TableSortLabel
              id="sort-label"
              className="custom"
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span id="visuallyHidden">
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func,
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
};

function ManageRecommendationTable() {

  const items = [TemplateConfiguration, DateConfiguration, ParametersConfiguration, ConfirmationPage];

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);
  const [data, setData] = React.useState([]);

  const fetchData = async () => {
    let response = await getAllRecommendations();
    setData(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //TODO:Set the hooks for the Title, Subtitle, Button Boolean, (Making of Table Generic) - C.S.B
  
  //TODO:Set hook array for the name of the columns of the table and the filter list (Making of Table Generic) - C.S.B

  /**
   * set the items to be comprssed function
   * @param {*} event
   */

  // this method is used for the compressed table rows button (lite)
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  /**
   * This function handles the sorting and sets them
   * @param {} event
   * @param {*} index
   */

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  /**
   * This function handles the changing of paginations (pages)
   * @param {} event
   * @param {*} newPage
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * This function handles population of row on each ne
   * @param {*} event
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // handling the empty rows for the method that compresses the table rows
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  // Setter to trigger the pop up dialog
  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  return (
    <div id="main-container">
      <div></div>
      <div>
        <br></br>
        <Grid id="grid-container1" container spacing={1} className="gridContainerStyle">
          <Grid id="grid1" item>
            <h3 id="title">Manage Recommendations</h3>
            <h6 id="subtitle">
              Add, edit, delete and browse the configured recommendation
            </h6>
          </Grid>
          <Grid item>
             <div>
              <Button id="recBtn" onClick={toggleDialog}>
                Create Recommendation
              </Button>
              <CarouselDialog show={showDialog} toggle={toggleDialog}>
                <Carousel>{({ getItemProps }) =>items.map((Item) => (<Item {...getItemProps({ key: Item, dismiss: toggleDialog,})}/>))}</Carousel>
              </CarouselDialog>
            </div>
          </Grid>
        </Grid>
        <br></br>
      </div>
      <div>
        <div>
          <Grid id="grid-container2" container spacing={1} className="gridContainerStyle">
            <Grid item id="grid2">
              <Search id="search" />
            </Grid>
            <Grid item>
              <CssTextField id="custom-css-standard-input" label="Search"
                inputProps={{
                  style: { fontSize: 15, fontFamily: ['Segoe UI',' Tahoma','"Geneva"','Verdana','"sans-serif"',].join(','),},
                }}
                InputLabelProps={{ style: {fontSize: 15, fontFamily: ['Segoe UI',' Tahoma','"Geneva"','Verdana','"sans-serif"',].join(','),},}}>
                </CssTextField>
            </Grid>
            <Grid item>
              <Button size="small" id="filterBtn" endIcon={<FilterList />}>
                Add Filter
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
      <br></br>
      <div id="root">
        <Paper id="paper">
          <Toolbar id="toolbar">
            <h6 className="toolBarTitle" variant="h6" id="tableTitle" component="div"> Configured Recommendations</h6>
            <FormControlLabel
              control={
                <Switch checked={dense} onChange={handleChangeDense} color="default" inputProps={{ 'aria-label': 'checkbox with default color' }}/>
              }
              label={<h6 id="controlLabel">Lite</h6>}
            />
          </Toolbar>
          <TableContainer>
            <Table
              id="table" aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'} aria-label="enhanced table"
            >
              <EnhancedTableHead order={order} orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
              />
              <TableBody id="table-body">
                {
                  /* {stableSort(data, getComparator(order, orderBy))*/
                  // slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  data.map((row) => {
                    return (
                      <TableRow key={row.title} className="custom">
                        <TableCell className="custom"></TableCell>
                        <TableCell component="th" scope="row" padding="default" className="primaryKey" id="tableBody"> {row.name}
                        </TableCell>
                        <TableCell className="custom" id="tableBody">
                          {row.granularity}
                        </TableCell>
                        {/* <TableCell className="custom" id="tableBody">{row.startDate}<br></br>{row.startTime}</TableCell>
                                                <TableCell className="custom" id="tableBody">{row.endDate}<br></br>{row.endTime}</TableCell> */}
                        <TableCell className="custom" id="tableBody">
                          {row.type}
                        </TableCell>
                        <TableCell className="custom" id="tableBody">
                          {row.createdOn}
                        </TableCell>
                      </TableRow>
                    );
                  })
                }
                {emptyRows > 0 && (
                  <TableRow
                    className="center"
                    classes={{ height: (dense ? 33 : 53) * emptyRows }}
                  >
                    <TableCell className="center" />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination id="pagination" rowsPerPageOptions={[10, 25, 50, 100]} component="div" count={data.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage}/>
        </Paper>
      </div>
    </div>
  );
}

export default ManageRecommendationTable;
