import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Observation } from 'fhir/r3';
import { type ResourceConfig } from '../../../types/Fhir';

import { parse } from '../../../parse';
import { findComponentByCode } from '../../../parse/helpers';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-BloodPressure'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317147
 */
function parseZibBloodPressure(resource: Observation) {
    const cuffTypeLOINC = findComponentByCode(resource.component, '8358-4');
    const cuffTypeSNOMED = findComponentByCode(resource.component, '70665002');
    const diastolicEndpoint = findComponentByCode(resource.component, '85549003');
    const systolicBP = findComponentByCode(resource.component, '8480-6');
    const diastolicBP = findComponentByCode(resource.component, '8462-4');
    const averageBloodPressureLOINC = findComponentByCode(resource.component, '8478-0');
    const averageBloodPressureSNOMED = findComponentByCode(resource.component, '6797001');
    const positionSNOMED = findComponentByCode(resource.component, '424724000');
    const positionLOINC = findComponentByCode(resource.component, '8361-8');

    return {
        ...parseNlCoreObservationBase(resource),
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        cuffTypeLOINC: {
            valueCodeableConcept: parse.codeableConcept(cuffTypeLOINC?.valueCodeableConcept),
        },
        cuffTypeSNOMED: {
            valueCodeableConcept: parse.codeableConcept(cuffTypeSNOMED?.valueCodeableConcept),
        },
        diastolicEndpoint: {
            valueCodeableConcept: parse.codeableConcept(diastolicEndpoint?.valueCodeableConcept),
        },
        systolicBP: {
            valueQuantity: parse.quantity(systolicBP?.valueQuantity),
        },
        diastolicBP: {
            valueQuantity: parse.quantity(diastolicBP?.valueQuantity),
        },
        averageBloodPressureLOINC: {
            valueQuantity: parse.quantity(averageBloodPressureLOINC?.valueQuantity),
        },
        averageBloodPressureSNOMED: {
            valueQuantity: parse.quantity(averageBloodPressureSNOMED?.valueQuantity),
        },
        positionSNOMED: {
            valueCodeableConcept: parse.codeableConcept(positionSNOMED?.valueCodeableConcept),
        },
        positionLOINC: {
            valueCodeableConcept: parse.codeableConcept(positionLOINC?.valueCodeableConcept),
        },
    };
}

export type ZibBloodPressure = ReturnType<typeof parseZibBloodPressure>;

export const zibBloodPressure = {
    profile,
    parse: parseZibBloodPressure,
    uiSchema,
} satisfies ResourceConfig<Observation, ZibBloodPressure>;
