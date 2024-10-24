import { type ResourceElementConfig } from '../../../../elements/config';
import { type ObservationReferenceRange } from '../../../../fhir/index';
import { parse } from '../../../../parse';
import { type Nullable } from '../../../../types/Nullable';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface ReferenceRange {
    low: parse.MgoQuantity | undefined;
    high: parse.MgoQuantity | undefined;
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
} satisfies ResourceElementConfig<ObservationReferenceRange, ReferenceRange>;
