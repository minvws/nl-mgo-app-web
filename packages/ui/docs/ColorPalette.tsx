import { ReactNode } from 'react';

export type ColorPaletteProps = {
    title: string;
    children: ReactNode;
};

export const ColorPalette = ({ title, children }: ColorPaletteProps) => {
    return (
        <div className="mb-4! flex flex-col gap-2">
            <div className="text-md font-bold">{title}</div>
            <div className="flex gap-1">{children}</div>
        </div>
    );
};

export type ColorProps = {
    color: `bg-${string}`;
};
export const Color = ({ color }: ColorProps) => {
    const colorValue = color.split('-').slice(1).pop();
    return (
        <div className="flex flex-col items-center gap-1">
            <div className={`${color} h-20 w-18 rounded-md`} />
            <div className="text-center font-mono! text-[12px]! text-gray-500">{colorValue}</div>
        </div>
    );
};

ColorPalette.Color = Color;
