import { FhirVersion } from '@minvws/mgo-fhir';
import { type Observation } from '@minvws/mgo-fhir/r3';
import { parse, parseObservationComponents } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { type ResourceConfig } from '../../../resourceTypes.js';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation.js';

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

        component: parseObservationComponents(resource.component, {
            clothing: {
                coding: {
                    system: 'http://loinc.org', // NOSONAR
                    code: '8352-7',
                },
                type: 'codeableConcept',
            },
        }),
    };
}

export type ZibBodyWeight = ReturnType<typeof parseZibBodyWeight>;

export const zibBodyWeight = {
    profile,
    parse: parseZibBodyWeight,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, Observation, ZibBodyWeight>;
