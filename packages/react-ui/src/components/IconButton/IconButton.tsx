import { Icon, type IconProps } from '../Icon/Icon';
import {
    useComposition,
    type CompositionPropsWithoutChildren,
} from '../../hooks/useComposition/useComposition';
import { type HTMLAttributes } from 'react';
import { Slottable } from '@radix-ui/react-slot';

export type IconButtonProps = IconProps &
    CompositionPropsWithoutChildren &
    HTMLAttributes<HTMLElement>;

export const IconButton = ({ name, label, asChild, children, ...rest }: IconButtonProps) => {
    const { Comp } = useComposition({ asChild, tag: 'button' });

    return (
        <Comp className="group inline-block rounded-full p-2 outline-none sm:p-0" {...rest}>
            <Slottable>{children}</Slottable>
            <span className="bg-grey-100 group-hover:bg-grey-200 flex h-8 w-8 items-center justify-center rounded-full sm:h-12 sm:w-12">
                <Icon
                    name={name}
                    label={label}
                    className="h-[1.25em] w-[1.25em] sm:h-[1.75em] sm:w-[1.75em]"
                />
            </span>
        </Comp>
    );
};
