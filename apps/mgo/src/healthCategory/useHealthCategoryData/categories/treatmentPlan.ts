import { HealthCategory } from '$/healthCategory/HealthCategory';
import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir';
import { type SubCategoryData } from '.';

export function getTreatmentPlanData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        getTreatmentDirectives: {
            label: `health_category.${HealthCategory.TreatmentPlan}.get_treatment_directives`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective', // NOSONAR
                organizationIdFilter
            ),
        },
        getAdvanceDirectives: {
            label: `health_category.${HealthCategory.TreatmentPlan}.get_advance_directives`,
            data: resources.getResourcesByProfile(
                FhirVersion.R3,
                'http://nictiz.nl/fhir/StructureDefinition/zib-AdvanceDirective', // NOSONAR
                organizationIdFilter
            ),
        },
    } satisfies Record<string, SubCategoryData>;
}
