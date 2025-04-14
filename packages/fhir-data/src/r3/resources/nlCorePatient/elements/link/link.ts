import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type PatientLink } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type ResourceElementConfig } from '../../../../../types';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface Link {
    other: parse.MgoReference | undefined;
    type: parse.MgoCode | undefined;
}

function parseLink(value: Nullable<PatientLink>): Link {
    return {
        other: parse.reference(value?.other),
        type: parse.code(value?.type),
    };
}

export const link = {
    parse: parseLink,
    uiSchemaGroup,
} satisfies ResourceElementConfig<PatientLink, Link>;
