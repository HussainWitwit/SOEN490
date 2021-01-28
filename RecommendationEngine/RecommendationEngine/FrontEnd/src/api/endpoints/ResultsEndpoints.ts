
import { ConfiguredRecommendationResult } from '../models/JobResult';
import { Action, ActionGrouping } from '../models/Action';
import { id } from 'date-fns/locale';

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

export async function GetActionsByResultId(id: number) : Promise<ActionGrouping | null> {
    let actions: ActionGrouping;
    try {
        let response = await fetch('api/action/'+ id);
        const jsonResponse = await response.json();
        if (jsonResponse) {
            actions = jsonResponse;
            return actions;
        }
    } catch (e) {
        console.log('Error fetching actions!');
        console.log(e);
    }
    return null;
}