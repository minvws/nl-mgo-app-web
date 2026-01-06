import { AllOrNone } from '@minvws/mgo-utils';
import { cn } from '../../utils';
import { Button, ButtonLoadingProps } from '../Button/Button';
import { Card } from '../Card/Card';
import { Collapsible } from '../Collapsible/Collapsible';
import { Icon } from '../Icon/Icon';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { type UIEvent } from 'react';

export type ErrorNoticeProps = {
    readonly heading: string;
    readonly subHeading: string;
    readonly buttonLabel: string;
    readonly onClick: (event: UIEvent) => void | Promise<void>;
    readonly isOpen: boolean;
} & AllOrNone<ButtonLoadingProps>;

export function ErrorNotice({
    heading,
    subHeading,
    buttonLabel,
    isOpen,
    loading,
    loadingTextScreenReader,
    loadingSpinnerOnly,
    onClick,
}: ErrorNoticeProps) {
    const loadingProps = loading ? { loading, loadingTextScreenReader, loadingSpinnerOnly } : {};

    return (
        <Collapsible isOpen={isOpen}>
            <Card className="mb-8 flex grow flex-col sm:flex-row md:justify-between">
                <div className="flex grow gap-2">
                    <Icon icon="sync_problem" className={cn('text-t-symbol-primary h-6 w-6')} />
                    <Stack className="gap-1">
                        <Text className="font-bold">{heading}</Text>
                        <Text className="text-t-label-secondary">{subHeading}</Text>
                    </Stack>
                </div>
                <Button
                    className="mt-4 max-h-12 shrink-0 sm:mt-0 sm:ml-4 md:self-center"
                    {...loadingProps}
                    onClick={onClick}
                >
                    <Text className="text-t-label-invert font-bold">{buttonLabel}</Text>
                </Button>
            </Card>
        </Collapsible>
    );
}
