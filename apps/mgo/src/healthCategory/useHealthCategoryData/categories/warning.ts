import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';

export function getWarningdata(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        warnings: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-Alert',
            organizationIdFilter
        ),
    };
}
