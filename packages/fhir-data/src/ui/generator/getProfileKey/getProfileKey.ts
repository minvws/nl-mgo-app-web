import { type FhirVersion } from '@minvws/mgo-fhir-types/fhirVersion';
import { snakeCase } from 'lodash';
import { type NictizNlProfile } from '../../../resourceTypes';

export function getProfileKey(fhirVersion: `${FhirVersion}`, profile: NictizNlProfile): string {
    const name = profile.split('/').pop();
    return `${fhirVersion.toLowerCase()}.${snakeCase(name)}`;
}
