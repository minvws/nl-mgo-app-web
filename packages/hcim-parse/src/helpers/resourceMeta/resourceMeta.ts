import { NictizNlProfile, type FhirVersion, type Resource } from '@minvws/mgo-fhir';

export type MgoResourceMeta<
    T extends NictizNlProfile = NictizNlProfile,
    V extends FhirVersion = FhirVersion,
> = {
    id: string | undefined;
    referenceId: `${string | undefined}/${string | undefined}`;
    resourceType: string | undefined;
    profile: T;
    // We use `${V}` to get the string value of the enum.
    // We do this because the enum reference itself does not translate well into the JSON schema types.
    fhirVersion: `${V}`;
};

export function resourceMeta<T extends NictizNlProfile, V extends FhirVersion>(
    resource: Resource,
    profile: T,
    fhirVersion: V,
    _i18nProfile?: NictizNlProfile
) {
    const { resourceType, id, meta } = resource;

    if (!meta?.profile?.includes(profile)) {
        throw new Error(
            `Resource does not have the expected profile: "${profile}". Got: ${meta?.profile}`
        );
    }

    return {
        id,
        referenceId: `${resourceType}/${id}`,
        resourceType,
        profile,
        fhirVersion: `${fhirVersion}`,
    } as const satisfies MgoResourceMeta<T, V>;
}
