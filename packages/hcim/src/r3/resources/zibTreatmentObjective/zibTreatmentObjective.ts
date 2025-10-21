import { FhirVersion } from '@minvws/mgo-fhir';
import { type Goal } from '@minvws/mgo-fhir/r3';
import { oneOfValueX, parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { type ResourceConfig } from 'src/resourceTypes.js';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentObjective'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.3.1/files/2980713
 */
function parseZibTreatmentObjective(resource: Goal) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        subject: parse.reference(resource.subject),
        expressedBy: parse.reference(resource.expressedBy),

        // HCIM TreatmentObjective-v3.1(2017EN)
        description: parse.codeableConcept(resource.description),
        target: {
            measure: parse.codeableConcept(resource.target?.measure),
            ...oneOfValueX(resource.target, ['range', 'quantity', 'codeableConcept'], 'detail'),
        },
        addresses: map(resource.addresses, parse.reference),
    };
}

export type ZibTreatmentObjective = ReturnType<typeof parseZibTreatmentObjective>;

export const zibTreatmentObjective = {
    profile,
    parse: parseZibTreatmentObjective,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, Goal, ZibTreatmentObjective>;
