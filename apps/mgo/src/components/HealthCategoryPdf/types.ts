import { StyleSheet } from '@react-pdf/renderer';

// Extract Style type from Styles interface as it is not exported by @react-pdf/renderer
type Styles = Parameters<typeof StyleSheet.create>[0];
export type Style = Styles[string];
