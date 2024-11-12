import * as resourcesR3 from '../../r3/resources';
import { type ResourceConfigR3 } from '../../r3/resources/config';
import * as resourcesR4 from '../../r4/resources';
import { type ResourceConfigR4 } from '../../r4/resources/config';

type AnyResourceConfigR3 = ResourceConfigR3<any, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
type AnyResourceConfigR4 = ResourceConfigR4<any, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

// Ensures only resource configs are listed
resourcesR3 satisfies Record<string, AnyResourceConfigR3>;
resourcesR4 satisfies Record<string, AnyResourceConfigR4>;

export const resourcesMapR3 = Object.fromEntries(
    Object.entries(resourcesR3).map(([_name, config]) => [config.profile, config])
);
export const resourcesMapR4 = Object.fromEntries(
    Object.entries(resourcesR4).map(([_name, config]) => [config.profile, config])
);

type ResourcesMapR3 = typeof resourcesMapR3;
type ResourcesMapR4 = typeof resourcesMapR4;

export type ResourceTypeConfigR3 = ResourcesMapR3[keyof ResourcesMapR3];
export type ResourceTypeConfigR4 = ResourcesMapR4[keyof ResourcesMapR4];

export type MgoResourceR3 = ReturnType<ResourceTypeConfigR3['parse']>;
export type MgoResourceR4 = ReturnType<ResourceTypeConfigR4['parse']>;
