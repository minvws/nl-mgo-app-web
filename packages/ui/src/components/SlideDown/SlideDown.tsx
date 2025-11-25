import { useRef, type HTMLAttributes } from 'react';
import { Transition, type TransitionStatus } from 'react-transition-group';
import { type EnterHandler, type ExitHandler } from 'react-transition-group/Transition';
import { useAnimationDuration } from '../../hooks';
import { type CompositionProps } from '../../hooks/useComposition/useComposition';
import { cn, tw } from '../../utils';

export type SlideDownProps = HTMLAttributes<HTMLDivElement> &
    CompositionProps & {
        readonly duration?: number;
        readonly isDown: boolean;
        readonly onEnter?: EnterHandler<HTMLDivElement>;
        readonly onExited?: ExitHandler<HTMLDivElement>;
    };

export const SlideDown = ({
    className,
    children,
    isDown,
    duration = 300,
    onEnter,
    onExited,
    ...rest
}: SlideDownProps) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const animationDuration = useAnimationDuration(duration);

    const transitionStyles: Partial<Record<TransitionStatus, string>> = {
        entering: tw`translate-y-0`,
        entered: tw`translate-y-0`,
        exiting: tw`-translate-y-full`,
        exited: tw`-translate-y-full`,
    };

    return (
        <Transition
            nodeRef={rootRef}
            in={isDown}
            timeout={animationDuration}
            onEnter={onEnter}
            onExited={onExited}
            mountOnEnter
            unmountOnExit
        >
            {(state) => (
                <div ref={rootRef} className={cn('overflow-hidden', className)} {...rest}>
                    <div
                        style={{ transitionDuration: `${animationDuration}ms` }}
                        className={`transform-gpu transition-[transform] ease-[cubic-bezier(0.4,0,0.2,1)] ${transitionStyles[state]}`}
                    >
                        {children}
                    </div>
                </div>
            )}
        </Transition>
    );
};
