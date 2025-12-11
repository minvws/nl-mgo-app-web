import { FhirVersion } from '@minvws/mgo-fhir';
import { type CarePlan } from '@minvws/mgo-fhir/r3';
import { parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { type ResourceConfig } from '../../../resourceTypes.js';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-HelpFromOthers'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.3.1/files/2980662
 */
function parseZibHelpFromOthers(resource: CarePlan) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        subject: parse.reference(resource.subject),
        period: parse.period(resource.period),

        // HCIM HelpFromOthers-v3.0(2017EN)
        activity: map(resource.activity, (activity) => ({
            detail: {
                category: parse.codeableConcept(activity.detail?.category),
                code: parse.string(activity.detail?.code?.text),
                scheduledString: parse.string(activity.detail?.scheduledString),
                performer: map(activity.detail?.performer, parse.reference),
                description: parse.string(activity.detail?.description),
            },
        })),
    };
}

export type ZibHelpFromOthers = ReturnType<typeof parseZibHelpFromOthers>;

export const zibHelpFromOthers = {
    profile,
    parse: parseZibHelpFromOthers,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, CarePlan, ZibHelpFromOthers>;
