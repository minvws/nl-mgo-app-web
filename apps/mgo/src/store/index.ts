import { create, StateCreator } from 'zustand';

import {
    createOrganizationsSlice,
    type HealthcareOrganization,
    type OrganizationsSlice,
} from './organizations/organizations';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { createSelectors } from './createSelectors';
import {
    createResourcesSlice,
    type Resource,
    type ResourceSource,
    type ResourcesSlice,
} from './resources/resources';

export { type HealthcareOrganization, type Resource, type ResourceSource };

export type StoreState = ResourcesSlice & OrganizationsSlice;

const initializer: StateCreator<StoreState, [], [], StoreState> = (...storeArgs) => ({
    ...createOrganizationsSlice(...storeArgs),
    ...createResourcesSlice(...storeArgs),
});

const persistConfig = {
    name: 'mgo-store',
    storage: createJSONStorage(() => sessionStorage),
    partialize: ({ organizations }: StoreState): Partial<StoreState> => ({ organizations }),
};

const storeBase = create<StoreState>()(
    devtools(persist(initializer, persistConfig), {
        enabled: import.meta.env.DEV && import.meta.env.NODE_ENV !== 'test',
    })
);

export const useStore = createSelectors(storeBase);
