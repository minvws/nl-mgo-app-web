import { type HealthUiSchemaFunction } from '../../../ui';
import { type R4NlCoreHealthcareProviderOrganization } from './nlCoreHealthcareProviderOrganization';

export const i18n = 'r4.nl_core_healthcare_provider_organization';
export const uiSchema: HealthUiSchemaFunction<R4NlCoreHealthcareProviderOrganization> = (
    resource,
    context
) => {
    const { ui, formatMessage } = context;

    /**
     * https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946118/~mappings
     */
    const zibHealthcareProvider = {
        HealthcareProviderIdentificationNumber: ui.identifier(
            `${i18n}.identifier`,
            resource.identifier
        ),
        DepartmentSpecialty: ui.codeableConcept(
            `${i18n}.department_speciality`,
            resource.departmentSpecialty
        ),
        OrganizationType: ui.codeableConcept(
            `${i18n}.organization_type`,
            resource.organizationType
        ),
        OrganizationName: ui.string(`${i18n}.name`, resource.name),
    };

    return {
        label: resource.name?.value ?? formatMessage(i18n),
        children: [
            {
                label: formatMessage(i18n),
                children: [
                    zibHealthcareProvider.HealthcareProviderIdentificationNumber,
                    zibHealthcareProvider.DepartmentSpecialty,
                    zibHealthcareProvider.OrganizationType,
                    zibHealthcareProvider.OrganizationName,
                ],
            },
        ],
    };
};
