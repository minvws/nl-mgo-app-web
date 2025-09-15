import { FhirVersion } from '@minvws/mgo-fhir';
import { type Observation } from '@minvws/mgo-fhir/r3';
import { parse, parseObservationComponents } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { type ResourceConfig } from '../../../resourceTypes.js';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation.js';

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

        component: parseObservationComponents(resource.component, {
            typeOfTobaccoUsed: {
                coding: {
                    system: 'http://snomed.info/sct', // NOSONAR
                    code: '53661000146106',
                },
                type: 'codeableConcept',
            },
            amount: {
                coding: {
                    system: 'http://snomed.info/sct', // NOSONAR
                    code: '266918002',
                },
                type: 'quantity',
            },
            packYears: {
                coding: {
                    system: 'http://snomed.info/sct', // NOSONAR
                    code: '401201003',
                },
                type: 'quantity',
            },
        }),
    };
}

export type ZibTobaccoUse = ReturnType<typeof parseZibTobaccoUse>;

export const zibTobaccoUse = {
    profile,
    parse: parseZibTobaccoUse,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, Observation, ZibTobaccoUse>;
