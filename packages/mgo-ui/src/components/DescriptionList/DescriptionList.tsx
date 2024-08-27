import { type HTMLAttributes } from 'react';
import { DescriptionCard } from '../DescriptionCard/DescriptionCard';
import { cn } from '../../utils';
import { type DescriptionItemProps } from '../DescriptionItem/DescriptionItem';

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
            <dl className={cn('flex flex-col gap-[1px]', className)} {...rest}>
                {list.map(({ term, details }) => (
                    <DescriptionCard key={`${term}-${details}`} term={term} details={details} />
                ))}
            </dl>
        );
    }

    return (
        <dl className={cn('flex flex-col gap-[1px]', className)} {...rest}>
            {children}
        </dl>
    );
};
