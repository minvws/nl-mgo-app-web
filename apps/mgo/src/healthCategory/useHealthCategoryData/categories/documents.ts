import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';

export function getDocumentsData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        documents: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/IHE.MHD.Minimal.DocumentReference',
            organizationIdFilter
        ),
    };
}
