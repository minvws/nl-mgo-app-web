import { type HealthCategory } from '$/healthCategory';
import { type HealthCategoryData } from '$/healthCategory/useHealthCategoryData/useHealthCategoryData';
import { Stack } from '@minvws/mgo-mgo-ui';
import { HealthCategoryDetailList } from '../HealthCategoryDetailList/HealthCategoryDetailList';
import _ from 'lodash';

export interface HealthCategoryContentProps<T extends HealthCategory> {
    readonly category: T;
    readonly data: HealthCategoryData<T>;
}

export function HealthCategoryContent<T extends HealthCategory>({
    category,
    data,
}: HealthCategoryContentProps<T>) {
    const keys = Object.keys(data).sort((a: string, b: string) => a.localeCompare(b));

    return (
        <Stack className="gap-4 md:gap-6">
            {keys.map((key) => (
                <HealthCategoryDetailList
                    key={key}
                    category={category}
                    heading={_.snakeCase(key)}
                    resources={data[key as keyof HealthCategoryData]}
                />
            ))}
        </Stack>
    );
}
