import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Observation } from 'fhir/r3';
import { parse } from '../../../parse';
import { findComponentByCode } from '../../../parse/helpers';
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
        systolicBP: {
            valueQuantity: parse.quantity(
                findComponentByCode(resource.component, '8480-6')?.valueQuantity
            ),
        },
        diastolicBP: {
            valueQuantity: parse.quantity(
                findComponentByCode(resource.component, '8462-4')?.valueQuantity
            ),
        },
        averageBloodPressure: {
            valueQuantity: parse.quantity(
                findComponentByCode(resource.component, ['8478-0', '6797001'])?.valueQuantity
            ),
        },
        diastolicEndpoint: {
            valueCodeableConcept: parse.codeableConcept(
                findComponentByCode(resource.component, '85549003')?.valueCodeableConcept
            ),
        },
        cuffType: {
            valueCodeableConcept: parse.codeableConcept(
                findComponentByCode(resource.component, ['8358-4', '70665002'])
                    ?.valueCodeableConcept
            ),
        },
        position: {
            valueCodeableConcept: parse.codeableConcept(
                findComponentByCode(resource.component, ['8361-8', '424724000'])
                    ?.valueCodeableConcept
            ),
        },
    };
}

export type ZibBloodPressure = ReturnType<typeof parseZibBloodPressure>;

export const zibBloodPressure = {
    profile,
    parse: parseZibBloodPressure,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Observation, ZibBloodPressure>;
