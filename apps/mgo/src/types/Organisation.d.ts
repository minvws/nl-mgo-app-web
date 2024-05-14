export type Address = {
    active: boolean;
    address: string;
    city: string;
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

export type Name = {
    full_name: string;
    preferred: boolean;
};

export type HealthcareOrganizationType = {
    code: string;
    display_name: string;
    type: string;
};

export interface HealthcareOrganizationDTO {
    display_name: string;
    identification_type: string;
    identification_value: string;
    active: boolean;
    addresses: Address[];
    names: Name[];
    types: HealthcareOrganizationType[];
    data_services: HealthcareService[];
}

export interface OrganisationSearchResponse {
    organizations: HealthcareOrganizationDTO[];
}
