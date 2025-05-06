import { type DomainResource, type Element } from '@minvws/mgo-fhir-types';
import { extension } from '../extension/extension';
import { type ParserKey, type ReturnTypeParser } from '../valueX/valueX';

const nictizIdValueXMap = {
    'BodySite-Qualifier': 'codeableConcept',
    'BodySite-Morphology': 'codeableConcept',
    'zib-Product-Description': 'string',
    'zib-NutritionAdvice-Explanation': 'string',
    'ext-Vaccination.PharmaceuticalProduct': 'reference',
    'ext-PharmaceuticalProduct.Description': 'string',
    'EpisodeOfCare-Title': 'string',
    'EpisodeOfCare-DateFirstEncounter': 'dateTime',
    'EpisodeOfCare-DateLastEncounter': 'dateTime',
    Comment: 'string',
} satisfies Record<string, ParserKey>;

type NictizId = keyof typeof nictizIdValueXMap;

/**
 * @deprecated The method should not be used - these extension urls are rarely reused, if ever, so please just use `extension` instead.
 */
export function extensionNictiz<
    T extends DomainResource | Element,
    Id extends NictizId,
    ValueType = (typeof nictizIdValueXMap)[Id],
    R = ReturnTypeParser<ValueType>,
>(resource: T | undefined, zibId: Id): R {
    return extension(
        resource,
        `http://nictiz.nl/fhir/StructureDefinition/${zibId}`, // NOSONAR
        nictizIdValueXMap[zibId]
    );
}
