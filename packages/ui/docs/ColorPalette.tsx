import { ReactNode } from 'react';

export type ColorPaletteProps = {
    title: string;
    children: ReactNode;
};

export const ColorPalette = ({ title, children }: ColorPaletteProps) => {
    return (
        <div className="mb-4! flex flex-col gap-2">
            <div className="text-md font-bold">{title}</div>
            <div className="flex flex-wrap gap-1">{children}</div>
        </div>
    );
};

export const DarkColorPalette = ({ title, children }: ColorPaletteProps) => {
    return (
        <div className="mb-4! flex flex-col gap-2">
            <div className="text-md font-bold">{title}</div>
            <div className="relative flex flex-wrap gap-1 pl-4">
                <div className="absolute top-[calc(50%-10px)] left-[-10px] origin-center -translate-y-1/2 -rotate-90 transform bg-white/60 text-center font-mono! text-[14px]! text-gray-700">
                    light
                </div>
                <div className="flex flex-wrap gap-1">{children}</div>
            </div>
            <div className="dark relative flex flex-wrap gap-1 pl-4">
                <div className="absolute top-[calc(50%-10px)] left-[-10px] origin-center -translate-y-1/2 -rotate-90 transform bg-white/60 text-center font-mono! text-[14px]! text-gray-700">
                    dark
                </div>
                <div className="dark flex flex-wrap gap-1">{children}</div>
            </div>
        </div>
    );
};

export type ColorProps = {
    color: `bg-${string}`;
};

export const Color = ({ color }: ColorProps) => {
    const isTokenColor = color.startsWith('bg-t-');
    const colorValue = isTokenColor ? color.split('-').slice(3).join('-') : color.split('-').pop();
    return (
        <div className="flex flex-col items-center gap-1">
            <div className={`${color} h-22 w-20 overflow-hidden rounded-sm`} />
            <div className="break-word max-w-20 bg-white/60 text-center font-mono! text-[14px]! leading-[1.2] text-gray-700">
                {colorValue}
            </div>
        </div>
    );
};

ColorPalette.Color = Color;
