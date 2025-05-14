import { type DomainResource, type Element } from '@minvws/mgo-fhir-types';
import { isNonNullish, type Nullable } from '@minvws/mgo-mgo-utils';
import { type ExtensionValue, type MgoType, type MgoTypeId } from '../../types';
import { valueX } from '../valueX/valueX';

function getAllExtensions<T extends DomainResource | Element>(resource: Nullable<T>, url: string) {
    return [
        ...(resource?.extension?.filter((x) => x.url === url) ?? []),
        ...((resource as Nullable<DomainResource>)?.modifierExtension?.filter(
            (x) => x.url === url
        ) ?? []),
    ];
}

export function extensionMultiple<T extends DomainResource | Element, Type extends MgoTypeId>(
    resource: Nullable<T>,
    url: string,
    valueType: Type
): ExtensionValue<MgoType<Type>>[] {
    const extensions = getAllExtensions(resource, url);
    // `valueX` attempts to restrict the value options based on the input object
    // But that does not apply here, so we need to cast the value type to `any`
    return extensions
        .map((x) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value = valueX(x, valueType as any) as MgoType<Type> | undefined;

            if (value) {
                return {
                    _ext: true,
                    ...value,
                };
            }
        })
        .filter(isNonNullish);
}

export function customExtensionMultiple<
    T extends DomainResource | Element,
    Parser extends (element: any) => unknown, // eslint-disable-line @typescript-eslint/no-explicit-any
>(
    resource: Nullable<T>,
    url: string,
    parser: Parser
): ExtensionValue<NonNullable<ReturnType<Parser>>>[] {
    const extensions = getAllExtensions(resource, url);
    return extensions
        .map((x) => {
            const value = parser(x) as ReturnType<Parser>;
            if (value) {
                return {
                    _ext: true,
                    ...value,
                };
            }
        })
        .filter(isNonNullish);
}
