import { type IconName } from '../Icon/icons';

export type MenuIcons = Extract<IconName, 'home' | 'favorite' | 'settings'>;
export const menuIconMap: Record<MenuIcons, IconName> = {
    home: 'home-fill',
    favorite: 'favorite-fill',
    settings: 'settings-fill',
};
export const menuIconNames = Object.keys(menuIconMap) as MenuIcons[];
