import { type HTMLAttributes } from 'react';
import { cn } from '../../utils';
import { DescriptionDetails } from './DescriptionDetails';
import { DescriptionTerm } from './DescriptionTerm';

export type DescriptionItemProps = HTMLAttributes<HTMLElement> & {
    readonly term?: React.ReactNode;
    readonly details: React.ReactNode;
};

export const DescriptionItem = ({ term, details, className }: DescriptionItemProps) => {
    return (
        <div className={cn('flex items-center', className)}>
            <dl className="flex-grow">
                {term && <DescriptionTerm>{term}</DescriptionTerm>}
                <DescriptionDetails>{details}</DescriptionDetails>
            </dl>
        </div>
    );
};

DescriptionItem.Term = DescriptionTerm;
DescriptionItem.Details = DescriptionDetails;
