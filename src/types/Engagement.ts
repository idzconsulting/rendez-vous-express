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
    id?: string;
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
    id: number;
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
    rdv_jour?: string;
    id_technicien?: string;
    bien_code_postal?:string;
    proprietaire_telephone?:string;
    surface?:number;
    note?:string;
    commentaire?:string;
    chauffage_collectif?:boolean;
    prix?:string;
    autre_sur_place?:boolean;
    mail_sur_place?:string;
    tel_sur_place?:string;
    nom_sur_place?:string;
    locataire?:string;
    telLocataire?:string;
    agent_facturer?:boolean;
    sur_place?:string | undefined;
    envoi_rapport_agent?:boolean;
    envoi_rapport_notaire?:boolean;
    tel?:string;
    id_agent?: number;
    nom_agent?:string;
}