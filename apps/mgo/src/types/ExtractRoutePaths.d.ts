import type { DeepReadonly } from './DeepReadonly';
import type { DeepWriteable } from './DeepWritable';
import type { ToTuple } from './ToTuple';
import type { StringReplace } from './StringReplace';

type RouteObject = {
    path?: string;
    children?: RouteObject[];
};

type RoutePath<T> = T extends { path: string } ? T['path'] : '';

type JoinPaths<Prefix extends string, Path extends string> = Prefix extends `${infer _R}/`
    ? Path extends `/${infer Rest}`
        ? `${Prefix}${Rest}`
        : `${Prefix}${Path}`
    : Path extends `/${infer _R}`
      ? `${Prefix}${Path}`
      : `${Prefix}/${Path}`;

type ExtractPaths<
    R extends RouteObject,
    Prefix extends string = '',
    RootPath extends string = JoinPaths<Prefix, RoutePath<R>>,
> = R['children'] extends RouteObject[]
    ? RootPath | ExtractChildPaths<ToTuple<R['children'][number]>, RootPath>
    : RootPath;

type ExtractChildPaths<
    ChildRoutes extends unknown[],
    Prefix extends string = '',
> = ChildRoutes extends [infer T, ...infer R]
    ? T extends RouteObject
        ? R extends RouteObject[]
            ? ExtractPaths<T, Prefix> | ExtractChildPaths<R, Prefix>
            : never
        : never
    : never;

type RouteParam<T> = T extends `${string}:${infer Param}/${string}`
    ? Param
    : T extends `${string}:${infer Param}`
      ? Param
      : never;

/**
 * A utility type to replace all the route parameters in a path with a string.
 * It uses a `string & {}` type for params to ensure the autocomplete still works.
 * @see https://github.com/microsoft/TypeScript/issues/29729
 * Update: The above workaround for the autocomplete stopped working since TypeScript 5.3.3,
 * leaving it in for now in case it gets fixed.
 * @see https://github.com/microsoft/TypeScript/issues/57902
 *
 * @example
 * type RoutePaths = '/posts' | '/posts/:id' | '/posts/:id/details' ;
 * ReplaceParams<RoutePaths> // '/posts' | '/posts/${string}' | '/posts/${string}/details'
 */
type ReplaceParams<T extends string> =
    RouteParam<T> extends never
        ? T
        : T | ReplaceParams<StringReplace<T, `:${RouteParam<T>}`, `${string & {}}`>>; // eslint-disable-line @typescript-eslint/ban-types

/**
 * A utility type to extract all the paths from a route configuration.
 *
 * @template T - The literal typed route config
 *
 * @example
 * const routes = [{
 *      path: '/',
 *      children: [
 *          {
 *              path: 'welcome',
 *              element: <div />
 *          },
 *          {
 *              element: <div />,
 *              children: [
 *                  {
 *                      path: 'posts',
 *                      element: <div />,
 *                      children: [ { path: '/:id', element: <div /> } ]
 *                  },
 *              ]
 *          }
 *      ]
 *  }] as const
 *
 * ExtractRoutePaths<typeof routes> // '/' | '/welcome' | '/posts' | '/posts/${string}'
 */
export type ExtractRoutePaths<
    T extends readonly DeepReadonly<RouteObject>[],
    R = DeepWriteable<T>[number],
    Paths = ExtractChildPaths<ToTuple<R>>,
> = ReplaceParams<Paths>;

type ExtractParams<T> = T extends `${string}:${infer Param}/${string}`
    ? Param | ExtractParams<StringReplace<T, `:${Param}/`, ``>>
    : T extends `${string}:${infer Param}`
      ? Param
      : never;

export type ExtractRouteParams<
    T extends readonly DeepReadonly<RouteObject>[],
    R = DeepWriteable<T>[number],
    Paths = ExtractChildPaths<ToTuple<R>>,
> = ExtractParamsRecord<Paths>;

/**
 * A utility type to extract the route params record type from a path.
 *
 * @example
 * type RoutePaths = '/posts/:id' | '/posts/:id/details' | 'foo' | 'foo/:bar/baz/:faz'; ;
 * ExtractRouteParams<RoutePaths> // { id: string, bar: string, faz: string }
 */
type ExtractParamsRecord<T extends string, O = ExtractParams<T>> = {
    [K in O]: string;
};
