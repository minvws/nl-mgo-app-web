import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Immunization } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { map } from '../../../utils';
import { actor } from './elements/actor/actor';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-Vaccination'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317388
 */
function parseZibVaccination(resource: Immunization) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        identifier: map(resource.identifier, parse.identifier),
        patient: parse.reference(resource.patient),
        vaccineCode: parse.codeableConcept(resource.vaccineCode),
        dose: parse.quantity(resource.doseQuantity),
        vaccinationDate: parse.date(resource.date),
        practitioner: map(resource.practitioner, actor.parse),
        note: map(resource.note, parse.annotation),
    };
}

export type ZibVaccination = ReturnType<typeof parseZibVaccination>;

export const zibVaccination = {
    profile,
    parse: parseZibVaccination,
    uiSchema,
} satisfies ResourceConfig<Immunization, ZibVaccination>;
