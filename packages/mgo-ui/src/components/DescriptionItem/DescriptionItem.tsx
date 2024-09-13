import { type HTMLAttributes } from 'react';
import { cn } from '../../utils';
import { DescriptionDetails } from './DescriptionDetails';
import { DescriptionTerm } from './DescriptionTerm';
import { useUniqueId } from '../../hooks';

export type DescriptionItemProps = HTMLAttributes<HTMLElement> & {
    readonly term?: React.ReactNode;
    readonly details: React.ReactNode;
};

export const DescriptionItem = ({ term, details, className }: DescriptionItemProps) => {
    const termId = useUniqueId('term');
    const labelledBy = term ? { ['aria-labelledby']: termId } : {};

    return (
        <div className={cn('flex items-center', className)}>
            <div className="flex-grow">
                {term && <DescriptionTerm id={termId}>{term}</DescriptionTerm>}
                <DescriptionDetails {...labelledBy}>{details}</DescriptionDetails>
            </div>
        </div>
    );
};

DescriptionItem.Term = DescriptionTerm;
DescriptionItem.Details = DescriptionDetails;
