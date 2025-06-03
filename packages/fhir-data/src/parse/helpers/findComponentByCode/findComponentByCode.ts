import { type ObservationComponent } from '@minvws/mgo-fhir-types';
import { type Nullable } from '@minvws/mgo-utils';

/**
 * Returns the first observation component that has a matching code.
 * When multiple codes are given, it returns the first obsevation component that matches ONE OF the codes given.
 * @deprecated Use `parseObservationComponent` instead.
 */
export function findComponentByCode(
    components: Nullable<ObservationComponent[]>,
    code: string | string[]
): ObservationComponent | undefined {
    if (Array.isArray(code)) {
        return components?.find((component) =>
            component.code.coding?.find((x) => !!x.code && code.includes(x.code))
        );
    }
    return components?.find((component) => component.code.coding?.find((x) => x.code === code));
}
