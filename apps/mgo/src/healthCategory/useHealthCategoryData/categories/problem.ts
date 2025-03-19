import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';
import { type SubCategoryData } from '.';
import { HealthCategory } from '$/healthCategory/HealthCategory';

export function getProblemData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        problems: {
            label: `health_category.${HealthCategory.Problems}.problems`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-Problem',
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
