import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';
import { type SubCategoryData } from '.';

export function getFunctionalOrMentalStatusData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        functionalOrMentalStatus: {
            label: `health_category.${HealthCategory.FunctionalOrMentalStatus}.functional_or_mental_status`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-FunctionalOrMentalStatus', // NOSONAR
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
