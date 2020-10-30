import React from 'react';
import ManageRecommendationTable from "../Table Component/ManageRecommendationTable"
import {TemporaryDrawer,DrawerButton} from "../RightPanel/RightPanel"

function Home (props){
  return (
    <div id="background">
    <ManageRecommendationTable/>
    {/* <DrawerButton /> */}
    </div>
  );
}

export default Home;