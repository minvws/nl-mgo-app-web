import { Text, type TextProps } from '../Text/Text';
import { cn } from '../../utils';
import { useComposition, type CompositionProps } from '../../hooks';

export type DescriptionDetailsProps = TextProps & CompositionProps;

export const DescriptionDetails = ({
    className,
    children,
    asChild,
    ...rest
}: DescriptionDetailsProps) => {
    const { Comp } = useComposition({ asChild, tag: 'dd' });
    return (
        <Text className={cn(className)} {...rest} asChild>
            <Comp>{children}</Comp>
        </Text>
    );
};
