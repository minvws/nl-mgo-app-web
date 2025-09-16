import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type StoreState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir';
import { type SubCategoryData } from '.';

export function getWarningdata(
    getResourcesByProfile: StoreState['getResourcesByProfile'],
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        warnings: {
            label: `health_category.${HealthCategory.Warning}.warnings`,
            data: getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-Alert', // NOSONAR
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
