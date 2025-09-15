import { FhirVersion } from '@minvws/mgo-fhir';
import { type Substance } from '@minvws/mgo-fhir/r3';
import { parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { type ResourceConfig } from '../../../resourceTypes.js';

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
} satisfies ResourceConfig<FhirVersion.R3, Substance, ZibLaboratoryTestResultSubstance>;
