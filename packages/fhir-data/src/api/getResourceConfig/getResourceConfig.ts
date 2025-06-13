import { FhirVersion, type FhirResource } from '@minvws/mgo-fhir-types';
import { type MgoResourceMeta } from '../../parse/helpers/resourceMeta/resourceMeta';
import { type ResourceConfig } from '../../resourceTypes';
import { resourcesMapR3, resourcesMapR4 } from '../resources/resources';

type Config<T extends FhirResource | MgoResourceMeta> = T extends FhirResource
    ? ResourceConfig<T, any> // eslint-disable-line @typescript-eslint/no-explicit-any
    : T extends MgoResourceMeta
      ? ResourceConfig<any, T> // eslint-disable-line @typescript-eslint/no-explicit-any
      : never;

export function getResourceConfig<T extends FhirResource | MgoResourceMeta>(
    profile: string | string[],
    fhirVersion: FhirVersion | `${FhirVersion}`
): Config<T> | undefined {
    const resourcesMap =
        FhirVersion[fhirVersion] === FhirVersion.R3 ? resourcesMapR3 : resourcesMapR4;

    let matchingProfile: string | undefined;

    if (Array.isArray(profile)) {
        matchingProfile = profile.map((x) => x.toLowerCase()).find((x) => !!resourcesMap[x]);
    } else {
        matchingProfile = profile.toLowerCase();
    }

    if (!!matchingProfile && resourcesMap[matchingProfile]) {
        return resourcesMap[matchingProfile] as unknown as Config<T>;
    }

    return undefined;
}
