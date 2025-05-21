import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Substance } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { generateUiSchema } from '../../../ui/generator';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-LaboratoryTestResult-Substance'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317246
 */
function parseZibLaboratoryTestResultSubstance(resource: Substance) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM LaboratoryTestResult-v4.1(2017EN)
        code: parse.codeableConcept(resource.code),
    };
}

export type ZibLaboratoryTestResultSubstance = ReturnType<
    typeof parseZibLaboratoryTestResultSubstance
>;

export const zibLaboratoryTestResultSubstance = {
    profile,
    parse: parseZibLaboratoryTestResultSubstance,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Substance, ZibLaboratoryTestResultSubstance>;
