import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type StoreState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir';
import { type SubCategoryData } from '.';

export function getProblemData(
    getResourcesByProfile: StoreState['getResourcesByProfile'],
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        problems: {
            label: `health_category.${HealthCategory.Problems}.problems`,
            data: getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-Problem', // NOSONAR
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
