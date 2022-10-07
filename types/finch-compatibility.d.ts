export interface Provider_Fields {
    provider_id: string;
    display_name: string;
    logo: string;
    icon: string | null;
    products: string[];
    mfa_required: string | null;
    primary_color: string | null;
    compatibility: {
        company: Company_Fields | null;
        directory: Directory_Fields;
    }

}

export interface Company_Fields {
    id: boolean;
    legal_name: boolean;
    entity: Entity_Fields;
    primary_email: boolean;
    primary_phone_number: boolean;
    ein: boolean;
    department: boolean;
    departments: Departments_Fields;
    location: boolean;
    locations: Locations_Fields;
    account: boolean;
    accounts: Accounts_Fields;
}

export interface Accounts_Fields {
    routing_number: boolean;
    account_name: boolean;
    institution_name: boolean;
    account_type: boolean;
    account_number: boolean;
}

export interface Departments_Fields {
    name: boolean;
    parent: Ent_Fields;
}

export interface Ent_Fields {
    name: boolean;
}

export interface Entity_Fields {
    type: boolean;
    subtype: boolean;
}

export interface Locations_Fields {
    line1: boolean;
    line2: boolean;
    city: boolean;
    state: boolean;
    postal_code: boolean;
    country: boolean;
}

export interface Directory_Fields {
    paging: Paging_Fields;
    individuals: Individuals_Fields;
}

export interface Individuals_Fields {
    id: boolean;
    first_name: boolean;
    middle_name: boolean;
    last_name: boolean;
    manager: Manager_Fields;
    department: Ent_Fields;
    is_active: boolean;
}

export interface Manager_Fields {
    id: boolean;
}

export interface Paging_Fields {
    count: boolean;
    offset: boolean;
}
