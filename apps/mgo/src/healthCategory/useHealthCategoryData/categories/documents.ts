import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type StoreState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir';
import { type SubCategoryData } from '.';

export function getDocumentsData(
    getResourcesByProfile: StoreState['getResourcesByProfile'],
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        documents: {
            label: `health_category.${HealthCategory.Documents}.documents`,
            data: getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/IHE.MHD.Minimal.DocumentReference', // NOSONAR
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
