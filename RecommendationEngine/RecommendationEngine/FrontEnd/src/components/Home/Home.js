import React from 'react';
import ManageRecommendationTable from "../Table Component/ManageRecommendationTable";
import TemporaryDrawer from "../RightPanel/RightPanel";

function Home (props) {
  return (
    <div id="main-container">
      <ManageRecommendationTable id="manage-table" />
      {/* <TemporaryDrawer /> */}
    </div>
  );
}

export default Home;