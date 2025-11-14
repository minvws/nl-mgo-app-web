import { isValidElement, ReactNode, type ReactElement } from 'react';
import { cn } from '../../utils';
import { Icon } from '../Icon/Icon';
import { type IconName } from '../Icon/icons';

export interface ButtonIconProps {
    readonly icon?: IconName | ReactElement;
    readonly className?: string;
    readonly loading?: boolean;
    readonly spinner: ReactElement;
}

const renderIcon = (icon?: ReactNode) => {
    if (!icon) {
        return null;
    }
    return isValidElement(icon) ? icon : <Icon icon={icon as IconName} />;
};

export const ButtonIcon = ({ icon, className, loading, spinner }: ButtonIconProps) => {
    const IconElement = renderIcon(icon);

    return (
        <span
            aria-hidden
            className={cn(
                'relative inline-flex min-h-[1em] min-w-[1em] shrink-0 items-center justify-center text-[1.5em]',
                className
            )}
        >
            {loading && spinner}

            {IconElement && <span className={cn({ invisible: loading })}>{IconElement}</span>}
        </span>
    );
};
