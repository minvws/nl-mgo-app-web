import { Container } from '@minvws/mgo-ui';
import { type HTMLAttributes } from 'react';
import Logo from './logo.svg?react';

export type LogoBannerProps = HTMLAttributes<HTMLElement>;

export const LogoBanner = (props: LogoBannerProps) => (
    <div {...props}>
        <Container centeredContent>
            <Logo className="h-[75px] sm:h-[100px]" role="img" aria-label="Logo Rijksoverheid" />
        </Container>
    </div>
);
