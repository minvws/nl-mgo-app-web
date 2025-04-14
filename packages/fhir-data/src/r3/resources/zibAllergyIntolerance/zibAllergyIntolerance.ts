import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type AllergyIntolerance } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { map } from '../../../utils';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-AllergyIntolerance'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317138
 */
function parseZibAllergyIntolerance(resource: AllergyIntolerance) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        identifier: map(resource.identifier, parse.identifier),
        clinicalStatus: parse.code(resource.clinicalStatus),
        verificationStatus: parse.code(resource.verificationStatus),
        type: parse.code(resource.type),
        category: map(resource.category, parse.code),
        criticality: parse.code(resource.criticality),
        code: parse.codeableConcept(resource.code),
        patient: parse.reference(resource.patient),
    };
}

export type ZibAllergyIntolerance = ReturnType<typeof parseZibAllergyIntolerance>;

export const zibAllergyIntolerance = {
    profile,
    parse: parseZibAllergyIntolerance,
    uiSchema,
} satisfies ResourceConfig<AllergyIntolerance, ZibAllergyIntolerance>;
