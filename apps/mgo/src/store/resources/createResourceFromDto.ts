import { type DataServiceId } from '@minvws/mgo-data-services';
import { type FhirVersion } from '@minvws/mgo-fhir';
import { getSummary, HealthUiSchema, type MgoResource } from '@minvws/mgo-hcim';
import { Locale } from '@minvws/mgo-intl';
import { createUniqueSlug } from '@minvws/mgo-utils';
import { HealthcareOrganization } from '../organizations/organizations';

export type Resource<
    V extends FhirVersion = FhirVersion,
    T extends MgoResource<V> = MgoResource<V>,
> = {
    id: string;
    slug: string;
    summary: HealthUiSchema;
    organizationId: string;
    dataServiceId: DataServiceId;
    dataServiceMethod: string;
    mgoResource: T;
};

export type ResourceDTO<V extends FhirVersion = FhirVersion> = Pick<
    Resource<V>,
    'organizationId' | 'dataServiceId' | 'mgoResource' | 'dataServiceMethod'
> & {
    id?: never;
};

export function createResourceFromDto(
    dto: ResourceDTO,
    organization: HealthcareOrganization,
    slugs: string[]
): Resource {
    const { organizationId, dataServiceId, mgoResource, dataServiceMethod } = dto;
    const summary = getSummary(mgoResource, { organization, locale: Locale.NL_NL });

    return {
        id: `${organizationId}-${dataServiceId}-${mgoResource.referenceId}`,
        // NOTE: Do not use any resource information as a slug as it could potentially be sensitive information
        slug: createUniqueSlug(`${slugs.length}`, slugs),
        summary,
        organizationId,
        dataServiceId,
        dataServiceMethod,
        mgoResource,
    };
}
