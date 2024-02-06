import { twMerge } from 'tailwind-merge';
import { DynamicElement, DynamicElementProps } from '../DynamicElement/DynamicElement';

export interface StackProps extends DynamicElementProps {}

/**
 * A small utility component to stack elements with even spacing.
 * It also provides a dynamic element option (see `DynamicElement`) .
 */
export const Stack = ({ className, ...rest }: StackProps) => (
    <DynamicElement className={twMerge('flex flex-col gap-2', className)} {...rest} />
);
