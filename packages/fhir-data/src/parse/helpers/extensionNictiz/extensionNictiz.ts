import { type DomainResource, type Element } from '../../../types/FhirRX';
import { extension } from '../extension/extension';
import { type ParserKey, type ReturnTypeParser } from '../valueX/valueX';

const nictizIdValueXMap = {
    'BodySite-Qualifier': 'codeableConcept',
    'BodySite-Morphology': 'codeableConcept',
    'deviceUseStatement-reasonReferenceSTU3': 'reference',
    'zib-MedicalDevice-Organization': 'reference',
    'zib-MedicalDevice-Practitioner': 'reference',
    'zib-MedicationUse-AsAgreedIndicator': 'boolean',
    'zib-MedicationUse-Prescriber': 'reference',
    'zib-MedicationUse-Author': 'reference',
    'zib-MedicationUse-ReasonForChangeOrDiscontinuationOfUse': 'codeableConcept',
    'zib-Medication-MedicationTreatment': 'identifier',
    'zib-Medication-RepeatPeriodCyclicalSchedule': 'duration',
    'zib-MedicationUse-Duration': 'duration',
    'zib-Product-Description': 'string',
    'zib-NutritionAdvice-Explanation': 'string',
    'zib-Medication-PeriodOfUse': 'period',
    'zib-Medication-AdditionalInformation': 'codeableConcept',
    'zib-Medication-StopType': 'codeableConcept',
    'zib-AdministrationAgreement-AuthoredOn': 'dateTime',
    'zib-AdministrationAgreement-AgreementReason': 'string',
    'zib-AdvanceDirective-Disorder': 'reference',
    'zib-VaccinationRecommendation-OrderStatus': 'codeableConcept',
    'ext-Vaccination.PharmaceuticalProduct': 'reference',
    Comment: 'string',
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
