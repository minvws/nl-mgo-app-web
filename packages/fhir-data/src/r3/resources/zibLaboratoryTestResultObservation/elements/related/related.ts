import { type ObservationRelated } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type Nullable } from '../../../../../types/Nullable';
import { type ResourceElementConfig } from '../../../../../types/Fhir';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface Related {
    target: parse.MgoReference | undefined;
}

function parseRelated(value: Nullable<ObservationRelated>): Related {
    return {
        target: parse.reference(value?.target),
    };
}

export const related = {
    parse: parseRelated,
    uiSchemaGroup,
} satisfies ResourceElementConfig<ObservationRelated, Related>;
