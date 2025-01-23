import { type DomainResource, type Element } from '@minvws/mgo-fhir-types';
import { type Nullable } from '../../../types/Nullable';
import { valueX, type ParserKey, type ReturnTypeParser } from '../valueX/valueX';

function getExtension<T extends DomainResource | Element>(resource: Nullable<T>, url: string) {
    return (
        resource?.extension?.find((x) => x.url === url) ??
        (resource as Nullable<DomainResource>)?.modifierExtension?.find((x) => x.url === url)
    );
}

export function extension<
    T extends DomainResource | Element,
    ValueType extends ParserKey,
    ParsedType = ReturnTypeParser<ValueType>,
>(resource: Nullable<T>, url: string, valueType: ValueType) {
    const extension = getExtension(resource, url);
    // `valueX` attempts to restrict the value options based on the input object
    // But that does not apply here, so we need to cast the value type to `any`
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return valueX(extension, valueType as any) as ParsedType;
}
