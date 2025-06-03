import { type Element as ElementR3, type Extension as ExtensionR3 } from 'fhir/r3';
import { type Element as ElementR4, type Extension as ExtensionR4 } from 'fhir/r4';

import { type Nullable } from '@minvws/mgo-utils';
import { filterPrimitive, type ExtractKeysWithMeta } from '../filterPrimitive/filterPrimitive';

export function filterPrimitiveByExtension<
    Resource extends ElementR3 | ElementR4,
    Key extends ExtractKeysWithMeta<Resource>,
>(element: Nullable<Resource>, key: Key, extension: ExtensionR3 | ExtensionR4) {
    return filterPrimitive(element, key, (meta) => {
        if (!meta.extension) {
            return false;
        }

        const extensionEntries = Object.entries(extension) as [keyof typeof extension, unknown][];

        return meta.extension.some((ext) => {
            for (const [key, value] of extensionEntries) {
                if (ext[key] !== value) return false;
            }
            return true;
        });
    });
}
