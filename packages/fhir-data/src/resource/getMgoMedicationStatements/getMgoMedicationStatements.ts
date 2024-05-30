import type { Bundle, FhirResource, InputFhir } from '../../fhir';
import { getBundleResources, safeGetBulk } from '../../utils';

export function getMgoMedicationStatements<T extends FhirResource>(bundle: InputFhir<Bundle<T>>) {
    const medicationStatements = getBundleResources(bundle, 'MedicationStatement');

    return medicationStatements.map((medicationStatement) => {
        return {
            ...safeGetBulk(medicationStatement, {
                title: ({ medicationReference }) => medicationReference.display,
                instructions: ({ dosage }) => dosage.map((x) => x.text).join(' '),
                prescribedBy: ({ extension }) =>
                    extension.find(
                        (x) =>
                            x.url ===
                            'http://nictiz.nl/fhir/StructureDefinition/zib-MedicationUse-Prescriber'
                    )?.valueReference.display,
                status: ({ status }) => status,
                startDate: ({ effectiveDateTime, effectivePeriod }) =>
                    effectiveDateTime || effectivePeriod.start,
            }),
        };
    });
}

export type MgoMedicationStatement = ReturnType<typeof getMgoMedicationStatements>[number];
