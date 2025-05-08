import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Immunization } from 'fhir/r4';
import { parse } from '../../../parse';
import { filterCodeableConcept } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../types';
import { map } from '../../../utils';
import { vaccinationIndicationValueSet } from '../../valueSets/vaccinationIndication';
import { vaccinationMotiveValueSet } from '../../valueSets/vaccinationMotive';
import { parseProtocolApplied } from './elements/protocolApplied/protocolApplied';
import { summary } from './summary';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/nl-core-Vaccination-event'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946266
 */
function parseNlCoreVaccinationEvent(resource: Immunization) {
    const vaccinationIndication = filterCodeableConcept(
        resource.reasonCode,
        vaccinationIndicationValueSet
    );
    const vaccinationMotive = filterCodeableConcept(resource.reasonCode, vaccinationMotiveValueSet);

    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R4),
        pharmaceuticalProduct: parse.extensionNictiz(
            resource,
            'ext-Vaccination.PharmaceuticalProduct'
        ), // NL-CM:9.7.19926
        identifier: map(resource.identifier, parse.identifier),
        status: parse.string(resource.status), // imm-dataelement-144
        vaccineCode: parse.codeableConcept(resource.vaccineCode), // NL-CM:9.7.19927
        patient: parse.reference(resource.patient), // NL-CM:0.1.1
        occurrenceDateTime: parse.dateTime(resource.occurrenceDateTime), // NL-CM:11.1.3
        location: parse.reference(resource.location), // NL-CM:17.2.1 | NL-CM:17.2.9
        site: parse.codeableConcept(resource.site), // NL-CM:20.7.4
        route: parse.codeableConcept(resource.route), // NL-CM:9.13.21195
        doseQuantity: parse.quantity(resource.doseQuantity), // NL-CM:11.1.4
        performer: map(resource.performer, (p) => parse.reference(p.actor)), // NL-CM:17.1.1
        note: map(resource.note, parse.annotation), // NL-CM:11.1.7
        vaccinationIndication: map(vaccinationIndication, parse.codeableConcept), // imm-dataelement-160
        vaccinationMotive: map(vaccinationMotive, parse.codeableConcept), // imm-dataelement-158
        protocolApplied: map(resource.protocolApplied, parseProtocolApplied),
    };
}

export type R4NlCoreVaccinationEvent = ReturnType<typeof parseNlCoreVaccinationEvent>;

export const r4NlCoreVaccinationEvent = {
    profile,
    parse: parseNlCoreVaccinationEvent,
    uiSchema,
    summary,
} satisfies ResourceConfig<Immunization, R4NlCoreVaccinationEvent>;
