import { type ResourceElementConfigR3 } from '../../../../elements/config';
import { type ObservationReferenceRange } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type Nullable } from '../../../../../types/Nullable';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface ReferenceRange {
    low: parse.MgoQuantity | undefined; // NL-CM:13.1.12
    high: parse.MgoQuantity | undefined; // NL-CM:13.1.11
}

function parseReferenceRange(value: Nullable<ObservationReferenceRange>): ReferenceRange {
    return {
        low: parse.quantity(value?.low),
        high: parse.quantity(value?.high),
    };
}

export const referenceRange = {
    parse: parseReferenceRange,
    uiSchemaGroup,
} satisfies ResourceElementConfigR3<ObservationReferenceRange, ReferenceRange>;
