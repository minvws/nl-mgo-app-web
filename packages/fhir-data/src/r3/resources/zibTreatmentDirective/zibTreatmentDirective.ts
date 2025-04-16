import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Consent } from 'fhir/r3';
import { isEmpty } from 'lodash';
import { parse } from '../../../parse';
import { oneOfValueX } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../types';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317378
 */
function parseZibTreatmentDirective(resource: Consent) {
    const verification = parse.customExtension(
        resource,
        'http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective-Verification', // NOSONAR
        (element) => {
            return {
                verified: parse.extension(element, 'Verified', 'boolean'),
                verifiedWith: parse.extension(element, 'VerifiedWith', 'codeableConcept'),
                verificationDate: parse.extension(element, 'VerificationDate', 'dateTime'),
            };
        }
    );

    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: parse.identifier(resource.identifier),
        patient: parse.reference(resource.patient),
        dateTime: parse.dateTime(resource.dateTime),
        consentingParty: map(resource.consentingParty, parse.reference),

        // HCIM TreatmentDirective-v3.1(2017EN)
        verification,
        comment: parse.extensionNictiz(resource, 'Comment'),
        treatment: parse.extension(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective-Treatment', // NOSONAR
            'codeableConcept'
        ),
        additionalSources: parse.customExtension(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/consent-additionalSources', // NOSONAR
            (extension) => {
                const value = oneOfValueX(extension, ['attachment', 'identifier', 'reference']);
                return isEmpty(value) ? undefined : value;
            }
        ),
        treatmentPermitted: parse.extension(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective-TreatmentPermitted', // NOSONAR
            'codeableConcept'
        ),
        period: parse.period(resource.period),
        sourceAttachment: parse.attachment(resource.sourceAttachment),
        sourceIdentifier: parse.identifier(resource.sourceIdentifier),
        sourceReference: parse.reference(resource.sourceReference),
        exceptRestrictions: map(resource.except, (x) =>
            parse.extension(
                x,
                'http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective-Restrictions', // NOSONAR
                'string'
            )
        ),
    };
}

export type ZibTreatmentDirective = ReturnType<typeof parseZibTreatmentDirective>;

export const zibTreatmentDirective = {
    profile,
    parse: parseZibTreatmentDirective,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Consent, ZibTreatmentDirective>;
