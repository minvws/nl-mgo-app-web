import { type HealthCategory } from '$/healthCategory';
import { RouterLink } from '$/routing';
import { DetailButton, ListWrapper } from '@minvws/mgo-mgo-ui';
import { type CategoryContentProps } from './categoryContent';
import { useOrganizationsStore } from '$/store';
import { Text } from '../../../../../packages/mgo-ui/src/components/Text/Text';
import { FormattedMessage } from 'react-intl';

export function PersonalInformation({
    data,
}: CategoryContentProps<HealthCategory.PersonalInformation>) {
    const { getPatientInformation } = data;
    const organisationStore = useOrganizationsStore();

    return (
        <>
            <Text asChild>
                <h2 className="mb-2">
                    <FormattedMessage id="health_category.personal_information.patient" />
                </h2>
            </Text>

            <ListWrapper gap="line">
                {getPatientInformation.map(({ id, slug, uiSchema, organizationId }) => {
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
