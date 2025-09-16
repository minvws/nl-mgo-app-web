import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type StoreState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir';
import { type SubCategoryData } from '.';

export function getPersonalInformationData(
    getResourcesByProfile: StoreState['getResourcesByProfile'],
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        patientInformation: {
            label: `health_category.${HealthCategory.PersonalInformation}.patient_information`,
            data: getResourcesByProfile(
                FhirVersion.R3,
                'http://fhir.nl/fhir/StructureDefinition/nl-core-patient', // NOSONAR
                organizationIdFilter
            ),
        },
        practitionerInformation: {
            label: `health_category.${HealthCategory.PersonalInformation}.practitioner_information`,
            data: getResourcesByProfile(
                FhirVersion.R3,
                'http://fhir.nl/fhir/StructureDefinition/nl-core-practitioner', // NOSONAR
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
