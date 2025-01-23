import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';

export function getPayerData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        getInsuranceInformation: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-Payer',
            organizationIdFilter
        ),
        getOrganizationInformation: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://fhir.nl/fhir/StructureDefinition/nl-core-organization',
            organizationIdFilter
        ),
    };
}
