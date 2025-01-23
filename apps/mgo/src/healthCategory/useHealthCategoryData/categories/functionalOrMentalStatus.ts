import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';

export function getFunctionalOrMentalStatusData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        functionalOrMentalStatus: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-FunctionalOrMentalStatus',
            organizationIdFilter
        ),
    };
}
