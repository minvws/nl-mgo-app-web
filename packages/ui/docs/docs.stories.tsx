import { type StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import { Heading } from '../src/components/Heading/Heading';
import { Stack } from '../src/components/Stack/Stack';
import { Text } from '../src/components/Text/Text';

export default {
    title: 'documentation stories',
    tags: ['hideInSidebar'],
};

type TypographyStyleProps = {
    children: ReactNode;
    label: string;
};

const TypographyStyle = ({ label, children }: TypographyStyleProps) => (
    <div>
        <span className="text-center font-mono text-[12px] text-gray-500">{label}</span>
        <div>{children}</div>
    </div>
);

const fontCopy = `The quick brown fox jumps over the lazy dog.
0 1 2 3 4 5 6 7 8 9 ! ? ; : - ( ) [ ] { } ' " / \ @ # $ % & *.`;

const headingCopy = `The quick brown fox jumps over the lazy dog while vexed wizards quietly pack jumbo liquor boxes.`;

const bodyCopy = `
Jack quickly vexed the bright wizard by jumping over five lazy foxes.  
Sphinxes of black quartz judged my vow with zest, while quick zebras boxed daftly.  
Every jumbo liquor keg was packed carefully, making Fredrick’s exquisite opal jewels sparkle in vivid light.  
Crazy vixens juggled colorful boxes, and the quick brown fox leapt over the sleeping dog near the zebra enclosure.  
Bright zephyrs blew across the quiet village, vexing Jim’s tiny foxes as they jumped over logs and fences with playful zest.
`;

export const Fonts: StoryObj = {
    render: () => {
        return (
            <Stack>
                <TypographyStyle label="RO Sans Web">
                    <p className="leading- font-sans text-[1.5rem] font-normal whitespace-pre-line">
                        {fontCopy}
                    </p>
                </TypographyStyle>
                <TypographyStyle label="RO Sans Web Bold">
                    <p className="font-sans text-[1.5rem] font-bold whitespace-pre-line">
                        {fontCopy}
                    </p>
                </TypographyStyle>
                <TypographyStyle label="RO Sans Web Italic">
                    <p className="font-sans text-[1.5rem] whitespace-pre-line italic">{fontCopy}</p>
                </TypographyStyle>
            </Stack>
        );
    },
};

export const HeadingStyles: StoryObj = {
    render: () => {
        return (
            <Stack>
                <TypographyStyle label={`<Heading size="xl">`}>
                    <Heading size="xl">{headingCopy}</Heading>
                </TypographyStyle>
                <TypographyStyle label={`<Heading size="lg">`}>
                    <Heading size="lg">{headingCopy}</Heading>
                </TypographyStyle>
                <TypographyStyle label={`<Heading size="md">`}>
                    <Heading size="md">{headingCopy}</Heading>
                </TypographyStyle>
                <TypographyStyle label={`<Heading size="sm">`}>
                    <Heading size="sm">{headingCopy}</Heading>
                </TypographyStyle>
                <TypographyStyle label={`<Heading size="xs">`}>
                    <Heading size="xs">{headingCopy}</Heading>
                </TypographyStyle>
            </Stack>
        );
    },
};

export const BodyStyles: StoryObj = {
    render: () => {
        return (
            <Stack>
                <TypographyStyle label={`<Text size="lg">`}>
                    <Text size="lg">{bodyCopy}</Text>
                </TypographyStyle>
                <TypographyStyle label={`<Text size="md">`}>
                    <Text size="md">{bodyCopy}</Text>
                </TypographyStyle>
                <TypographyStyle label={`<Text size="sm">`}>
                    <Text size="sm">{bodyCopy}</Text>
                </TypographyStyle>
            </Stack>
        );
    },
};
