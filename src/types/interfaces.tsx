export interface Refs {
    date_construction: [ConstructionDate];
    diagnostiques?: [Diagnostiques];
    surface_annexe_prix?: [SurfaceAnnexePrix];
    type_bien?: [Bien];
    type_partenaire?: [Partenaire];
    type_surface?: [Surface];
    type_transaction?: [Transaction];
}

export interface ConstructionDate {
    id: string;
    nom: string;
}

export interface Diagnostiques {
    id: string;
    name: string;
}

export interface SurfaceAnnexePrix {
    prix: string;
    surface_min: string;
    surface_max: string;
    zone_id: string
}

export type Bien = {
    id: string;
    nom: string;
}

export type Partenaire = {
    id: string;
    nom: string;
}

export type Surface = {
    id: string;
    nom: string;
}

export type Transaction = {
    id: string;
    nom: string;
    label: string;
}


export type IEngagementType =
    Bien
    | ConstructionDate
    | Transaction
    | Surface
    ;