import { Container } from '@minvws/mgo-mgo-ui';
import { type HTMLAttributes } from 'react';

export interface RibbonBannerProps extends HTMLAttributes<HTMLElement> {}

export const RibbonBanner = (props: RibbonBannerProps) => (
    <Container centeredContent {...props}>
        <div className="h-[30px] w-[37px] bg-[#154273] sm:h-[32px] sm:w-[50px]" />
    </Container>
);
