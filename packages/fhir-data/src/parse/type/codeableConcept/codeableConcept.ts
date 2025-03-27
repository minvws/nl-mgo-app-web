import { type CodeableConcept } from '@minvws/mgo-fhir-types';
import { map } from '../../../utils';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type ValueType } from '../../types';
import { coding, type MgoCoding } from '../coding/coding';

export interface MgoCodeableConcept extends ValueType<'CodeableConcept'> {
    text: string | undefined;
    coding: MgoCoding[];
}

export const codeableConcept = createTypeParser<CodeableConcept, MgoCodeableConcept>((value) => {
    if (!value.coding?.length) {
        return {
            _type: 'CodeableConcept',
            text: value.text,
            coding: [],
        };
    }
    return {
        _type: 'CodeableConcept',
        text: value.text,
        coding: map(value.coding, coding, true),
    };
});
