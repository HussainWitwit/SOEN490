import React from 'react';
import PropTypes from 'prop-types';
import RecommendationEngineTable from '../RecommendationEngineTable/RecommendationEngineTable';
import PageSubHeader from '../PageSubHeader/PageSubHeader';


export function RecommendationsPageTemplate (props) {

    return (
        <div id="main-container">
            <br></br>
            <PageSubHeader
                pageTitle={props.pageTitle}
                descriptionSubtitle={props.subtTitleDescription}
                showCreateRecommendation={props.showCreateRecommendationButton}
                toggleDialog={props.onOpenRecommendationDialog}
                addRecommendationProps={props.addRecommendationProps}
                updateSearch={props.onSearch}
            />
            <br></br>
            <RecommendationEngineTable
                data={props.tableData}
                columnValues={props.tableColumns}
                onClickRow={props.onTableClickRow}
                isClickable={props.isRowClickable}
                dateColumnName={props.dateColumnName}
                dateSortingOrder={props.dateSortingOrder}
                loading={props.loading}
            />
        </div >
    );
}

/* istanbul ignore next */
RecommendationsPageTemplate.propTypes = {
    pageTitle: PropTypes.string,
    subtTitleDescription: PropTypes.string,
    showCreateRecommendationButton: PropTypes.bool,
    onOpenRecommendationDialog: PropTypes.func,
    addRecommendationProps: PropTypes.object,
    onSearch: PropTypes.func.isRequired,
    tableData: PropTypes.array.isRequired,
    tableColumns: PropTypes.array,
    onTableClickRow: PropTypes.func.isRequired,
    isRowClickable: PropTypes.bool.isRequired,
    dateColumnName: PropTypes.string,
    dateSortingOrder: PropTypes.string,
    loading: PropTypes.bool
  };