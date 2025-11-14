import { cn } from '../../utils';
import { Card } from '../Card/Card';
import { DescriptionItem, type DescriptionItemProps } from '../DescriptionItem/DescriptionItem';

export type DescriptionCardProps = DescriptionItemProps;

export const DescriptionCard = ({ term, details, className, ...rest }: DescriptionCardProps) => {
    return (
        <Card
            className={cn('rounded-none rounded-t-lg rounded-b-lg border-0', className)}
            {...rest}
        >
            <DescriptionItem term={term} details={details} />
        </Card>
    );
};
