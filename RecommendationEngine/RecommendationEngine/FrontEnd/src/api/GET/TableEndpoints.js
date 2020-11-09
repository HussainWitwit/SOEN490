export const getAllRecommendations = async () => {

    try{
        let response = await fetch ('localhost:5000/ConfiguredRecommendation/get');
        const jsonResponse = await response.json();
        if(jsonResponse)
        {
            return formatResponse(jsonResponse);
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

    return {
        name : response.Name,
        type : response.Type,
        recurrenceDayOfWeek : response.RecurrenceDayOfWeek,
        createdOn : response.CreatedOn,
        createdBy : response.CreatedBy,
        recurrenceDateTime : response.RecurrenceDateTime,
        granularity : response.Granularity,
        parameters : response.parameters 
    }

}