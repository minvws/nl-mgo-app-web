import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';

export function getProblemData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        problems: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-Problem',
            organizationIdFilter
        ),
    };
}
