import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type ObservationRelated } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type ResourceElementConfig } from '../../../../../types';
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
