import { type PatientContact } from 'fhir/r3';
import {
    type NlCoreContactpoint,
    nlCoreContactpoint,
    type NlCoreAddress,
    nlCoreAddress,
    nlCoreHumanname,
    type NlCoreHumanname,
} from '../../../../elements';
import { type ResourceElementConfigR3 } from '../../../../elements/config';
import { type Nullable } from '../../../../../types/Nullable';
import { uiSchemaGroup } from './uiSchemaGroup';
import { map } from '../../../../../utils';
import { parse } from '../../../../../parse';

export interface Contact {
    relationship: parse.MgoCodeableConcept[];
    name: NlCoreHumanname;
    telecom: NlCoreContactpoint[];
    address: NlCoreAddress;
    gender: parse.MgoString | undefined;
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
} satisfies ResourceElementConfigR3<PatientContact, Contact>;
