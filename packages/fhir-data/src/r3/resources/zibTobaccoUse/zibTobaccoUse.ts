import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Observation } from 'fhir/r3';
import { parse } from '../../../parse';
import { findComponentByCode } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../types';
import { generateUiSchema } from '../../../ui/generator';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-TobaccoUse'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317376
 */
function parseZibTobaccoUse(resource: Observation) {
    const {
        comment,
        effectiveDateTime,
        effectivePeriod,
        identifier,
        performer,
        subject,
        valueCodeableConcept,
    } = parseNlCoreObservationBase(resource);

    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier,
        subject,
        effectiveDateTime,
        effectivePeriod,
        performer,

        // HCIM TobaccoUse-v3.1(2017EN)
        valueCodeableConcept,
        comment,
        typeOfTobaccoUsed: {
            valueCodeableConcept: parse.codeableConcept(
                findComponentByCode(resource.component, '53661000146106')?.valueCodeableConcept
            ),
        },
        amount: {
            valueQuantity: parse.quantity(
                findComponentByCode(resource.component, '266918002')?.valueQuantity
            ),
        },
        packYears: {
            valueQuantity: parse.quantity(
                findComponentByCode(resource.component, '401201003')?.valueQuantity
            ),
        },
    };
}

export type ZibTobaccoUse = ReturnType<typeof parseZibTobaccoUse>;

export const zibTobaccoUse = {
    profile,
    parse: parseZibTobaccoUse,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Observation, ZibTobaccoUse>;
