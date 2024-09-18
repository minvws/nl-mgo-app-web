import { type ResourcesState } from '$/store';

export function getPersonalInformationData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        getPatientInformation: resources.getResourcesByProfile(
            'http://fhir.nl/fhir/StructureDefinition/nl-core-patient',
            organizationIdFilter
        ),
    };
}
