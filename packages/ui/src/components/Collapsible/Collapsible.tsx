import { useRef, type HTMLAttributes } from 'react';
import { Transition, type TransitionStatus } from 'react-transition-group';
import { useAnimationDuration } from '../../hooks';
import { type CompositionProps } from '../../hooks/useComposition/useComposition';
import { useOnMount } from '../../hooks/useOnMount/useOnMount';
import { cn, tw } from '../../utils';

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement>, CompositionProps {
    readonly isOpen: boolean;
}

export const Collapsible = ({ className, children, isOpen, ...rest }: CollapsibleProps) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const animationDuration = useAnimationDuration(300);
    const collapsedSize = '0px';

    useOnMount(() => {
        if (!isOpen) {
            rootRef.current!.style.height = collapsedSize;
        }
    });

    /* c8 ignore next, in practice `contentRef.current` is always available and can't be unset in a test */
    const getWrapperSize = () => `${contentRef.current ? contentRef.current.clientHeight : 0}px`;

    const transitionStyles: Partial<Record<TransitionStatus, string>> = {
        entering: tw`overflow-hidden opacity-100`,
        entered: tw`overflow-visible opacity-100`,
        exiting: tw`overflow-hidden opacity-0`,
        exited: tw`hidden opacity-0`,
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
        <Transition nodeRef={rootRef} in={isOpen} timeout={animationDuration} {...callbacks}>
            {(state) => (
                <div
                    style={{ transitionDuration: `${animationDuration}ms` }}
                    className={`min-h-0 transform-gpu opacity-0 transition-[height,opacity] ease-[cubic-bezier(0.4,0,0.2,1)] ${transitionStyles[state]}`}
                    ref={rootRef}
                >
                    <div ref={contentRef} className={cn('overflow-auto', className)} {...rest}>
                        {children}
                    </div>
                </div>
            )}
        </Transition>
    );
};
