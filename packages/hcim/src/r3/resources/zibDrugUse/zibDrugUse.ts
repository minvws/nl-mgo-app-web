import { FhirVersion } from '@minvws/mgo-fhir';
import { type Observation } from '@minvws/mgo-fhir/r3';
import { parse, parseObservationComponents } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { type ResourceConfig } from '../../../resourceTypes.js';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation.js';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-DrugUse'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317175
 */
function parseZibDrugUse(resource: Observation) {
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

        // HCIM DrugUse-v3.2(2017EN)
        valueCodeableConcept,
        comment,

        component: parseObservationComponents(resource.component, {
            drugOrMedicationType: {
                coding: {
                    system: 'http://snomed.info/sct', // NOSONAR
                    code: '410942007',
                },
                type: 'codeableConcept',
            },
            routeOfAdministration: {
                coding: {
                    system: 'http://snomed.info/sct', // NOSONAR
                    code: '410675002',
                },
                type: 'codeableConcept',
            },
            amount: {
                coding: {
                    system: 'http://snomed.info/sct', // NOSONAR
                    code: '228390007',
                },
                type: 'string',
            },
        }),
    };
}

export type ZibDrugUse = ReturnType<typeof parseZibDrugUse>;

export const zibDrugUse = {
    profile,
    parse: parseZibDrugUse,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, Observation, ZibDrugUse>;
