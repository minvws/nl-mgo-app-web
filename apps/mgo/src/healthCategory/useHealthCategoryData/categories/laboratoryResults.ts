import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir';
import { type SubCategoryData } from '.';

export function getLaboratoryResultData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        laboratoryResults: {
            label: `health_category.${HealthCategory.LaboratoryResults}.laboratory_results`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-LaboratoryTestResult-Observation', // NOSONAR,
                organizationIdFilter
            ),
        },
        gpLaboratoryResults: {
            label: `health_category.${HealthCategory.LaboratoryResults}.gp_laboratory_results`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/gp-LaboratoryResult', // NOSONAR
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
