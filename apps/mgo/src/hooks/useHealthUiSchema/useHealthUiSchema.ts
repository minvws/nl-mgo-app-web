import { Resource, useStore } from '$/store';
import {
    getDetails as getDetailsSchema,
    getSummary as getSummarySchema,
    HealthUiSchema,
} from '@minvws/mgo-hcim';
import { Locale } from '@minvws/mgo-intl';

export function useHealthUiSchema() {
    const getOrganizationById = useStore.use.getOrganizationById();

    function createSchemaFunction(
        schemaFunction: typeof getSummarySchema | typeof getDetailsSchema
    ) {
        function getSchema(resource: Resource): HealthUiSchema;
        function getSchema(resource: Resource | undefined): HealthUiSchema | undefined;
        function getSchema(resource: Resource | undefined): HealthUiSchema | undefined {
            if (!resource) return undefined;
            const organization = getOrganizationById(resource.source.organizationId);

            return schemaFunction(resource.mgoResource, {
                organization,
                locale: Locale.NL_NL,
            });
        }

        return getSchema;
    }

    return {
        getSummary: createSchemaFunction(getSummarySchema),
        getDetails: createSchemaFunction(getDetailsSchema),
    };
}
