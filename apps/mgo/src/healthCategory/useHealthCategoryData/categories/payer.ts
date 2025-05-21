import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';
import { type SubCategoryData } from '.';

export function getPayerData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        getInsuranceInformation: {
            label: `health_category.${HealthCategory.PayerAndOrganization}.get_insurance_information`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-Payer', // NOSONAR
                organizationIdFilter
            ),
        },
        getOrganizationInformation: {
            label: `health_category.${HealthCategory.PayerAndOrganization}.get_organization_information`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://fhir.nl/fhir/StructureDefinition/nl-core-organization', // NOSONAR
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
