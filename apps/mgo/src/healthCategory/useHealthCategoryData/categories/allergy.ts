import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';

export function getAllergyData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        allergies: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-AllergyIntolerance',
            organizationIdFilter
        ),
    };
}
