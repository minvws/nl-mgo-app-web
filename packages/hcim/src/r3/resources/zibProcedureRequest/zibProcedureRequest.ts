import { FhirVersion } from '@minvws/mgo-fhir';
import { type ProcedureRequest } from '@minvws/mgo-fhir/r3';
import { oneOfValueX, parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { type ResourceConfig } from '../../../resourceTypes.js';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-ProcedureRequest'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317340
 */
function parseZibProcedureRequest(resource: ProcedureRequest) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        subject: parse.reference(resource.subject),
        requester: {
            agent: parse.reference(resource.requester?.agent),
        },

        // HCIM HealthProfessional-v3.2(2017EN)
        performerType: {
            healthProfessionalRole: map(resource.performerType?.coding, parse.coding),
        },

        // HCIM NursingIntervention-v3.1(2017EN)
        ...oneOfValueX(resource, ['dateTime', 'period', 'timing'], 'occurrence'),

        // HCIM Procedure-v4.1(2017EN)	HCIM ProcedureRequest
        code: parse.codeableConcept(resource.code),
        performer: parse.reference(resource.performer),
        reasonReference: map(resource.reasonReference, parse.reference),
        bodySite: map(resource.bodySite, (bodySite) => ({
            ...parse.codeableConcept(bodySite),
            procedureLaterality: parse.extension(
                bodySite,
                'http://nictiz.nl/fhir/StructureDefinition/BodySite-Qualifier', // NOSONAR
                'codeableConcept'
            ),
        })),

        // HCIM PlannedCareActivityForTransfer-v3.1(2017EN)
        status: {
            orderStatus: parse.extension(
                resource._status,
                'http://nictiz.nl/fhir/StructureDefinition/code-specification', // NOSONAR
                'codeableConcept'
            ),
        },
    };
}

export type ZibProcedureRequest = ReturnType<typeof parseZibProcedureRequest>;

export const zibProcedureRequest = {
    profile,
    parse: parseZibProcedureRequest,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, ProcedureRequest, ZibProcedureRequest>;
