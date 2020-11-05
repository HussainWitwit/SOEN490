import React from 'react';
import ManageRecommendationTable from "../Table Component/ManageRecommendationTable";

//TODO: Should either renamed or we should refer directly to the child component.
function Home (props){
  return (
    <div id="background">
    <ManageRecommendationTable/>
    </div>
  );
}

export default Home;