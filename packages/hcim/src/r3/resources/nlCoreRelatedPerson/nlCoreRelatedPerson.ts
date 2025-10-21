import { FhirVersion } from '@minvws/mgo-fhir';
import { type RelatedPerson } from '@minvws/mgo-fhir/r3';
import { parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { type ResourceConfig } from '../../../resourceTypes.js';
import {
    parseNlCoreAddress,
    parseNlCoreContactpoint,
    parseNlCoreHumanname,
} from '../../elements/index.js';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-relatedperson'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317060
 */
function parseNlCoreRelatedPerson(resource: RelatedPerson) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        patient: parse.reference(resource.patient),
        period: parse.period(resource.period),

        // HCIM ContactPerson-v3.1(2017EN)
        // HCIM Payer-v3.1(2017EN)
        // HCIM ContactInformation-v1.0(2017EN)
        name: map(resource.name, parseNlCoreHumanname),
        telecom: map(resource.telecom, parseNlCoreContactpoint),
        address: map(resource.address, parseNlCoreAddress),
        role: parse.extension(
            resource,
            'http://fhir.nl/fhir/StructureDefinition/nl-core-relatedperson-role', // NOSONAR
            'codeableConcept'
        ),
        relationship: parse.codeableConcept(resource.relationship),
    };
}

export type NlCoreRelatedPerson = ReturnType<typeof parseNlCoreRelatedPerson>;

export const nlCoreRelatedPerson = {
    profile,
    parse: parseNlCoreRelatedPerson,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, RelatedPerson, NlCoreRelatedPerson>;
