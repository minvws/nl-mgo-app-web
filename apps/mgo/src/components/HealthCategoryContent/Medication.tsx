import { type HealthCategory } from '$/healthCategory';
import { RouterLink } from '$/routing';
import { DetailButton, Text } from '@minvws/mgo-mgo-ui';
import { type CategoryContentProps } from './HealthCategoryContent';
import { useOrganizationsStore } from '$/store';
import { FormattedMessage } from 'react-intl';

export function Medication({ data }: CategoryContentProps<HealthCategory.Medication>) {
    const { medicationUse } = data;

    const organisationStore = useOrganizationsStore();

    return (
        <>
            <Text asChild>
                <h2 className="mb-2">
                    <FormattedMessage id="health_category.medication.medication_use" />
                </h2>
            </Text>

            {medicationUse.map(({ id, slug, uiSchema, organizationId }) => {
                const organization = organisationStore.getOrganizationById(organizationId);
                return (
                    <DetailButton
                        key={id}
                        title={uiSchema.label}
                        description={organization?.name}
                        asChild
                    >
                        <RouterLink to={`./${slug}`} />
                    </DetailButton>
                );
            })}
        </>
    );
}
