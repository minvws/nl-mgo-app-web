import { type PatientLink } from 'fhir/r3';
import { type ResourceElementConfigR3 } from '../../../../elements/config';
import { type Nullable } from '../../../../../types/Nullable';
import { uiSchemaGroup } from './uiSchemaGroup';
import { parse } from '../../../../../parse';

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
} satisfies ResourceElementConfigR3<PatientLink, Link>;
