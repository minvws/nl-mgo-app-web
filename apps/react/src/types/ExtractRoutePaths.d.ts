import type { DeepReadonly } from './DeepReadonly';
import type { DeepWriteable } from './DeepWritable';
import type { ToTuple } from './ToTuple';

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
 * ExtractRoutePaths<typeof routes> // '/' | '/welcome' | '/posts' | '/posts/:id'
 */
export type ExtractRoutePaths<
    T extends readonly DeepReadonly<RouteObject>[],
    R = DeepWriteable<T>[number],
> = ExtractChildPaths<ToTuple<R>>;
