import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Observation } from 'fhir/r3';
import { parse } from '../../../parse';
import { parseObservationComponents } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../types';
import { generateUiSchema } from '../../../ui/generator';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-BloodPressure'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317147
 */
function parseZibBloodPressure(resource: Observation) {
    const {
        bodySite,
        comment,
        effectiveDateTime,
        effectivePeriod,
        identifier,
        method,
        performer,
        subject,
    } = parseNlCoreObservationBase(resource);

    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier,
        subject,
        effectiveDateTime,
        effectivePeriod,
        performer,

        // HCIM BloodPressure-v3.1(2017EN)
        comment,
        bodySite,
        method,
        component: parseObservationComponents(resource.component, {
            systolicBP: {
                coding: { system: 'http://loinc.org', code: '8480-6' }, // NOSONAR
                type: 'quantity',
            },
            diastolicBP: {
                coding: { system: 'http://loinc.org', code: '8462-4' }, // NOSONAR
                type: 'quantity',
            },
            averageBloodPressureSnomed: {
                coding: { system: 'http://snomed.info/sct', code: '6797001' }, // NOSONAR
                type: 'quantity',
            },
            averageBloodPressureLoinc: {
                coding: { system: 'http://loinc.org', code: '8478-0' }, // NOSONAR
                type: 'quantity',
            },
            diastolicEndpoint: {
                coding: { system: 'http://snomed.info/sct', code: '85549003' }, // NOSONAR
                type: 'codeableConcept',
            },
            cuffTypeSnomed: {
                coding: { system: 'http://snomed.info/sct', code: '70665002' }, // NOSONAR
                type: 'codeableConcept',
            },
            cuffTypeLoinc: {
                coding: { system: 'http://loinc.org', code: '8358-4' }, // NOSONAR
                type: 'codeableConcept',
            },
            positionSnomed: {
                coding: { system: 'http://snomed.info/sct', code: '424724000' }, // NOSONAR
                type: 'codeableConcept',
            },
            positionLoinc: {
                coding: { system: 'http://loinc.org', code: '8361-8' }, // NOSONAR
                type: 'codeableConcept',
            },
        }),
    };
}

export type ZibBloodPressure = ReturnType<typeof parseZibBloodPressure>;

export const zibBloodPressure = {
    profile,
    parse: parseZibBloodPressure,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Observation, ZibBloodPressure>;
