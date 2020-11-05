import React from 'react';
import ManageRecommendationTable from "../Table Component/ManageRecommendationTable";

function Home (props) {
  return (
    <div id="main-container">
      <ManageRecommendationTable id="manage-table" />
    </div>
  );
}

export default Home;