import { type CodeableConcept } from '@minvws/mgo-fhir';
import { map } from '@minvws/mgo-utils';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser.js';
import { type ValueType } from '../../types.js';
import { codingProps, type MgoCodingProps } from '../coding/coding.js';

export interface MgoCodeableConceptProps {
    text: string | undefined;
    coding: MgoCodingProps[];
}
export interface MgoCodeableConcept extends MgoCodeableConceptProps, ValueType<'codeableConcept'> {}

export function codeableConceptProps<T extends CodeableConcept>(value: T): MgoCodeableConceptProps {
    if (!value.coding?.length) {
        return {
            text: value.text,
            coding: [],
        };
    }
    return {
        text: value.text,
        coding: map(value.coding, codingProps, true),
    };
}

export const codeableConcept = createTypeParser<CodeableConcept, MgoCodeableConcept>((value) => {
    return {
        _type: 'codeableConcept',
        ...codeableConceptProps(value),
    };
});
