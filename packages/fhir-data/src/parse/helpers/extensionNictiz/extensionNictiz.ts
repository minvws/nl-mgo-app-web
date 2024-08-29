import type { DomainResource, Element } from '../../../fhir';
import { extension } from '../extension/extension';
import { type ParserKey, type ReturnTypeParser } from '../valueX/valueX';

const nictizIdValueXMap = {
    'zib-MedicationUse-AsAgreedIndicator': 'boolean',
    'zib-MedicationUse-Prescriber': 'reference',
    'zib-MedicationUse-Author': 'reference',
    'zib-MedicationUse-ReasonForChangeOrDiscontinuationOfUse': 'codeableConcept',
    'zib-Medication-MedicationTreatment': 'identifier',
    'zib-Medication-RepeatPeriodCyclicalSchedule': 'duration',
    'zib-MedicationUse-Duration': 'duration',
    'zib-Product-Description': 'string',
} satisfies Record<string, ParserKey>;

type NictizId = keyof typeof nictizIdValueXMap;

export function extensionNictiz<
    T extends DomainResource | Element,
    Id extends NictizId,
    ValueType = (typeof nictizIdValueXMap)[Id],
    R = ReturnTypeParser<ValueType>,
>(resource: T | undefined, zibId: Id): R {
    return extension(
        resource,
        `http://nictiz.nl/fhir/StructureDefinition/${zibId}`,
        nictizIdValueXMap[zibId]
    );
}
