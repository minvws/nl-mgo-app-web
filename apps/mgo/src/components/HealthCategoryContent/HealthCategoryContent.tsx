import { type HealthCategory } from '$/healthCategory';
import { type HealthCategoryData } from '$/healthCategory/useHealthCategoryData/useHealthCategoryData';
import { Stack } from '@minvws/mgo-ui';
import { HealthCategoryDetailList } from '../HealthCategoryDetailList/HealthCategoryDetailList';
import { useIntl } from '$/intl';
import { type SubCategoryData } from '$/healthCategory/useHealthCategoryData/categories';
import { type Resource } from '$/store';

export interface HealthCategoryContentProps<T extends HealthCategory> {
    readonly data: HealthCategoryData<T>;
}

export function HealthCategoryContent<T extends HealthCategory>({
    data,
}: HealthCategoryContentProps<T>) {
    const { formatMessage } = useIntl();

    const detailLists = Object.keys(data)
        .map((key) => {
            const categoryData = data[key as keyof HealthCategoryData] as SubCategoryData;
            const heading = formatMessage(categoryData.label);
            return {
                heading,
                element: (
                    <HealthCategoryDetailList
                        key={key}
                        heading={heading}
                        resources={categoryData.data as Resource[]}
                    />
                ),
            };
        })
        .sort((a, b) => a.heading.localeCompare(b.heading))
        .map((x) => x.element);

    return <Stack className="gap-4 md:gap-6">{detailLists}</Stack>;
}
