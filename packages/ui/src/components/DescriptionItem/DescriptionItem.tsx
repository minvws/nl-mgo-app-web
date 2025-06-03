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
            <Text className="flex-grow" asChild>
                <div>
                    {term ? (
                        <>
                            <dt
                                id={termId}
                                className="mb-1 text-xs text-gray-600 md:text-sm dark:text-gray-200"
                            >
                                {term}
                            </dt>
                            <dd aria-labelledby={termId}>{details}</dd>
                        </>
                    ) : (
                        details
                    )}
                </div>
            </Text>
        </div>
    );
};
