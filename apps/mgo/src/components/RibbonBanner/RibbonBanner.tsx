import { Container } from '@minvws/mgo-mgo-ui';
import { type HTMLAttributes } from 'react';

export interface RibbonBannerProps extends HTMLAttributes<HTMLElement> {}

export const RibbonBanner = (props: RibbonBannerProps) => (
    <Container centeredContent {...props}>
        <div className="h-[32px] w-[50px] bg-[#154273]" />
    </Container>
);
