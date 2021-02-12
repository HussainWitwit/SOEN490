import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { FilterList } from '@material-ui/icons';
import { Grid, TableCell } from '@material-ui/core';
import RecommendationEngineTable from '../../components/RecommendationEngineTable/RecommendationEngineTable';
import AddRecommendationDialog from '../../containers/AddRecommendationDialog/AddRecommendationDialog';
import { connect } from 'react-redux';
import { mapDispatchManageRecommendationPageToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import { mapStateToProps } from '../../redux/SharedReducer/reducer-actions';
import SearchBar from '../../common/SearchBar';
import './ManageRecommendationPage.css';


/* istanbul ignore next */ //Should be tested 
// export const RowsToDisplay = (element) => (
//   <React.Fragment>
//     <TableCell />
//     <TableCell component="th" scope="row" padding="default" className="primaryKey" id="table-body">{element.name}</TableCell>
//     <TableCell id="table-body">{element.type}</TableCell>
//     <TableCell id="table-body">{element.granularity}</TableCell>
//     <TableCell id="table-body">{element.createdOn}</TableCell>
//   </React.Fragment>
// );

export function ManageRecommendationPage (props) {

  const { toggleDialog, configuredRecommendationList, openScheduleDrilldown } = props;
  const [recommendationList, setRecommendationList] = useState(configuredRecommendationList);
  const [defaultConfiguredRecList, setDefaultConfiguredRecList] = useState(configuredRecommendationList);

  /* istanbul ignore next */ //Should be tested 
  // const headCells = [
  //   { id: "name", label: "Title"},
  //   { id: "type", label: "Type" },
  //   { id: "granularity", label: "Granularity" },
  //   { id: "createdOn", label: "Created On" },
  // ];

  const columns = [
    {field: 'id', headerName: 'ID', width: 150, cellClassName: 'table-style'},
    {field: 'name', headerName: 'Title', flex: 0.25, type: 'string', cellClassName: 'table-style'},
    {field: 'type', headerName: 'Type', flex: 0.25, type: 'string', cellClassName: 'table-style'},
    {field: 'granularity', headerName: 'Granularity', type: 'string', flex: 0.25, cellClassName: 'table-style'},
    {field: 'createdOn', headerName: 'Created On', type: 'dateTime', flex: 0.25, cellClassName: 'table-style'},
]

   const dataGridSize = { height: 400, width: '100%' };
   

  /* istanbul ignore next */
  const updateSearch = async (input) => {
    const filtered = defaultConfiguredRecList.filter(recommendation => {
      return recommendation.name.toLowerCase().includes(input.toLowerCase())
    })
    setRecommendationList(filtered);
  }

  useEffect(() => {
    setRecommendationList(configuredRecommendationList)
    setDefaultConfiguredRecList(configuredRecommendationList)
  }, [configuredRecommendationList])

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
              <AddRecommendationDialog {...props} />
            </div>
          </Grid>
        </Grid>
        <br></br>
      </div>
      <div>
        <div>
          <Grid id="grid-container2" container spacing={1} className="gridContainerStyle">
            <Grid item id="data-testid" >
              <SearchBar
                placeholder="Search for a recommendation..."
                onSearchUpdate={updateSearch}
              />
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
      <RecommendationEngineTable
        // rowsValue={RowsToDisplay}
        // data={recommendationList}
        // tableTitle={"Configured Recommendations"}
        // onClickRow={openScheduleDrilldown}
        // columnTitles={headCells}
        // isClickable= {true}
        data = {recommendationList}
        columnValues = {columns}
        dataGridSize = {dataGridSize}
        tableTitle = {"Configured Recommendation"}
        onClickRow = {openScheduleDrilldown}
      />
    </div >
  );
}

export default connect(mapStateToProps, mapDispatchManageRecommendationPageToProps)(ManageRecommendationPage);
