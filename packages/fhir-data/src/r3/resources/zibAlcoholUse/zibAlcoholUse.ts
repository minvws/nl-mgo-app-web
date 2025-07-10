import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Observation } from 'fhir/r3';
import { parse } from '../../../parse';
import { parseObservationComponents } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../resourceTypes';
import { generateUiSchema } from '../../../ui/generator';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-AlcoholUse'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317134
 */
function parseZibAlcoholUse(resource: Observation) {
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

        // HCIM AlcoholUse-v3.1(2017EN)
        valueCodeableConcept,
        comment,
        component: parseObservationComponents(resource.component, {
            amount: {
                coding: {
                    system: 'http://snomed.info/sct', // NOSONAR
                    code: '160573003',
                },
                type: 'quantity',
            },
        }),
    };
}

export type ZibAlcoholUse = ReturnType<typeof parseZibAlcoholUse>;

export const zibAlcoholUse = {
    profile,
    parse: parseZibAlcoholUse,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Observation, ZibAlcoholUse>;
