/* v8 ignore file -- @preserve */

import type { Organization, SearchResult, SearchResults } from '@minvws/mgo-org-search';

/**
 * This union type forces ts-json-schema-generator to include type-only imports
 * in the generated schema. Without this, TypeScript erases those types and
 * they will not appear in the output.
 */
export type SchemaTypes = Organization | SearchResult | SearchResults;
