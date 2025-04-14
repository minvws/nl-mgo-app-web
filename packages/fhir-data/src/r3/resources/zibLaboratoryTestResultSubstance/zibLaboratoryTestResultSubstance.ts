import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Substance } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { map } from '../../../utils';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-LaboratoryTestResult-Substance'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317246
 */
function parseZibLaboratoryTestResultSubstance(resource: Substance) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        identifier: map(resource.identifier, parse.identifier),
        status: parse.string(resource?.status),
        category: map(resource.category, parse.codeableConcept),
        code: parse.codeableConcept(resource.code), // NL-CM:13.1.22
        description: parse.string(resource.description),
    };
}

export type ZibLaboratoryTestResultSubstance = ReturnType<
    typeof parseZibLaboratoryTestResultSubstance
>;

export const zibLaboratoryTestResultSubstance = {
    profile,
    parse: parseZibLaboratoryTestResultSubstance,
    uiSchema,
} satisfies ResourceConfig<Substance, ZibLaboratoryTestResultSubstance>;
