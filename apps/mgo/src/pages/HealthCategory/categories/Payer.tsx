import { type HealthCategory } from '$/healthCategory';
import { RouterLink } from '$/routing';
import { DetailButton, ListWrapper, Text } from '@minvws/mgo-mgo-ui';
import { type CategoryContentProps } from '../categoryContent';
import { useOrganizationsStore } from '$/store';
import { FormattedMessage } from 'react-intl';

export function Payer({
    data,
}: CategoryContentProps<HealthCategory.Payer>) {
    const { getInsuranceInformation } = data;
    const organisationStore = useOrganizationsStore();

    return (
        <>
            <Text asChild>
                <h2 className="mb-2">
                    <FormattedMessage id="health_category.payer.payer" />
                </h2>
            </Text>

            <ListWrapper gap="line">
                {getInsuranceInformation.map(({ id, slug, uiSchema, organizationId }) => {
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
