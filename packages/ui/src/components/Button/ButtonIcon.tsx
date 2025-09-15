import { isValidElement, type ReactElement } from 'react';
import { Icon } from '../Icon/Icon';
import { type IconName } from '../Icon/icons';

export interface ButtonIconProps {
    readonly icon?: IconName | ReactElement;
    readonly className?: string;
}

export const ButtonIcon = ({ icon, className }: ButtonIconProps) => {
    if (!icon) {
        return null;
    }

    return (
        <span className={className}>
            {isValidElement(icon) ? icon : <Icon icon={icon as IconName} />}
        </span>
    );
};
