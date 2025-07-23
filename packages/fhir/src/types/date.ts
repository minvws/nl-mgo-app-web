/**
 * A time during the day, in the format hh:mm:ss (a subset of [ISO8601] icon)
 * @see: https://build.fhir.org/datatypes.html#time
 * @example
 * 13:28:17
 * 13:28:17.20
 */
export type TimeString = `${number}:${number}:${number}${string}`;

/**
 * A date, or partial date (e.g. just year or year + month) as used in human communication.
 * The format is a subset of [ISO8601] icon: YYYY, YYYY-MM, or YYYY-MM-DD
 * @see: https://build.fhir.org/datatypes.html#date
 * @example
 * 2018
 * 1973-06
 * 1905-08-23
 */
export type DateString = `${number}` | `${number}-${number}` | `${number}-${number}-${number}`;

/**
 * A date, date-time or partial date (e.g. just year or year + month) as used in human communication.
 * The format is a subset of [ISO8601] icon: YYYY, YYYY-MM, YYYY-MM-DD or YYYY-MM-DDThh:mm:ss+zz:zz,
 * @see: https://build.fhir.org/datatypes.html#dateTime
 * @example
 * 2018,
 * 1973-06,
 * 1905-08-23,
 * 2015-02-07T13:28:17-05:00,
 * 2017-01-01T00:00:00.000Z.
 */
export type DateTimeString =
    | `${number}`
    | `${number}-${number}`
    | `${number}-${number}-${number}`
    | `${number}-${number}-${number}T${number}:${number}:${number}${string}`;

/**
 * The format is a subset of [ISO8601] icon: YYYY-MM-DDThh:mm:ss+zz:zz,
 * @see: https://build.fhir.org/datatypes.html#instant
 * @example
 * 2015-02-07T13:28:17-05:00,
 * 2017-01-01T00:00:00.000Z.
 */
export type InstantDateTimeString =
    `${number}-${number}-${number}T${number}:${number}:${number}${string}`;
