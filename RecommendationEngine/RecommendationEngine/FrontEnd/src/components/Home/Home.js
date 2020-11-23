import React from 'react';
import ManageRecommendationTable from "../ManageRecommendationTable/ManageRecommendationTable";

//TODO: Should either renamed or we should refer directly to the child component.
function Home (props){
  return (
    <div id="main-container">
      <ManageRecommendationTable id="manage-table" />
    </div>
  );
}

export default Home;