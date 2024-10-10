import { type Immunization } from '../../fhir/index';
import { parse } from '../../parse';
import { map } from '../../utils';
import { type ResourceConfig } from '../config';
import { uiSchema } from './uiSchema';
import { actor } from './elements/actor/actor';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-Vaccination';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317388
 */
function parseZibVaccination(resource: Immunization) {
    return {
        ...parse.resourceMeta(resource, profile),
        identifier: map(resource.identifier, parse.identifier),
        patient: parse.reference(resource.patient),
        vaccineCode: parse.codeableConcept(resource.vaccineCode),
        dose: parse.quantity(resource.doseQuantity),
        vaccinationDate: parse.date(resource.date),
        repeatDate: null, // Can't find any mapping to an Immunization field.
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
