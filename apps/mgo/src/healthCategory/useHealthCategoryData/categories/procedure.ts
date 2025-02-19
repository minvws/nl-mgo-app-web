import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';

export function getProcedureData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        procedures: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-Procedure', // NOSONAR
            organizationIdFilter
        ),
        procedureRequests: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-ProcedureRequest', // NOSONAR
            organizationIdFilter
        ),
        episodes: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://fhir.nl/fhir/StructureDefinition/nl-core-episodeofcare', // NOSONAR
            organizationIdFilter
        ),
    };
}
