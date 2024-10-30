import { type ResourcesState } from '$/store';

export function getPersonalInformationData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        patientInformation: resources.getResourcesByProfile(
            'http://fhir.nl/fhir/StructureDefinition/nl-core-patient',
            organizationIdFilter
        ),
        practitionerInformation: resources.getResourcesByProfile(
            'http://fhir.nl/fhir/StructureDefinition/nl-core-practitioner',
            organizationIdFilter
        ),
    };
}
