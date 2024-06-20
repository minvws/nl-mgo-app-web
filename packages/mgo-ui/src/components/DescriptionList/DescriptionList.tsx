import { Fragment, type HTMLAttributes } from 'react';
import { DescriptionListDetails } from './DescriptionListDetails';
import { DescriptionListTerm } from './DescriptionListTerm';

export type DescriptionListItem = {
    term: NonNullable<React.ReactNode>;
    details: React.ReactNode;
};

export type DescriptionListProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
    (
        | {
              children: React.ReactNode;
              list?: never;
          }
        | {
              children?: never;
              list: DescriptionListItem[];
          }
    );

export const DescriptionList = ({ list, children, ...rest }: DescriptionListProps) => {
    if (list?.length) {
        return (
            <dl {...rest}>
                {list.map(({ term, details }) => (
                    <Fragment key={`${term}-${details}`}>
                        <DescriptionListTerm>{term}</DescriptionListTerm>
                        <DescriptionListDetails>
                            {details === undefined ? '-' : details}
                        </DescriptionListDetails>
                    </Fragment>
                ))}
            </dl>
        );
    }

    return <dl {...rest}>{children}</dl>;
};

DescriptionList.Term = DescriptionListTerm;
DescriptionList.Details = DescriptionListDetails;
