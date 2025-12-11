import { Heading, Illustration, type IllustrationProps, Text } from '@minvws/mgo-ui';
import { type HTMLAttributes } from 'react';

export interface QueryStateLayoutProps extends HTMLAttributes<HTMLElement> {
    readonly illustration?: IllustrationProps['illustration'];
    readonly title?: string;
}

export function QueryStateLayout({ illustration, title, children }: QueryStateLayoutProps) {
    return (
        <div className="mx-auto max-w-xs py-6 md:py-8 lg:py-10">
            {illustration && (
                <Illustration
                    illustration={illustration}
                    className="mx-auto mb-8 w-full max-w-[165px] md:mb-10 md:max-w-[233px] lg:mb-12"
                />
            )}
            {title && (
                <Heading className="mb-2 md:mb-3 lg:mb-4" as="h2">
                    {title}
                </Heading>
            )}
            <Text as="div">{children}</Text>
        </div>
    );
}
