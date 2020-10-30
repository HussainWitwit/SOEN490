import React from 'react';
import ManageRecommendationTable from "../Table Component/ManageRecommendationTable";
// import Test from "../Table Component/Test"
import TemporaryDrawer from "../RightPanel/RightPanel";

function Home (props){
  return (
    <div id="background">
    <ManageRecommendationTable/>
    <TemporaryDrawer />
    </div>
  );
}

export default Home;