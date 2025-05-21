import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type PractitionerQualification } from 'fhir/r4';
import { parse } from '../../../../../parse';
import { type ResourceElementConfig } from '../../../../../types';
import { map } from '../../../../../utils';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface Qualification {
    identifier: parse.MgoIdentifier[] | undefined;
    code: parse.MgoCodeableConcept | undefined;
    period: parse.MgoPeriod | undefined;
    issuer: parse.MgoReference | undefined;
}

function parseQualification(value: Nullable<PractitionerQualification>): Qualification {
    return {
        identifier: map(value?.identifier, parse.identifier),
        code: parse.codeableConcept(value?.code),
        period: parse.period(value?.period),
        issuer: parse.reference(value?.issuer),
    };
}

export const qualification = {
    parse: parseQualification,
    uiSchemaGroup,
} satisfies ResourceElementConfig<PractitionerQualification, Qualification>;
