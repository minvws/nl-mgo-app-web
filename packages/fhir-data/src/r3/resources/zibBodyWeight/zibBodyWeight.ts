import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Observation } from 'fhir/r3';
import { parse } from '../../../parse';
import { findComponentByCode } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../types';
import { generateUiSchema } from '../../../ui/generator';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-BodyWeight'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317153
 */
function parseZibBodyWeight(resource: Observation) {
    const {
        comment,
        effectiveDateTime,
        effectivePeriod,
        identifier,
        performer,
        subject,
        valueQuantity,
    } = parseNlCoreObservationBase(resource);

    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier,
        subject,
        effectiveDateTime,
        effectivePeriod,
        performer,

        // HCIM BodyWeight-v3.1(2017EN)
        valueQuantity,
        comment,
        clothing: {
            valueCodeableConcept: parse.codeableConcept(
                findComponentByCode(resource.component, '8352-7')?.valueCodeableConcept
            ),
        },
    };
}

export type ZibBodyWeight = ReturnType<typeof parseZibBodyWeight>;

export const zibBodyWeight = {
    profile,
    parse: parseZibBodyWeight,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Observation, ZibBodyWeight>;
