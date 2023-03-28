import {DiagnosticsTypes} from './DiagnosticsTypes';

export interface Engagement {
    project?: Project;
    good?: Good;
    buildingYear?: BuildingYear;
    goodSurface?: GoodSurface;
    annexes?: number;
    diagnostics?: DiagnosticsTypes[];
    infos?: IInfos;
}

export type IEngagementType =
      typeof Project
    | typeof Good
    | typeof BuildingYear
    | typeof GoodSurface
    ;

export enum Project {
    LOCATION = "LOCATION",
    VENTE = "VENTE",
}

export enum Good {
    APPARTEMENT = 'APPARTEMENT',
    IMMEUBLE = 'IMMEUBLE',
    MAISON = 'MAISON',
    LOCAL = 'LOCAL'
}

export enum BuildingYear {
    AVANT_1948 = 'AVANT_1948',
    ENTRE_1948_1997 = '1948_1997',
    APRES_1997 = 'APRES_1997',
    MOINS_15_ANS = 'MOINS_15_ANS',
}

export enum GoodSurface {
    ENTRE_10_40_M2 = 'ENTRE_10_40_M2',
    ENTRE_40_70_M2 = 'ENTRE_40_70_M2',
    ENTRE_70_110_M2 = 'ENTRE_70_110_M2',
    ENTRE_110_130_M2 = 'ENTRE_110_130_M2',
    PLUS_DE_130 = 'PLUS_DE_130',
}

export interface IInfos {
    name?: string;
    address?: string;
    postalCode?: string;
    phoneNumber?: string;
    email?: string;
    agence?: string;
    date?: Date;
    hour?: string;
}