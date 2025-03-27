import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Consent } from 'fhir/r3';
import { parse } from '../../../parse';
import { intersectCodeableConcept } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../types/Fhir';
import { map } from '../../../utils';
import { typeOfLivingWillValueSet } from '../../valueSets/typeOfLivingWill';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-AdvanceDirective'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317129
 */
function parseZibAdvanceDirective(resource: Consent) {
    const typeOfLivingWillCodeableConcepts = intersectCodeableConcept(
        resource.category,
        typeOfLivingWillValueSet
    );

    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        category: map(resource.category, parse.codeableConcept),
        dateTime: parse.dateTime(resource.dateTime),
        disorder: parse.extensionNictiz(resource, 'zib-AdvanceDirective-Disorder'),
        consentingParty: map(resource.consentingParty, parse.reference),
        source: {
            attachment: parse.attachment(resource.sourceAttachment),
            identifier: parse.identifier(resource.sourceIdentifier),
            reference: parse.reference(resource.sourceReference),
        },
        comment: parse.extensionNictiz(resource, 'Comment'),
        typeOfLivingWill: map(typeOfLivingWillCodeableConcepts, parse.codeableConcept),
    };
}

export type ZibAdvanceDirective = ReturnType<typeof parseZibAdvanceDirective>;

export const zibAdvanceDirective = {
    profile,
    parse: parseZibAdvanceDirective,
    uiSchema,
} satisfies ResourceConfig<Consent, ZibAdvanceDirective>;
