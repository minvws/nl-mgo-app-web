import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type StoreState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir';
import { type SubCategoryData } from '.';

export function getProcedureData(
    getResourcesByProfile: StoreState['getResourcesByProfile'],
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        procedures: {
            label: `health_category.${HealthCategory.Procedures}.procedures`,
            data: getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-Procedure', // NOSONAR
                organizationIdFilter
            ),
        },
        procedureRequests: {
            label: `health_category.${HealthCategory.Procedures}.procedure_requests`,
            data: getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-ProcedureRequest', // NOSONAR
                organizationIdFilter
            ),
        },
        episodes: {
            label: `health_category.${HealthCategory.Procedures}.episodes`,
            data: getResourcesByProfile(
                FhirVersion.R3,
                'http://fhir.nl/fhir/StructureDefinition/nl-core-episodeofcare', // NOSONAR
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
