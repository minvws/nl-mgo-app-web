import { type ResourcesState } from '$/store';
import { FhirVersion } from '@minvws/mgo-fhir-data';

export function getLaboratoryResultData(
    resources: ResourcesState,
    organizationIdFilter?: (string | undefined)[]
) {
    return {
        laboratoryResults: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/zib-LaboratoryTestResult-Observation', // NOSONAR,
            organizationIdFilter
        ),
        gpLaboratoryResults: resources.getResourcesByProfile(
            FhirVersion.R3,
            'http://nictiz.nl/fhir/StructureDefinition/gp-LaboratoryResult', // NOSONAR
            organizationIdFilter
        ),
    };
}
