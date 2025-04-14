import { type FhirVersion } from '@minvws/mgo-fhir-types';
import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type MgoResource } from '../../api/resources/resources';

export function isMgoResource<V extends FhirVersion = FhirVersion>(
    value: unknown
): value is MgoResource<V> {
    const resourceTyped = value as Nullable<MgoResource<V>>;
    return !!resourceTyped?.resourceType && !!resourceTyped?.profile;
}
