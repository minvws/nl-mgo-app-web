export type OptionalPropsWhenFlagIsTrue<T, Flag extends keyof T> =
    | ({
          [key in keyof Omit<T, Flag>]: T[key];
      } & {
          [key in Flag]?: false;
      })
    | ({
          [key in keyof Omit<T, Flag>]?: T[key];
      } & {
          [key in Flag]: true;
      });
