import { type HTMLAttributes } from 'react';
import { useUniqueId } from '../../hooks';
import { cn } from '../../utils';
import { Text } from '../Text/Text';

export type DescriptionItemProps = HTMLAttributes<HTMLElement> & {
    readonly term?: React.ReactNode;
    readonly details: React.ReactNode;
};

export const DescriptionItem = ({ term, details, className }: DescriptionItemProps) => {
    const termId = useUniqueId('term');

    return (
        <div className={cn('flex items-center', className)}>
            <div className="w-full">
                {term ? (
                    <>
                        <Text as="dt" id={termId} size="sm" className="text-t-label-secondary mb-1">
                            {term}
                        </Text>
                        <Text as="dd" aria-labelledby={termId}>
                            {details}
                        </Text>
                    </>
                ) : (
                    <Text className="grow">{details}</Text>
                )}
            </div>
        </div>
    );
};
