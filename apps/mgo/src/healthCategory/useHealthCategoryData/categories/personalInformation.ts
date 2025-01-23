import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';

export function getPersonalInformationData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        patientInformation: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://fhir.nl/fhir/StructureDefinition/nl-core-patient',
            organizationIdFilter
        ),
        practitionerInformation: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://fhir.nl/fhir/StructureDefinition/nl-core-practitioner',
            organizationIdFilter
        ),
    };
}
