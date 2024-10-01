import { HealthCategory } from '$/healthCategory';
import { HealthCategoryDetailList } from '../HealthCategoryDetailList/HealthCategoryDetailList';
import { type CategoryContentProps } from './HealthCategoryContent';

export function Payer({ data }: CategoryContentProps<HealthCategory.PayerAndOrganization>) {
    const { getInsuranceInformation } = data;

    return (
        <>
            <HealthCategoryDetailList
                category={HealthCategory.PayerAndOrganization}
                heading="payer"
                resources={getInsuranceInformation}
            />
        </>
    );
}
