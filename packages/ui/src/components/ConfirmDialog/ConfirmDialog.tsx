import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { ConfirmDialogContent } from './ConfirmDialogContent';

/**
 * Confirm Dialog is based on the Alert Dialog from radix-ui.
 * The dialog can be controlled or uncontrolled.
 * See https://www.radix-ui.com/primitives/docs/components/alert-dialog for more information
 */
export const ConfirmDialog = {
    Root: AlertDialog.Root,
    Trigger: AlertDialog.Trigger,
    Content: ConfirmDialogContent,
};

export type {
    AlertDialogProps as ConfirmDialogRootProps,
    AlertDialogTriggerProps as ConfirmDialogTriggerProps,
} from '@radix-ui/react-alert-dialog';

export type { ConfirmDialogContentProps } from './ConfirmDialogContent';
