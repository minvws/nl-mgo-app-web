import { Trans } from '@lingui/macro';
import { type CompositionProps, useComposition } from '@minvws/mgo-react-ui';
import { type HTMLAttributes } from 'react';

export type MenuButtonProps = HTMLAttributes<HTMLElement> & CompositionProps;

export function MenuButton({ asChild, children, ...rest }: MenuButtonProps) {
    const { Comp, Slottable } = useComposition({ asChild, tag: 'button' });

    return (
        <Comp className="group inline-block p-2 outline-none" {...rest}>
            <Slottable>{children}</Slottable>
            <span className="block border border-blue-600 p-2 text-sm font-bold leading-none text-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                <Trans id="mobile-menu.menu">Menu</Trans>
            </span>
        </Comp>
    );
}
