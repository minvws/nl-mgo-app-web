import { type ObservationComponent } from 'fhir/r3';
import { type Nullable } from '../../../types/Nullable';

export function componentSlice(
    components: Nullable<ObservationComponent[]>,
    code: string
): ObservationComponent | undefined {
    return components?.find((component) => component.code.coding?.find((x) => x.code === code));
}
