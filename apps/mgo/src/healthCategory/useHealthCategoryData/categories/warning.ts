import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';
import { type SubCategoryData } from '.';
import { HealthCategory } from '$/healthCategory/HealthCategory';

export function getWarningdata(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        warnings: {
            label: `health_category.${HealthCategory.Warning}.warnings`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-Alert',
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
