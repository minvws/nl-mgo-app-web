import { type DomainResource, type Element } from '@minvws/mgo-fhir-types';
import { isNonNullish, type Nullable } from '@minvws/mgo-mgo-utils';
import { valueX, type ParserKey, type ReturnTypeParser } from '../valueX/valueX';

function getAllExtensions<T extends DomainResource | Element>(resource: Nullable<T>, url: string) {
    return [
        ...(resource?.extension?.filter((x) => x.url === url) ?? []),
        ...((resource as Nullable<DomainResource>)?.modifierExtension?.filter(
            (x) => x.url === url
        ) ?? []),
    ];
}

export function extensionMultiple<
    T extends DomainResource | Element,
    ValueType extends ParserKey,
    ParsedType = ReturnTypeParser<ValueType>,
>(resource: Nullable<T>, url: string, valueType: ValueType) {
    const extensions = getAllExtensions(resource, url);
    // `valueX` attempts to restrict the value options based on the input object
    // But that does not apply here, so we need to cast the value type to `any`
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return extensions.map((x) => valueX(x, valueType as any) as ParsedType).filter(isNonNullish);
}

export function customExtensionMultiple<
    T extends DomainResource | Element,
    Parser extends (element: any) => unknown, // eslint-disable-line @typescript-eslint/no-explicit-any
    RT = ReturnType<Parser>,
>(resource: Nullable<T>, url: string, parser: Parser) {
    const extensions = getAllExtensions(resource, url);
    return extensions.map((x) => parser(x) as RT).filter(isNonNullish);
}
