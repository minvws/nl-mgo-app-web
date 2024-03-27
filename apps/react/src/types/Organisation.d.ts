export type Address = {
    active?: boolean;
    address?: string;
    city?: string;
    country?: string;
    postal_code?: string;
    state?: string;
    type?: string;
    lines?: string[];
    geolocation?: {
        latitude?: number;
        longitude?: number;
    };
};

export interface HealthcareOrganisation {
    display_name: string;
    id_type: string;
    id_value: string;
    active?: boolean;
    addresses?: Address[];
}
