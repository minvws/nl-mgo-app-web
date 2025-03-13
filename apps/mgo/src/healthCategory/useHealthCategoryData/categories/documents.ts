import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';
import { type SubCategoryData } from '.';
import { HealthCategory } from '$/healthCategory/HealthCategory';

export function getDocumentsData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        documents: {
            label: `health_category.${HealthCategory.Documents}.documents`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/IHE.MHD.Minimal.DocumentReference',
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
