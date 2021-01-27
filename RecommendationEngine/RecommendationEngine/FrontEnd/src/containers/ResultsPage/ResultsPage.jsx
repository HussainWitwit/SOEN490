import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { FilterList } from '@material-ui/icons';
import { Grid, TableCell } from '@material-ui/core';
import RecommendationEngineTable from '../../components/RecommendationEngineTable/RecommendationEngineTable';
import SearchBar from '../../common/SearchBar';
import { GetRecommendationResultList } from '../../api/endpoints/ResultsEndpoints';
import { mapDispatchToProps } from '../../redux/RightPanelReducer/reducer-actions';
import { connect } from 'react-redux';

/* istanbul ignore next */
export const RowsToDisplay = (element) => (
    <React.Fragment>
        <TableCell />
        <TableCell component="th" scope="row" padding="default" className="primaryKey" id="tableBody">{element.id}</TableCell>
        <TableCell id="tableBody" style={element.netSaving > 0 ? { color: '#4AC71F' } : { color: 'red' }}>{element.netSaving.toFixed(2)}$</TableCell>
        <TableCell id="tableBody" style={element.returnOnInvestment > 0 ? { color: '#4AC71F' } : { color: 'red' }}>{element.returnOnInvestment.toFixed(2)}%</TableCell>
        <TableCell id="tableBody" style={{ color: 'red' }}>{element.costOfAction.toFixed(2)}$</TableCell>
        <TableCell id="tableBody" style={{ color: 'red' }}>{element.costOfInaction.toFixed(2)}$</TableCell>
    </React.Fragment>
);

export function ResultsPage (props) {
    const { openResultDrilldown } = props;

    const [recommendationResultList, setRecommendationResultList] = useState([])
    const [resultList, setResultList] = useState(recommendationResultList);
    const [defaultResultList, setDefaultResultList] = useState(recommendationResultList);

    /* istanbul ignore next */
    const headCells = [
        { id: 'id', label: 'Result ID' },
        { id: 'netSaving', label: 'Net Saving' },
        { id: 'returnOnInvestment', label: 'Return on Investment' },
        { id: 'costOfAction', label: 'Cost of Action' },
        { id: 'costOfInaction', label: 'Cost of Inaction' },
    ];

    /* istanbul ignore next */
    const getResultList = async () => {
        let response = await GetRecommendationResultList();
        setRecommendationResultList(response);
        setDefaultResultList(response);
        setResultList(response);
    }

    /* istanbul ignore next */
    const updateSearch = async (input) => {
        const filtered = defaultResultList.filter(result => {
            return result.id.toString().includes(input.toString())
        })
        setResultList(filtered);
    }

    useEffect(() => {
        getResultList();
    }, [])

    return (
        <div id="main-container">
            <div></div>
            <div>
                <br></br>
                <Grid id="grid-container1" container spacing={1} className="gridContainerStyle">
                    <Grid id="grid1" item>
                        <h3 id="title">Results</h3>
                        <h6 id="subtitle">See the results generated by recommendation jobs</h6>
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
                rowsValue={RowsToDisplay}
                data={resultList}
                TableTitle={"Recommendation Job Results"}
                onClick={openResultDrilldown}
                columnTitles={headCells}
            />
        </div>
    );
}

export default connect(null, mapDispatchToProps)(ResultsPage);