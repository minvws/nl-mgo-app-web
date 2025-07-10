import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Immunization } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../resourceTypes';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-Vaccination'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317388
 */
function parseZibVaccination(resource: Immunization) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        patient: parse.reference(resource.patient),
        date: parse.date(resource.date),
        reportOrigin: parse.codeableConcept(resource.reportOrigin),
        practitioner: map(resource.practitioner, (practitioner) => ({
            // HCIM BasicElements-v1.0(2017EN)
            actor: parse.reference(practitioner.actor),

            // HCIM HealthProfessional-v3.2(2017EN)
            role: {
                healthProfessionalRole: parse.codeableConcept(practitioner?.role),
            },
        })),

        // HCIM Vaccination-v3.1(2017EN)
        vaccineCode: parse.codeableConcept(resource.vaccineCode),
        doseQuantity: parse.quantity(resource.doseQuantity),
        note: map(resource.note, parse.annotation),
    };
}

export type ZibVaccination = ReturnType<typeof parseZibVaccination>;

export const zibVaccination = {
    profile,
    parse: parseZibVaccination,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Immunization, ZibVaccination>;
