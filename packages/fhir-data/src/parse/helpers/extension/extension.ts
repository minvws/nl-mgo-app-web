import { type DomainResource, type Element, type Reference } from '@minvws/mgo-fhir-types';
import { type Nullable } from '@minvws/mgo-utils';
import { type ExtensionValue, type MgoType, type MgoTypeId } from '../../types';
import { valueX } from '../valueX/valueX';

function getExtension<T extends DomainResource | Element>(resource: Nullable<T>, url: string) {
    return (
        resource?.extension?.find((x) => x.url === url) ??
        (resource as Nullable<DomainResource>)?.modifierExtension?.find((x) => x.url === url)
    );
}

export function extension<T extends DomainResource | Element, Type extends MgoTypeId = MgoTypeId>(
    resource: Nullable<T>,
    url: string,
    valueType: Type
): ExtensionValue<MgoType<Type>> | undefined {
    const extension = getExtension(resource, url);
    // `valueX` attempts to restrict the value options based on the input object
    // But that does not apply here, so we need to cast the value type to `any`
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = valueX(extension, valueType as any) as MgoType<Type> | undefined;
    if (value) {
        return {
            _ext: true,
            ...value,
        };
    }

    return undefined;
}

export function customExtension<
    T extends DomainResource | Element | Reference,
    Parser extends (element: any) => unknown, // eslint-disable-line @typescript-eslint/no-explicit-any
>(
    resource: Nullable<T>,
    url: string,
    parser: Parser
): ExtensionValue<NonNullable<ReturnType<Parser>>> | undefined {
    const extension = getExtension(resource, url);
    const value = parser(extension) as ReturnType<Parser>;
    if (value) {
        return {
            _ext: true,
            ...value,
        };
    }

    return undefined;
}
