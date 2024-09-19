import { type ResourcesState } from '$/store';

export function getPayerData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        getInsuranceInformation: resources.getResourcesByProfile(
            'http://nictiz.nl/fhir/StructureDefinition/zib-Payer',
            organizationIdFilter
        ),
    };
}
