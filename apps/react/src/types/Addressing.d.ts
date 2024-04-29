export interface DataService {
    id: number;
    name: string;
    interface_version: string;
    auth_endpoint: string;
    token_endpoint: string;
    roles: {
        code: string;
        resource_endpoint: string;
    }[];
}

export type HealthcareService = {
    medmij_id: string;
    organization_type: string;
    id_type: string;
    id_value: string;
    dataservices: DataService[];
};
