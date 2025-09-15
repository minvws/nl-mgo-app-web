import { FhirVersion } from '@minvws/mgo-fhir';
import { type Consent } from '@minvws/mgo-fhir/r3';
import { filterCodeableConcept, oneOfValueX, parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { type ResourceConfig } from '../../../resourceTypes.js';
import { typeOfLivingWillValueSet } from '../../valueSets/typeOfLivingWill.js';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-AdvanceDirective'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317129
 */
function parseZibAdvanceDirective(resource: Consent) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: parse.identifier(resource.identifier),
        dateTime: parse.dateTime(resource.dateTime),

        // HCIM AdvanceDirective-v3.1(2017EN)
        disorder: parse.extensionMultiple(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/zib-AdvanceDirective-Disorder', // NOSONAR
            'reference'
        ),
        comment: parse.extension(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/Comment', // NOSONAR
            'string'
        ),
        category: {
            typeOfLivingWill: map(
                filterCodeableConcept(resource.category, typeOfLivingWillValueSet),
                parse.codeableConcept
            ),
        },
        consentingParty: parse.reference(resource.consentingParty?.[0]),
        ...oneOfValueX(resource, ['attachment', 'identifier', 'reference'], 'source'),
    };
}

export type ZibAdvanceDirective = ReturnType<typeof parseZibAdvanceDirective>;

export const zibAdvanceDirective = {
    profile,
    parse: parseZibAdvanceDirective,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, Consent, ZibAdvanceDirective>;
