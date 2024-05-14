import { useRef, type HTMLAttributes } from 'react';
import { Transition, type TransitionStatus } from 'react-transition-group';
import { type CompositionProps } from '../../hooks/useComposition/useComposition';
import { tw } from '../../utils/tw/tw';
import { twMerge } from 'tailwind-merge';
import { useOnMount } from '../../hooks/useOnMount/useOnMount';

export interface CollapseProps extends HTMLAttributes<HTMLDivElement>, CompositionProps {
    expanded: boolean;
}

export const Collapse = ({ className, children, expanded, ...rest }: CollapseProps) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const collapsedSize = '0px';

    useOnMount(() => {
        if (!expanded) {
            rootRef.current!.style.height = collapsedSize;
        }
    });

    const getWrapperSize = () => `${contentRef.current ? contentRef.current.clientHeight : 0}px`;

    const transitionStyles: Partial<Record<TransitionStatus, string>> = {
        entered: tw`overflow-visible`,
        entering: tw`overflow-hidden`,
        exited: tw`hidden`,
        exiting: tw`overflow-hidden`,
    };

    const callbacks = {
        onEnter: () => {
            rootRef.current!.style.height = collapsedSize;
        },
        onEntering: () => {
            rootRef.current!.style.height = getWrapperSize();
        },
        onEntered: () => {
            rootRef.current!.style.height = `auto`;
        },
        onExit: () => {
            rootRef.current!.style.height = getWrapperSize();
        },
        onExiting: () => {
            // Wait for the height to be set first
            setTimeout(() => {
                rootRef.current!.style.height = collapsedSize;
            });
        },
    };

    return (
        <Transition nodeRef={rootRef} in={expanded} timeout={300} {...callbacks}>
            {(state) => (
                <div
                    className={`selection:ease-[cubic-bezier(0.4, 0, 0.2, 1)] min-h-0 transform-gpu transition-[height] duration-300 ${transitionStyles[state]}`}
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
