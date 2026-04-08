import * as Dialog from '@radix-ui/react-dialog';
import { DrawerContent } from './DrawerContent';
import { DrawerRoot } from './DrawerRoot';

/**
 * Drawer is based on the Dialog primitive from radix-ui.
 * The drawer can be controlled or uncontrolled.
 * See https://www.radix-ui.com/primitives/docs/components/dialog for more information.
 */
export const Drawer = {
    Root: DrawerRoot,
    Trigger: Dialog.Trigger,
    Content: DrawerContent,
};

export type {
    DialogPortalProps as DrawerPortalProps,
    DialogTriggerProps as DrawerTriggerProps,
} from '@radix-ui/react-dialog';

export type { DrawerRootProps } from './DrawerRoot';
export type { DrawerContentProps, DrawerSide } from './DrawerContent';
