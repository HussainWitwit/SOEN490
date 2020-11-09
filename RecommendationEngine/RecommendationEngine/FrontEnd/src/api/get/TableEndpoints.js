export const getAllRecommendations = async () => {

    try{
        let response = await fetch ('http://localhost:5000/ConfiguredRecommendation/get');
        const jsonResponse = await response.json();
        if(jsonResponse)
        {
            return formatResponse(jsonResponse); //change the name to FetchResponse
        }
        else{
            return [];
        }
    }
    catch(error) {
        return [];
    }
}

const formatResponse = (response) => {
    var result = response.map( (element => {
        return {
            name : element.name,
            type : element.type,
            recurrenceDayOfWeek : element.recurrenceDayOfWeek,
            createdOn : element.createdOn,
            createdBy : element.createdBy,
            recurrenceDateTime : element.recurrenceDatetime,
            granularity : element.granularity,
            parameters : element.parameters 
        };
    }));
    return result;
}