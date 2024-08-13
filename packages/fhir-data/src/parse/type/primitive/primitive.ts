import { type DateString, type DateTimeString } from '../../../fhir';
import { addNullishReturn } from '../../helpers/addNullishReturn/addNullishReturn';

function noConversion<T = never>(value: T) {
    return value;
}

export const date = addNullishReturn((value: string) => {
    return value as DateString;
});

export const dateTime = addNullishReturn((value: string) => {
    return value as DateTimeString;
});

export const boolean = addNullishReturn(noConversion<boolean>);
export const code = addNullishReturn(noConversion<string>);
export const string = addNullishReturn(noConversion<string>);
