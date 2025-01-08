import { type PatientContact } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type Nullable } from '../../../../../types/Nullable';
import { map } from '../../../../../utils';
import {
    nlCoreAddress,
    nlCoreContactpoint,
    nlCoreHumanname,
    type NlCoreAddress,
    type NlCoreContactpoint,
    type NlCoreHumanname,
} from '../../../../elements';
import { type ResourceElementConfig } from '../../../../../types/Fhir';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface Contact {
    relationship: parse.MgoCodeableConcept[];
    name: NlCoreHumanname;
    telecom: NlCoreContactpoint[];
    address: NlCoreAddress;
    gender: parse.MgoCode | undefined;
    organization: parse.MgoReference | undefined;
    period: parse.MgoPeriod | undefined;
}

function parseContact(value: Nullable<PatientContact>): Contact {
    return {
        relationship: map(value?.relationship, parse.codeableConcept, true),
        name: nlCoreHumanname.parse(value?.name),
        telecom: map(value?.telecom, nlCoreContactpoint.parse, true),
        address: nlCoreAddress.parse(value?.address),
        gender: parse.code(value?.gender),
        organization: parse.reference(value?.organization),
        period: parse.period(value?.period),
    };
}

export const contact = {
    parse: parseContact,
    uiSchemaGroup,
} satisfies ResourceElementConfig<PatientContact, Contact>;
