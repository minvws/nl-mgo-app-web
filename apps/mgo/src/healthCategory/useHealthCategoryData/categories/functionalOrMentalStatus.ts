import { type ResourcesState } from '$/store';

export function getFunctionalOrMentalStatusData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        functionalOrMentalStatus: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-FunctionalOrMentalStatus',
            organizationIdFilter
        ),
    };
}
