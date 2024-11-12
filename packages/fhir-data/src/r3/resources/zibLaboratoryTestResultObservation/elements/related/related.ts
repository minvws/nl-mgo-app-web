import { type ObservationRelated } from 'fhir/r3';
import { type ResourceElementConfigR3 } from '../../../../elements/config';
import { parse } from '../../../../../parse';
import { type Nullable } from '../../../../../types/Nullable';
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
} satisfies ResourceElementConfigR3<ObservationRelated, Related>;
