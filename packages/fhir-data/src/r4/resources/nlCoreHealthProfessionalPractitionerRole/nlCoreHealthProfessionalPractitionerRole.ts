import { type PractitionerRole } from 'fhir/r4';
import { type I18nContext } from '../../../i18n';
import { parse } from '../../../parse';
import { FhirVersion } from '../../../types/Fhir';
import { map } from '../../../utils';
import { type ResourceConfigR4 } from '../config';
import { uiSchema } from './uiSchema';
import {
    nlCoreContactInformationEmailAddresses,
    nlCoreContactInformationTelephoneNumbers,
} from '../../elements';

const profile =
    'http://nictiz.nl/fhir/StructureDefinition/nl-core-HealthProfessional-PractitionerRole'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628465
 */
function parseNlCoreHealthProfessionalPractitionerRole(
    resource: PractitionerRole,
    _i18nContext: I18nContext
) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        practitioner: parse.reference(resource.practitioner),
        organization: parse.reference(resource.organization),
        location: map(resource.location, parse.reference),
        speciality: map(resource.specialty, parse.codeableConcept),
        telephoneNumbers: map(resource.telecom, nlCoreContactInformationTelephoneNumbers.parse),
        emailAddresses: map(resource.telecom, nlCoreContactInformationEmailAddresses.parse),
    };
}

export type NlCoreHealthProfessionalPractitionerRole = ReturnType<
    typeof parseNlCoreHealthProfessionalPractitionerRole
>;

export const nlCoreHealthProfessionalPractitionerRole = {
    profile,
    parse: parseNlCoreHealthProfessionalPractitionerRole,
    uiSchema,
} satisfies ResourceConfigR4<PractitionerRole, NlCoreHealthProfessionalPractitionerRole>;
