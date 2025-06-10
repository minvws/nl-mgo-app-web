import { twMerge } from 'tailwind-merge';
import { Icon, type IconProps } from '../Icon/Icon';

export type ListIconProps = IconProps;
export const ListIcon = ({ className, ...rest }: ListIconProps) => {
    return <Icon className={twMerge('me-4 shrink-0 text-[2.25em]', className)} {...rest} />;
};
