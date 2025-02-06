import { useRef, type HTMLAttributes } from 'react';
import { Transition, type TransitionStatus } from 'react-transition-group';
import { useAnimationDuration } from '../../hooks';
import { type CompositionProps } from '../../hooks/useComposition/useComposition';
import { tw } from '../../utils/tw/tw';

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
                        `transition-opacity ease-[cubic-bezier(0.4,0,0.2,1)] ${transitionStyles[state]}` +
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
