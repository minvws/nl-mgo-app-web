import { cn } from '../../utils';
import { Card } from '../Card/Card';
import { DescriptionItem, type DescriptionItemProps } from '../DescriptionItem/DescriptionItem';

export type DescriptionCardProps = DescriptionItemProps;

export const DescriptionCard = ({ term, details, className, ...rest }: DescriptionCardProps) => {
    return (
        <Card
            className={cn(
                'overflow-hidden rounded-none border-none shadow-none first:rounded-t-lg last:rounded-b-lg',
                className
            )}
            {...rest}
        >
            <DescriptionItem term={term} details={details} />
        </Card>
    );
};
