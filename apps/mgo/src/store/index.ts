import { create, StateCreator } from 'zustand';

import {
    createOrganizationsSlice,
    type HealthcareOrganization,
    type OrganizationsSlice,
} from './organizations/organizations';

import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { createSelectors } from './createSelectors';
import { createResourcesSlice, type Resource, type ResourcesSlice } from './resources/resources';

export { type HealthcareOrganization, type Resource };

export type StoreState = ResourcesSlice & OrganizationsSlice;

const initializer: StateCreator<StoreState, [], [], StoreState> = (...storeArgs) => ({
    ...createOrganizationsSlice(...storeArgs),
    ...createResourcesSlice(...storeArgs),
});

const persistConfig = {
    name: 'mgo-organizations',
    storage: createJSONStorage(() => sessionStorage),
    partialize: ({ organizations }: StoreState): Partial<StoreState> => ({ organizations }),
};

const storeBase = create<StoreState>()(
    devtools(persist(initializer, persistConfig), { enabled: import.meta.env.DEV })
);

const useStore = createSelectors(storeBase);

/**
 * Only expose `use` selectors to enforce fine-grained subscriptions.
 * Components can access just the slices they need, avoiding unnecessary re-renders.
 */
export const store = {
    use: useStore.use,
    getState: useStore.getState,
    setState: useStore.setState,
};
