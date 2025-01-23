import { type CodeableConcept } from '@minvws/mgo-fhir-types';
import { map } from '../../../utils';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { coding, type MgoCoding } from '../coding/coding';

export type MgoCodeableConcept = {
    text: string | undefined;
    coding: MgoCoding[];
};

export const codeableConcept = createTypeParser<CodeableConcept, MgoCodeableConcept>((value) => {
    if (!value.coding?.length) {
        return {
            text: value.text,
            coding: [],
        };
    }
    return {
        text: value.text,
        coding: map(value.coding, coding, true),
    };
});
