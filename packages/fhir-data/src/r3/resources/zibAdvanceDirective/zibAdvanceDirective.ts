import { type Consent } from 'fhir/r3';
import { type I18nContext } from '../../../i18n';
import { FhirVersion } from '../../../types/Fhir';
import { attachment } from '../../elements/attachment/attachment';
import { parse } from '../../../parse';
import { map } from '../../../utils';
import { type ResourceConfigR3 } from '../config';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-AdvanceDirective'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317129
 */
function parseZibAdvanceDirective(resource: Consent, _i18nContext: I18nContext) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        category: map(resource.category, parse.codeableConcept),
        dateTime: parse.dateTime(resource.dateTime),
        disorder: parse.extensionNictiz(resource, 'zib-AdvanceDirective-Disorder'),
        consentingParty: map(resource.consentingParty, parse.reference),
        source: {
            attachment: attachment.parse(resource.sourceAttachment),
            identifier: parse.identifier(resource.sourceIdentifier),
            reference: parse.reference(resource.sourceReference),
        },
        comment: parse.extensionNictiz(resource, 'Comment'),
    };
}

export type ZibAdvanceDirective = ReturnType<typeof parseZibAdvanceDirective>;

export const zibAdvanceDirective = {
    profile,
    parse: parseZibAdvanceDirective,
    uiSchema,
} satisfies ResourceConfigR3<Consent, ZibAdvanceDirective>;
