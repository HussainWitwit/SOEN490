/**
 * This is the fetching method for the entity Asset.
 * All the controller logic in the backend shall be 
 * called and processed here. 
 * 
 * 
 * N.B MESSAGE
 * Unfortunately (for now anyways), this is not strongly typed, 
 * so if you make any typo for the object that you receive, 
 * it will yield a runtime error. So Make sure to double-check yourself.
 * If needed, put a bunch of console.log and run the endpoint passed here 
 * in postMan prior to running it in the project.
 * 
 * Ideally, having an object asset declared elsewhere (entities/Asset.js)
 * would have made this implementation more explicit and safe. However, javascript 
 * is weakly typed making this quite redundant and useless. Plus, I got run-time error while trying. 
 * Leaving the folder and file just f.y.i
 * A.J.U.U
 */

export const getAllAssets = async () => {
    try {
        let response = await fetch('http://localhost:5000/asset/get'); //Do not make a typing mistake in the api call
        const jsonResponse = await response.json();
        if(jsonResponse) {
            //Make sure the returned value is exactly equal to entity attribute
            return AssignResponse(jsonResponse);
        }
        else{
            return [];
        }
    }catch(error) {
        return [];
    }
}
/**
 * 
 * @param {*} response 
 */
const AssignResponse = (response) => {
    //Make sure the returned value is exactly equal to entity attribute for the entity in question
    return {
      id: response.id.toString(),
      name: response.name,
      displayText: response.displayText,
      EnergyType: response.EnergyType,
      TimeZone: response.TimeZone,
      ElementPath: response.ElementPath,
      AcPower: response.AcPower,
      children : response.children.map(child => {
          return AssignResponse(child)  
      })  
    };
}
© 2020 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
