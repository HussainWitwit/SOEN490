import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import RecommendationEngineTable from '../../components/RecommendationEngineTable/RecommendationEngineTable';
import SearchBar from '../../common/SearchBar';
import { GetRecommendationResultList } from '../../api/endpoints/ResultsEndpoints';
import { mapDispatchToProps } from '../../redux/RightPanelReducer/reducer-actions';
import { connect } from 'react-redux';
import './ResultsPage.css'

export function ResultsPage(props) {
    const { openResultDrilldown, openScheduleDrilldown } = props;

    const [resultList, setResultList] = useState([]);
    const [defaultResultList, setDefaultResultList] = useState([]);
    const [loading, setLoading] = useState(false);

    const currencyFormatter = new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
    });

    const CADPrice = {
        type: 'number',
        width: 200,
        valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
    };

    const percentageFormatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const PercentageOption = {
        number: 'number',
        width: 200,
        valueFormatter: ({ value }) => (percentageFormatter.format(Number(value)) + '%')
    };

    const columns = [
        { field: 'id', headerName: 'Result ID', width: 150, cellClassName: 'table-style', hide: true },
        { field: 'resultOutputDate', headerName: 'Timestamp', type: 'string', flex: 0.14, cellClassName: 'table-style' },
        { field: 'netSaving', headerName: 'Net Saving', type: 'number', ...CADPrice, flex: 0.14, cellClassName: 'table-positive-numbers' },
        { field: 'returnOnInvestment', headerName: 'Return On Investment', type: 'number', ...PercentageOption, flex: 0.14, cellClassName: 'table-positive-numbers' },
        { field: 'costOfAction', headerName: 'Cost of Action', type: 'number', ...CADPrice, flex: 0.14, cellClassName: 'table-negative-numbers' },
        { field: 'costOfInaction', headerName: 'Cost of Inaction', type: 'number', ...CADPrice, flex: 0.14, cellClassName: 'table-negative-numbers' },
        {
            field: 'configuredRecommendationTitle', headerName: 'Recommendation', type: 'string', flex: 0.14, cellClassName: 'table-style', renderCell: (params) => (
                <a className='configured-recommendation' nClick={() => openScheduleDrilldown(params.getValue('configuredRecommendationId'))}>
                    {params.getValue('configuredRecommendationTitle')}
                </a>)
        },
        { field: 'assetName', headerName: 'Asset', type: 'string', flex: 0.14, cellClassName: 'table-style' }
    ]

    const getResultList = async () => {
        setLoading(true);
        let response = await GetRecommendationResultList();
        setDefaultResultList(response);
        setResultList(response);
        setLoading(false);
    }


    const updateSearch = async (input) => {
        const filtered = defaultResultList.filter(result => {
            return result.assetName.toLowerCase().includes(input.toLowerCase())
            || result.configuredRecommendationTitle.toLowerCase().includes(input.toLowerCase())
            || result.resultOutputDate.includes(input.toLowerCase())
            || result.costOfAction.toString().includes(input.replace(',', ''))
            || result.costOfInaction.toString().includes(input.replace(',', ''))
            || result.netSaving.toString().includes(input.replace(',', ''))
            || result.returnOnInvestment.toString().includes(input.replace(',', ''))
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
                    </Grid>
                </div>
            </div>
            <br></br>
            <RecommendationEngineTable
                loading={loading}
                data={resultList}
                columnValues={columns}
                isClickable={true}
                onClickRow={
                    // setLoading(true),
                    openResultDrilldown
                    // setLoading(false)
                }
            />
        </div>
    );
}

export default connect(null, mapDispatchToProps)(ResultsPage);