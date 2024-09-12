import { type PatientContact } from 'fhir/r3';
import {
    type NlCoreContactpoint,
    type NlCoreHumanname,
    type NlCoreAddress,
    nlCoreContactpoint,
    nlCoreHumanname,
    nlCoreAddress,
} from '../../../../elements';
import { type ResourceElementConfig } from '../../../../elements/config';
import { type Nullable } from '../../../../types/Nullable';
import { uiSchemaGroup } from './uiSchemaGroup';
import { map } from '../../../../utils';
import { parse } from '../../../../parse';

export interface Contact {
    relationship: parse.MgoCodeableConcept[] | undefined;
    name: NlCoreHumanname | undefined;
    telecom: NlCoreContactpoint[] | undefined;
    address: NlCoreAddress | undefined;
    gender: parse.MgoString | undefined;
    organization: parse.MgoReference | undefined;
    period: parse.MgoPeriod | undefined;
}

function parseContact(value: Nullable<PatientContact>): Contact {
    return {
        relationship: map(value?.relationship, parse.codeableConcept),
        name: nlCoreHumanname.parse(value?.name),
        telecom: map(value?.telecom, nlCoreContactpoint.parse),
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
