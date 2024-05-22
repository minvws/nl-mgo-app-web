import { Trans } from '@lingui/macro';
import { type CompositionProps, useComposition } from '@minvws/mgo-mgo-ui';
import { type HTMLAttributes } from 'react';

export type MenuButtonProps = HTMLAttributes<HTMLElement> & CompositionProps;

export function MenuButton({ asChild, children, ...rest }: MenuButtonProps) {
    const { Comp, Slottable } = useComposition({ asChild, tag: 'button' });

    return (
        <Comp className="group inline-block p-2 outline-none" {...rest}>
            <Slottable>{children}</Slottable>
            <span className="border-sky-blue-600 text-sky-blue-600 group-hover:bg-sky-blue-600 block border p-2 text-xs font-bold leading-none group-hover:text-white group-focus:outline group-focus:outline-4 group-focus:outline-black">
                <Trans id="mobile-menu.menu">Menu</Trans>
            </span>
        </Comp>
    );
}
