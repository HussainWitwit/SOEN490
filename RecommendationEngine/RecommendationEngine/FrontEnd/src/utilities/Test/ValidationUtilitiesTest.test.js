import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from '../../enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mapErrorToErrorList} from '../ValidationUtilities';

Enzyme.configure({ adapter: new Adapter() });

describe('', () => {
    it('Should create list of errors', () => {
        var errorObj = {
            "content": {
                "errorList": [
                    {
                        "type": "VALIDATION",
                        "errorMessage": "The field Name is empty or null."
                    },
                    {
                        "type": "VALIDATION",
                        "errorMessage": "The reccurence day of week 38 is not valid. Day of week must be between 1 and 7."
                    },
                    {
                        "type": "VALIDATION",
                        "errorMessage": "The scenario ROIdw is not a valid scenario."
                    },
                    {
                        "type": "VALIDATION",
                        "errorMessage": "The assets list contains one or more duplicates."
                    }
                ]
            }
        };
        var errorList = mapErrorToErrorList(errorObj);
        var expectedResponse = [
            '- The field Name is empty or null.\n',
            '- The reccurence day of week 38 is not valid. Day of week must be between 1 and 7.\n',
            '- The scenario ROIdw is not a valid scenario.\n',
            '- The assets list contains one or more duplicates.\n'
        ]
        expect(errorList).toEqual(expectedResponse);
    })
})