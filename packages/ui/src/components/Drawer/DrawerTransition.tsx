import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';
import { Transition, type TransitionStatus } from 'react-transition-group';
import { useAnimationDuration } from '../../hooks';
import { cn } from '../../utils';
import { type DrawerSide } from './DrawerContent';

export interface DrawerTransitionProps {
    readonly open: boolean;
    readonly side: DrawerSide;
    readonly children: (params: {
        readonly overlayClassName: string;
        readonly contentClassName: string;
        readonly overlayStyle: CSSProperties;
        readonly contentStyle: CSSProperties;
    }) => ReactNode;
}

const hiddenPanelStyles: Record<DrawerSide, string> = {
    left: '-translate-x-full',
    right: 'translate-x-full',
    bottom: 'translate-y-full',
};

/**
 * Handles drawer enter/exit motion and keeps overlay fade synced with panel transitions.
 */
export const DrawerTransition = ({ open, side, children }: DrawerTransitionProps) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const [isVisible, setIsVisible] = useState(open);
    const overlayEnterDuration = useAnimationDuration(300);
    const overlayExitDuration = useAnimationDuration(200);
    const contentEnterDuration = useAnimationDuration(500);
    const contentExitDuration = useAnimationDuration(400);
    const easing = 'cubic-bezier(0.32, 0.72, 0, 1)';

    useEffect(() => {
        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    const handleEnter = () => {
        setIsVisible(false);
        animationFrameRef.current = requestAnimationFrame(() => {
            setIsVisible(true);
        });
    };

    const handleExit = () => {
        setIsVisible(false);
    };

    return (
        <Transition
            nodeRef={nodeRef}
            in={open}
            appear
            onEnter={handleEnter}
            onExit={handleExit}
            timeout={open ? contentEnterDuration : contentExitDuration}
            mountOnEnter
            unmountOnExit
        >
            {(_state: TransitionStatus) => (
                <div ref={nodeRef}>
                    {children({
                        overlayClassName: cn(
                            'fixed inset-0 z-40 bg-black/50 dark:bg-gray-950/75',
                            'transition-opacity',
                            isVisible ? 'opacity-100' : 'opacity-0'
                        ),
                        contentClassName: cn(
                            'transform-gpu transition-transform',
                            isVisible
                                ? 'translate-x-0 translate-y-0 opacity-100'
                                : cn(hiddenPanelStyles[side], 'opacity-100')
                        ),
                        overlayStyle: {
                            transitionDuration: `${open ? overlayEnterDuration : overlayExitDuration}ms`,
                            transitionTimingFunction: easing,
                        },
                        contentStyle: {
                            transitionDuration: `${open ? contentEnterDuration : contentExitDuration}ms`,
                            transitionTimingFunction: easing,
                        },
                    })}
                </div>
            )}
        </Transition>
    );
};
