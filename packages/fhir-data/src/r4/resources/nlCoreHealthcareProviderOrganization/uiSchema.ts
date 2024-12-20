import { type UiSchemaFunction } from '../../../ui';
import { type NlCoreHealthcareProviderOrganization } from './nlCoreHealthcareProviderOrganization';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946118
 */
export const uiSchema: UiSchemaFunction<NlCoreHealthcareProviderOrganization> = (
    resource,
    context
) => {
    const profile = 'r4.nl_core_healthcare_provider_organization';
    const { ui, formatMessage, setEmptyEntries } = context;

    /**
     * https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946118/~mappings
     */
    const zibHealthcareProvider = {
        HealthcareProviderIdentificationNumber: ui.identifier(
            `${profile}.identifier`,
            resource.identifier
        ),
        DepartmentSpecialty: ui.codeableConcept(
            `${profile}.department_speciality`,
            resource.departmentSpecialty
        ),
        OrganizationType: ui.codeableConcept(
            `${profile}.organization_type`,
            resource.organizationType
        ),
        OrganizationName: ui.string(`${profile}.name`, resource.name),
    };

    return setEmptyEntries({
        label: resource.name ?? formatMessage(profile),
        children: [
            {
                label: formatMessage(profile),
                children: [
                    zibHealthcareProvider.HealthcareProviderIdentificationNumber,
                    zibHealthcareProvider.DepartmentSpecialty,
                    zibHealthcareProvider.OrganizationType,
                    zibHealthcareProvider.OrganizationName,
                ],
            },
        ],
    });
};
