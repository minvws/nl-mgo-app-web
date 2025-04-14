type Address = {
    active?: boolean;
    address?: string;
    city?: string;
    country?: string;
    postalcode?: string;
    state?: string | null;
    type?: string;
    lines?: string[];
    geolocation?: {
        latitude?: number;
        longitude?: number;
    };
};

type Name = {
    full_name?: string;
    preferred?: boolean;
};

type HealthcareOrganizationType = {
    code?: string;
    display_name?: string;
    type?: string;
};

type HealthcareServiceDTORole = {
    code?: string;
    resource_endpoint?: string;
};

export type HealthcareServiceDTO = {
    id?: string;
    name?: string;
    interface_version?: number;
    auth_endpoint?: string;
    token_endpoint?: string;
    roles?: HealthcareServiceDTORole[];
};

export type HealthcareOrganizationDTO = {
    display_name?: string;
    identification: string;
    active?: boolean;
    addresses?: Address[];
    names?: Name[];
    types?: HealthcareOrganizationType[];
    data_services: HealthcareServiceDTO[];
};

export interface OrganisationSearchResponse {
    organizations: HealthcareOrganizationDTO[];
}
