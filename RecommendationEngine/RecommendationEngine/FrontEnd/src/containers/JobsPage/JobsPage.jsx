import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { FilterList } from '@material-ui/icons';
import { Grid, TableCell } from '@material-ui/core';
import RecommendationEngineTable from '../../components/RecommendationEngineTable/RecommendationEngineTable';
import { connect } from 'react-redux';
import { mapDispatchManageRecommendationPageToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import { mapStateToProps } from '../../redux/SharedReducer/reducer-actions';
import SearchBar from '../../common/SearchBar';

/* istanbul ignore next */
export const RowsToDisplay = (element) => (
    <React.Fragment>
        <TableCell />
        <TableCell component="th" scope="row" padding="default" className="primaryKey" id="tableBody">{element.id}</TableCell>
        <TableCell id="tableBody">{element.status}</TableCell>
        <TableCell id="tableBody">{element.timestamp}</TableCell>
        <TableCell id="tableBody">{element.duration}</TableCell>
        <TableCell id="tableBody">{element.configuredRecommendationId}</TableCell>
    </React.Fragment>
);

export function JobsPage (props) {

    const { recommendationJobList } = props;
    const [jobList, setJobList] = useState(recommendationJobList);
    const [defaultJobList, setDefaultJobList] = useState(recommendationJobList);

    /* istanbul ignore next */
    const headCells = [
        { id: 'jobId', label: 'Job ID' },
        { id: 'status', label: 'Status' },
        { id: 'timestamp', label: 'Timestamp' },
        { id: 'jobDuration', label: 'Job Duration' },
        { id: 'configuredRecommendation', label: 'Configured Recommendation' },
    ];

    /* istanbul ignore next */
    const updateSearch = async (input) => {
        const filtered = defaultJobList.filter(job => {
            return job.id.includes(input)
        })
        setJobList(filtered);
    }

    useEffect(() => {
        setJobList(recommendationJobList)
        setDefaultJobList(recommendationJobList)
    }, [recommendationJobList])

    return (
        <div id="main-container">
            <div></div>
            <div>
                <br></br>
                <Grid id="grid-container1" container spacing={1} className="gridContainerStyle">
                    <Grid id="grid1" item>
                        <h3 id="title">Recommendation Jobs</h3>
                        <h6 id="subtitle">Browse, edit and delete recommendation jobs</h6>
                    </Grid>
                </Grid>
                <br></br>
            </div>
            <div>
                <div>
                    <Grid id="grid-container2" container spacing={1} className="gridContainerStyle">
                        <Grid item id="data-testid" >
                            <SearchBar
                                placeholder="Search for a job..."
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
                rowsValue={RowsToDisplay}
                data={jobList}
                TableTitle={"Recommendation Jobs"}
                // onClick={openScheduleDrilldown}
                columnTitles={headCells}
            />
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchManageRecommendationPageToProps)(JobsPage);
