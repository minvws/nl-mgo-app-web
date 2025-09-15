const DPI = 72;

export function pxToPt(px: number): number {
    return Math.round(((px * 72) / DPI) * 100) / 100;
}
