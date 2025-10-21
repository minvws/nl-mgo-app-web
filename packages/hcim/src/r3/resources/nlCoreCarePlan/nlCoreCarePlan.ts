import { FhirVersion } from '@minvws/mgo-fhir';
import { type CarePlan } from '@minvws/mgo-fhir/r3';
import { parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { ResourceConfig } from 'src/resourceTypes.js';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-careplan'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.3.1/files/2980598
 */
function parseNlCoreCarePlan(resource: CarePlan) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)	nl-core-careplan
        identifier: map(resource.identifier, parse.identifier),
        subject: parse.reference(resource.subject),
        period: parse.period(resource.period),

        // HCIM NursingIntervention-v3.2(2018EN)
        goal: map(resource.goal, parse.reference),

        activity: map(resource.activity, (activity) => ({
            nursingIntervention: {
                // HCIM OutcomeOfCare-v3.1 (2017EN)
                outcomeReference: map(activity.outcomeReference, parse.reference),
                outcomeCodeableConcept: map(activity.outcomeCodeableConcept, parse.codeableConcept),

                // HCIM NursingIntervention-v3.2(2018EN)
                comment: parse.extension(
                    activity,
                    'http://nictiz.nl/fhir/StructureDefinition/Comment', // NOSONAR
                    'string'
                ),
                reference: parse.reference(activity.reference),
                detail: {
                    medicalDevice: parse.extensionMultiple(
                        activity.detail,
                        'http://nictiz.nl/fhir/StructureDefinition/extension-medicaldevice', // NOSONAR
                        'reference'
                    ),
                    code: parse.codeableConcept(activity.detail?.code),
                    reasonReference: map(activity.detail?.reasonReference, parse.reference),
                    goal: map(activity.detail?.goal, parse.reference),
                    scheduledTiming: parse.timing(activity.detail?.scheduledTiming),
                    performer: map(activity.detail?.performer, parse.reference),
                    description: parse.string(activity.detail?.description),
                },
            },
        })),
    };
}

export type NlCoreCarePlan = ReturnType<typeof parseNlCoreCarePlan>;

export const nlCoreCarePlan = {
    profile,
    parse: parseNlCoreCarePlan,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, CarePlan, NlCoreCarePlan>;
