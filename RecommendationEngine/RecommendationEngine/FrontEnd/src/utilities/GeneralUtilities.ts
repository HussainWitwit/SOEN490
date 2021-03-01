import { Parameter } from "../api/models/TemplateDetails";

export const isCorrectType = (type: string, value: string): boolean => {
    let res = Number(value);
    switch (type) {
        case 'INT':
            return !value.includes('.') && Number.isInteger(res);
        case 'FLOAT':
            return value.includes('.') || !Number.isInteger(res);
    }
    return false;
}

export const checkDateRange = (array: Parameter[]) => {
    for (var i = 0; i < array.length; i++) {
        if (array[i].parameterName === 'StartSoilingSeason') {
            return array[i].parameterValue > array[i + 1].parameterValue;
        }
    }
    return false;
}

export const formatNumber = (num: number) => {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}