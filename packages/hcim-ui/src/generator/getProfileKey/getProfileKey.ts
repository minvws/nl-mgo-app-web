import { type FhirVersion, type NictizNlProfile } from '@minvws/mgo-fhir';
import { snakeCase } from 'lodash-es';

export function getProfileKey(fhirVersion: `${FhirVersion}`, profile: NictizNlProfile): string {
    const name = profile.split('/').pop();
    return `${fhirVersion.toLowerCase()}.${snakeCase(name)}`;
}
