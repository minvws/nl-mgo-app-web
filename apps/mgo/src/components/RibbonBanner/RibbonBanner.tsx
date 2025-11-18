import { useIntl } from '$/intl';
import { RouterLink } from '$/routing';
import { cn, Container, focusStyle } from '@minvws/mgo-ui';
import { type HTMLAttributes } from 'react';

export type RibbonBannerProps = HTMLAttributes<HTMLElement>;

export const RibbonBanner = (props: RibbonBannerProps) => {
    const { formatMessage } = useIntl();

    return (
        <div {...props}>
            <Container centeredContent>
                <div className="relative left-[51px] sm:left-[97px] sm:pb-[9px] md:left-[107px] md:pb-[24px]">
                    <RouterLink
                        to="/"
                        aria-label={formatMessage('common.rijkslint_link')}
                        className={cn(focusStyle, 'block leading-none outline-offset-4')}
                    >
                        {/* Keep in sync with the ribbon in index.html file */}
                        <figure className="text-t-cat-rijkslint inline-flex items-end font-sans font-bold antialiased">
                            <picture className="mr-[10px] md:mr-[11px]">
                                <source
                                    srcSet="/rijkshuisstijl/ribbon-dark.svg"
                                    media="(prefers-color-scheme: dark)"
                                />

                                <img
                                    src="/rijkshuisstijl/ribbon.svg"
                                    className="h-[80px] w-auto sm:h-[90px] md:h-[100px]"
                                    alt="Logo Rijksoverheid"
                                />
                            </picture>
                            <figcaption className="relative top-[2px] text-[12px] leading-[1.15] sm:-top-[13px] sm:text-[13px] sm:leading-[1.16] sm:tracking-[.12px] md:text-[15px] md:-tracking-[.15px]">
                                Ministerie van <br className="block sm:hidden" />
                                Volksgezondheid, <br />
                                Welzijn en Sport
                            </figcaption>
                        </figure>
                    </RouterLink>
                </div>
            </Container>
        </div>
    );
};
