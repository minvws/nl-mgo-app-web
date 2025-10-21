import { FhirVersion } from '@minvws/mgo-fhir';
import { type DiagnosticReport } from '@minvws/mgo-fhir/r3';
import { oneOfValueX, parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { type ResourceConfig } from '../../../resourceTypes.js';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-TextResult'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317374
 */
function parseZibTextResult(resource: DiagnosticReport) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        ...oneOfValueX(resource, ['dateTime', 'period'], 'effective'),

        // HCIM BasicElements-v1.0(2017EN) && hcim-patient-v3.1-2017EN
        subject: parse.reference(resource.subject),
        performer: map(resource.performer, (performer) => ({
            // HCIM BasicElements-v1.0(2017EN)
            actor: parse.reference(performer.actor),

            // HCIM HealthProfessional-v3.2(2017EN)
            role: {
                healthProfessionalRole: parse.codeableConcept(performer.role),
            },
        })),

        // HCIM TextResult-v4.1(2017EN)
        status: parse.extension(
            resource._status,
            'http://nictiz.nl/fhir/StructureDefinition/code-specification', // NOSONAR
            'codeableConcept'
        ),
        code: parse.codeableConcept(resource.code),
        conclusion: parse.string(resource.conclusion),
    };
}

export type ZibTextResult = ReturnType<typeof parseZibTextResult>;

export const zibTextResult = {
    profile,
    parse: parseZibTextResult,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, DiagnosticReport, ZibTextResult>;
