import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';
import { type SubCategoryData } from '.';

export function getPersonalInformationData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        patientInformation: {
            label: `health_category.${HealthCategory.PersonalInformation}.patient_information`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://fhir.nl/fhir/StructureDefinition/nl-core-patient',
                organizationIdFilter
            ),
        },
        practitionerInformation: {
            label: `health_category.${HealthCategory.PersonalInformation}.practitioner_information`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://fhir.nl/fhir/StructureDefinition/nl-core-practitioner',
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
