import { type ObservationComponent } from '@minvws/mgo-fhir-types';
import { type Nullable } from '@minvws/mgo-mgo-utils';

export function findComponentByCode(
    components: Nullable<ObservationComponent[]>,
    code: string
): ObservationComponent | undefined {
    return components?.find((component) => component.code.coding?.find((x) => x.code === code));
}
