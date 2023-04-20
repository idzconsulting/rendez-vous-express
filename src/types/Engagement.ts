import {DiagnosticsTypes} from './DiagnosticsTypes';

export enum Refs {
    TRANSACTION = 'TRANSACTION',
    BIEN='BIEN',
    ANNEE_CONSTRUCTION='ANNEE_CONSTRUCTION',
    SURFACE='SURFACE'

}

export interface Engagement {
    project?: Transaction;
    bien?: Bien;
    buildingYear?: ConstructionDate;
    surface?: Surface;
    annexes?: number;
    diagnostics?: Diagnostiques[];
    infos?: IInfos;
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

export interface IInfos {
    proprietaire_nom?: string;
    bien_adresse?: string;
    proprietaire_email?: string;
    agence?: string;
    rdv_jour?: Date;
    bien_code_postal?:string;
    proprietaire_telephone?:string;
}