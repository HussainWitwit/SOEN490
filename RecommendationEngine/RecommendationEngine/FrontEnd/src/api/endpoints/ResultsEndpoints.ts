
import { ConfiguredRecommendationResult } from '../models/JobResult';

export async function GetRecommendationResultList() : Promise<ConfiguredRecommendationResult[]> {
    let result:ConfiguredRecommendationResult[] = [];
    try {
        let response = await fetch('api/result');
        const jsonResponse = await response.json();
        if (jsonResponse) {
            result = jsonResponse;
            return result;
        }
    } catch (e) {
        console.log('Error fetching results!')
        console.log(e);
    }
    return result;
}
