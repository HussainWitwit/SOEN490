import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { FilterList, Search } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { getAllConfiguredRecommendations } from "../../api/get/ConfiguredRecommendationEndpoints";
import 'date-fns';
import './ManageRecommendationPage.css';
import CarouselDialog from '../../components/AddRecommendation/CarouselDialog';
import Carousel from '../../components/AddRecommendation/Carousel';
import TemplateConfiguration from '../../components/AddRecommendation/TemplateConfiguration';
import DateConfiguration from '../../components/AddRecommendation/DateConfiguration';
import ParametersConfiguration from '../../components/AddRecommendation/ParametersConfiguration';
import ConfirmationPage from '../../components/AddRecommendation/ConfirmationPage';
import ConfiguredRecommendationTable from '../../components/ConfiguredRecommendationTable/ConfiguredRecommendationTable';
import AddRecommendationDialog from '../../containers/AddRecommendationDialog/AddRecommendationDialog';
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

// const BootstrapInput = withStyles((theme) => ({
//   root: {
//     'label + &': {
//       marginTop: theme.spacing(3),
//     },
//   },
//   input: {
//     borderRadius: 4,
//     position: 'relative',
//     backgroundColor: theme.palette.background.paper,
//     border: '1px solid #ced4da',
//     fontSize: 16,
//     padding: '10px 26px 10px 12px',
//     transition: theme.transitions.create(['border-color', 'box-shadow']),
//     // Use the system font instead of the default Roboto font.
//     fontFamily: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'].join(
//       ','
//     ),
//     '&:focus': {
//       borderRadius: 4,
//       borderColor: '#80bdff',
//       boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
//     },
//   },
// }))(InputBase);

/**
   * This function handles compares row items - future methods
   * @param {*} a
   * @param {*} b
   * @param {*} orderBy
 
   */
// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

/**
* This function hanldles the comparison of items gets them - future methods
* @param {} order
* @param {*} orderBy 
*/

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }


/**
* This function can handle the sorting of the row items - future methods
* @param {} event 
* @param {*} index 
*/
// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }





function ManageRecommendationPage() {

  //TODO: items might not be necessary.
  const items = [TemplateConfiguration, DateConfiguration, ParametersConfiguration, ConfirmationPage];
  const [data, setData] = React.useState([]);
  const [showDialog, setShowDialog] = React.useState(false);
  

  const fetchData = async () => {
      let response = await getAllConfiguredRecommendations();
      setData(response);
  }

  useEffect(() => {
      fetchData();
  }, []);



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
              {showDialog && 
              <AddRecommendationDialog close ={toggleDialog} open = {showDialog}/>}
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
                  style: { fontSize: 15, fontFamily: ['Segoe UI', ' Tahoma', '"Geneva"', 'Verdana', '"sans-serif"',].join(','), },
                }}
                InputLabelProps={{ style: { fontSize: 15, fontFamily: ['Segoe UI', ' Tahoma', '"Geneva"', 'Verdana', '"sans-serif"',].join(','), }, }}>
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
      <ConfiguredRecommendationTable data = {data} />
    </div>
  );
}

export default ManageRecommendationPage;
