import { Container } from '@minvws/mgo-react-ui';
import Logo from './logo.svg?react';
import { type HTMLAttributes } from 'react';

export interface LogoBannerProps extends HTMLAttributes<HTMLElement> {}

export const LogoBanner = (props: LogoBannerProps) => (
    <div {...props}>
        <Container centeredContent>
            <Logo className="h-[50px] sm:h-[100px]" role="img" aria-label="Logo Rijksoverheid" />
        </Container>
    </div>
);
