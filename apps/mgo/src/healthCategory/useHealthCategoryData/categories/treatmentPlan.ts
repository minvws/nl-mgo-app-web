import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';

export function getTreatmentPlanData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        getTreatmentDirectives: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective',
            organizationIdFilter
        ),
        getAdvanceDirectives: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-AdvanceDirective',
            organizationIdFilter
        ),
    };
}
