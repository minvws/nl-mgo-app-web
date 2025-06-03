import { type HTMLAttributes } from 'react';
import { DescriptionCard } from '../DescriptionCard/DescriptionCard';
import { cn } from '../../utils';
import { type DescriptionItemProps } from '../DescriptionItem/DescriptionItem';
import { ListWrapper } from '../ListWrapper/ListWrapper';

export type DescriptionListProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
    (
        | {
              children: React.ReactNode;
              list?: never;
          }
        | {
              children?: never;
              list: DescriptionItemProps[];
          }
    );

export const DescriptionList = ({ list, children, className, ...rest }: DescriptionListProps) => {
    if (list?.length) {
        return (
            <ListWrapper asChild gap="line">
                <dl className={cn(className)} {...rest}>
                    {list.map(({ term, details }) => (
                        <DescriptionCard key={`${term}-${details}`} term={term} details={details} />
                    ))}
                </dl>
            </ListWrapper>
        );
    }

    return (
        <ListWrapper asChild gap="line">
            <dl className={cn(className)} {...rest}>
                {children}
            </dl>
        </ListWrapper>
    );
};
