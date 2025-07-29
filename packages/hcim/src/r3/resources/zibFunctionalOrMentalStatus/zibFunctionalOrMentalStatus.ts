import { FhirVersion } from '@minvws/mgo-fhir';
import { type Observation } from '@minvws/mgo-fhir/r3';
import { parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { type ResourceConfig } from '../../../resourceTypes.js';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation.js';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-FunctionalOrMentalStatus'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317206
 */
function parseZibFunctionalOrMentalStatus(resource: Observation) {
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

        // HCIM FunctionalOrMentalStatus-v3.1(2017EN)
        medicalDevice: parse.extensionMultiple(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/zib-FunctionalOrMentalStatus-MedicalDevice', // NOSONAR
            'reference'
        ),
        code: parse.codeableConcept(resource.code),
        valueCodeableConcept,
        comment,
    };
}

export type ZibFunctionalOrMentalStatus = ReturnType<typeof parseZibFunctionalOrMentalStatus>;

export const zibFunctionalOrMentalStatus = {
    profile,
    parse: parseZibFunctionalOrMentalStatus,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, Observation, ZibFunctionalOrMentalStatus>;
