import { useRef, type HTMLAttributes } from 'react';
import { Transition, type TransitionStatus } from 'react-transition-group';
import { twMerge } from 'tailwind-merge';
import { useAnimationDuration } from '../../hooks';
import { type CompositionProps } from '../../hooks/useComposition/useComposition';
import { useOnMount } from '../../hooks/useOnMount/useOnMount';
import { tw } from '../../utils/tw/tw';

export interface CollapseProps extends HTMLAttributes<HTMLDivElement>, CompositionProps {
    readonly expanded: boolean;
}

export const Collapse = ({ className, children, expanded, ...rest }: CollapseProps) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const animationDuration = useAnimationDuration(300);
    const collapsedSize = '0px';

    useOnMount(() => {
        if (!expanded) {
            rootRef.current!.style.height = collapsedSize;
        }
    });

    /* c8 ignore next, in practice `contentRef.current` is always available and can't be unset in a test */
    const getWrapperSize = () => `${contentRef.current ? contentRef.current.clientHeight : 0}px`;

    const transitionStyles: Partial<Record<TransitionStatus, string>> = {
        entering: tw`overflow-hidden`,
        entered: tw`overflow-visible`,
        exiting: tw`overflow-hidden`,
        exited: tw`hidden`,
    };

    const callbacks = {
        onEnter: () => {
            /* c8 ignore next */
            if (!rootRef.current) return;
            rootRef.current.style.height = collapsedSize;
        },
        onEntering: () => {
            /* c8 ignore next */
            if (!rootRef.current) return;
            rootRef.current.style.height = getWrapperSize();
        },
        onEntered: () => {
            /* c8 ignore next */
            if (!rootRef.current) return;
            rootRef.current.style.height = `auto`;
        },
        onExit: () => {
            /* c8 ignore next */
            if (!rootRef.current) return;
            rootRef.current.style.height = getWrapperSize();
        },
        onExiting: () => {
            // Wait for the height to be set first
            setTimeout(() => {
                /* c8 ignore next */
                if (!rootRef.current) return;
                rootRef.current.style.height = collapsedSize;
            });
        },
    };

    return (
        <Transition nodeRef={rootRef} in={expanded} timeout={animationDuration} {...callbacks}>
            {(state) => (
                <div
                    style={{ transitionDuration: `${animationDuration}ms` }}
                    className={`min-h-0 transform-gpu transition-[height] ease-[cubic-bezier(0.4,0,0.2,1)] ${transitionStyles[state]}`}
                    ref={rootRef}
                >
                    <div ref={contentRef} className={twMerge('overflow-auto', className)} {...rest}>
                        {children}
                    </div>
                </div>
            )}
        </Transition>
    );
};
