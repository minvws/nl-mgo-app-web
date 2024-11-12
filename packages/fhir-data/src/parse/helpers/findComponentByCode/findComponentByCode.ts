import { type ObservationComponent } from '../../../types/FhirRX';
import { type Nullable } from '../../../types/Nullable';

export function findComponentByCode(
    components: Nullable<ObservationComponent[]>,
    code: string
): ObservationComponent | undefined {
    return components?.find((component) => component.code.coding?.find((x) => x.code === code));
}
