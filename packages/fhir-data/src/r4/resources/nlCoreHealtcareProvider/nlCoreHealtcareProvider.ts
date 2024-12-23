import { type Location } from 'fhir/r4';
import { parse } from '../../../parse';
import { FhirVersion } from '../../../types/Fhir';
import { map } from '../../../utils';
import { type ResourceConfigR4 } from '../config';
import { uiSchema } from './uiSchema';
import {
    nlCoreAddressInformation,
    nlCoreContactInformationEmailAddresses,
    nlCoreContactInformationTelephoneNumbers,
} from '../../elements';
import { type I18nContext } from '../../../i18n';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/nl-core-HealthcareProvider'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946116
 */
function parseNlCoreHealtcareProvider(resource: Location, _i18nContext: I18nContext) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R4),
        identifier: map(resource.identifier, parse.identifier),
        name: parse.string(resource.name),
        telephoneNumbers: map(resource.telecom, nlCoreContactInformationTelephoneNumbers.parse),
        emailAddresses: map(resource.telecom, nlCoreContactInformationEmailAddresses.parse),
        address: nlCoreAddressInformation.parse(resource.address),
        managingOrganization: parse.reference(resource.managingOrganization),
    };
}

export type NlCoreHealtcareProvider = ReturnType<typeof parseNlCoreHealtcareProvider>;

export const nlCoreHealtcareProvider = {
    profile,
    parse: parseNlCoreHealtcareProvider,
    uiSchema,
} satisfies ResourceConfigR4<Location, NlCoreHealtcareProvider>;
