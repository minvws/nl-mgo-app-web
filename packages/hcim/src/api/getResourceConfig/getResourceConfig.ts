import { FhirVersion, type FhirResource } from '@minvws/mgo-fhir';
import { type MgoResourceMeta } from '@minvws/mgo-hcim-parse';
import { type ResourceConfig } from '../../resourceTypes.js';
import { resourcesMapR3, resourcesMapR4 } from '../resources/resources.js';

type Config<
    V extends FhirVersion | `${FhirVersion}`,
    T extends FhirResource | MgoResourceMeta,
> = T extends FhirResource
    ? ResourceConfig<V, any, any> // eslint-disable-line @typescript-eslint/no-explicit-any
    : T extends MgoResourceMeta
      ? ResourceConfig<V, any, T> // eslint-disable-line @typescript-eslint/no-explicit-any
      : never;

export function getResourceConfig<
    T extends FhirResource | MgoResourceMeta,
    V extends FhirVersion | `${FhirVersion}`,
>(profile: string | string[], fhirVersion: V | `${V}`): Config<V, T> | undefined {
    const resourcesMap =
        FhirVersion[fhirVersion] === FhirVersion.R3 ? resourcesMapR3 : resourcesMapR4;

    let matchingProfile: string | undefined;

    if (Array.isArray(profile)) {
        matchingProfile = profile.map((x) => x.toLowerCase()).find((x) => !!resourcesMap[x]);
    } else {
        matchingProfile = profile.toLowerCase();
    }

    if (!!matchingProfile && resourcesMap[matchingProfile]) {
        return resourcesMap[matchingProfile] as unknown as Config<V, T>;
    }

    return undefined;
}
