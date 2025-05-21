import { type DomainResource, type Element } from '@minvws/mgo-fhir-types';
import { type MgoTypeId } from '../../types';
import { extension } from '../extension/extension';

const nictizIdValueXMap = {
    'BodySite-Qualifier': 'codeableConcept',
    'BodySite-Morphology': 'codeableConcept',
    'zib-NutritionAdvice-Explanation': 'string',
    'ext-Vaccination.PharmaceuticalProduct': 'reference',
    'ext-PharmaceuticalProduct.Description': 'string',
    Comment: 'string',
} satisfies Record<string, MgoTypeId>;

type NictizId = keyof typeof nictizIdValueXMap;

/**
 * @deprecated The method should not be used - these extension urls are rarely reused, if ever, so please just use `extension` instead.
 */
export function extensionNictiz<T extends DomainResource | Element, Id extends NictizId>(
    resource: T | undefined,
    zibId: Id
) {
    return extension(
        resource,
        `http://nictiz.nl/fhir/StructureDefinition/${zibId}`, // NOSONAR
        nictizIdValueXMap[zibId]
    );
}
