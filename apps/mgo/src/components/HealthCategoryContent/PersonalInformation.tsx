import { type HealthCategory } from '$/healthCategory';
import { RouterLink } from '$/routing';
import { DetailButton, ListWrapper, Text } from '@minvws/mgo-mgo-ui';
import { type CategoryContentProps } from './HealthCategoryContent';
import { useOrganizationsStore } from '$/store';
import { FormattedMessage } from 'react-intl';

export function PersonalInformation({
    data,
}: CategoryContentProps<HealthCategory.PersonalInformation>) {
    const { patientInformation } = data;
    const organisationStore = useOrganizationsStore();

    return (
        <>
            <Text asChild>
                <h2 className="mb-2">
                    <FormattedMessage id="health_category.personal_information.patient" />
                </h2>
            </Text>

            <ListWrapper gap="line">
                {patientInformation.map(({ id, slug, uiSchema, organizationId }) => {
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
            </ListWrapper>
        </>
    );
}
