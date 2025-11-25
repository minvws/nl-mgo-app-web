import { useRef, type HTMLAttributes } from 'react';
import { Transition, type TransitionStatus } from 'react-transition-group';
import { useAnimationDuration } from '../../hooks';
import { type CompositionProps } from '../../hooks/useComposition/useComposition';
import { tw } from '../../utils';

export type FadeProps = HTMLAttributes<HTMLDivElement> &
    CompositionProps & {
        readonly duration?: number;
        readonly isVisible?: boolean;
    };

export const Fade = ({ className, children, isVisible, duration = 300, ...rest }: FadeProps) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const animationDuration = useAnimationDuration(duration);

    const transitionStyles: Partial<Record<TransitionStatus, string>> = {
        entering: tw`opacity-100`,
        entered: tw`opacity-100`,
        exiting: tw`opacity-0`,
        exited: tw`opacity-0`,
    };

    return (
        <Transition
            nodeRef={rootRef}
            in={isVisible}
            timeout={animationDuration}
            mountOnEnter
            unmountOnExit
        >
            {(state) => (
                <div
                    ref={rootRef}
                    style={{ transitionDuration: `${animationDuration}ms` }}
                    className={
                        `animate-ease-out transition-opacity ${transitionStyles[state]}` +
                        (className ? ` ${className}` : '')
                    }
                    {...rest}
                >
                    {children}
                </div>
            )}
        </Transition>
    );
};
