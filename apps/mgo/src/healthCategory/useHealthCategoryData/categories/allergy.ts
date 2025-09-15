import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir';
import { type SubCategoryData } from '.';

export function getAllergyData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        allergies: {
            label: `health_category.${HealthCategory.AllergiesAndIntolerances}.allergies`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-AllergyIntolerance', // NOSONAR
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
