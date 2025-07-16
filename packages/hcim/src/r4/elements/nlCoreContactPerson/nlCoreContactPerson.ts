import { parse, type MgoElementMeta } from '@minvws/mgo-hcim-parse';
import { type Nullable } from '@minvws/mgo-utils';
import { type PatientContact } from 'fhir/r4';
import {
    parseNlCoreAddressInformation,
    parseNlCoreContactInformation,
    parseNlCoreNameInformation,
    type R4NlCoreAddressInformation,
    type R4NlCoreContactInformation,
    type R4NlCoreNameInformation,
    type R4NlCoreNameInformationGiven,
} from '..';
import { filterCodeableConcept } from '../../../../../hcim-parse/src/helpers';
import { type MgoCodeableConcept } from '../../../../../hcim-parse/src/type';
import { map } from '../../../utils';
import { relatieCodelijstValueSet } from '../../valueSets/relatieCodelijst';
import { rolCodelijstValueSet } from '../../valueSets/rolCodelijst';

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
