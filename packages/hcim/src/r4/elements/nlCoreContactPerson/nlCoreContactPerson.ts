import { type PatientContact } from '@minvws/mgo-fhir/r4';
import {
    filterCodeableConcept,
    parse,
    type MgoCodeableConcept,
    type MgoElementMeta,
} from '@minvws/mgo-hcim-parse';
import { map, type Nullable } from '@minvws/mgo-utils';
import { relatieCodelijstValueSet } from '../../valueSets/relatieCodelijst.js';
import { rolCodelijstValueSet } from '../../valueSets/rolCodelijst.js';
import {
    parseNlCoreAddressInformation,
    type R4NlCoreAddressInformation,
} from '../nlCoreAddressInformation/nlCoreAddressInformation.js';
import {
    parseNlCoreContactInformation,
    type R4NlCoreContactInformation,
} from '../nlCoreContactInformation/nlCoreContactInformation.js';
import {
    parseNlCoreNameInformation,
    type R4NlCoreNameInformation,
    type R4NlCoreNameInformationGiven,
} from '../nlCoreNameInformation/nlCoreNameInformation.js';

export type R4NlCoreContactPerson = MgoElementMeta<typeof profile> & {
    relationship: {
        role: MgoCodeableConcept[] | undefined;
        relationship: MgoCodeableConcept[] | undefined;
    };
    name: R4NlCoreNameInformation | R4NlCoreNameInformationGiven;
    address: R4NlCoreAddressInformation;
    telecom: R4NlCoreContactInformation;
};

const profile = 'http://nictiz.nl/fhir/StructureDefinition/nl-core-ContactPerson'; // NOSONAR

/*
 * @see https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628399
 */
export function parseNlCoreContactPerson(contact: Nullable<PatientContact>): R4NlCoreContactPerson {
    return {
        _profile: profile,
        relationship: {
            role: map(
                filterCodeableConcept(contact?.relationship, rolCodelijstValueSet),
                parse.codeableConcept
            ),
            relationship: map(
                filterCodeableConcept(contact?.relationship, relatieCodelijstValueSet),
                parse.codeableConcept
            ),
        },
        name: parseNlCoreNameInformation(contact?.name),
        address: parseNlCoreAddressInformation(contact?.address),
        telecom: parseNlCoreContactInformation(contact?.telecom),
    };
}
