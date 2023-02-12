// @ts-nocheck

import {BuildingYear, Good, IEngagementType, Project, GoodSurface} from './Engagement';

export const labelsMap = new Map<IEngagementType, string>();
initLabelsMap();

function initLabelsMap() {
    labelsMap.set(Project.VENTE, 'Vente');
    labelsMap.set(Project.LOCATION, 'Location');

    labelsMap.set(Good.APPARTEMENT, 'Appartement');
    labelsMap.set(Good.MAISON, 'Maison');
    labelsMap.set(Good.LOCAL, 'Local');
    labelsMap.set(Good.IMMEUBLE, 'Immeuble');

    labelsMap.set(BuildingYear.AVANT_1948, 'Avant 1948');
    labelsMap.set(BuildingYear.ENTRE_1948_1997, 'Entre 1948 et 1997');
    labelsMap.set(BuildingYear.APRES_1997, 'Après 1997');
    labelsMap.set(BuildingYear.MOINS_15_ANS, 'Moins de 15 ans');

    labelsMap.set(GoodSurface.ENTRE_10_40_M2, 'De 10 à 40 m²');
    labelsMap.set(GoodSurface.ENTRE_40_70_M2, 'De 40 à 70 m²');
    labelsMap.set(GoodSurface.ENTRE_70_110_M2, 'De 70 à 110 m²');
    labelsMap.set(GoodSurface.ENTRE_110_150_M2, 'De 110 à 150 m²');
    labelsMap.set(GoodSurface.ENTRE_150_220_M2, 'De 150 à 220 m²');
}

// export enum Labels {
//     [Project.VENTE] = 'Vente',
//     [Project.LOCATION] = 'Location',
//
//     [Good.APPARTEMENT] = 'Appartement',
//     [Good.MAISON] = 'Maison',
//     [Good.LOCAL] = 'Local',
//     [Good.IMMEUBLE] = 'Immeuble',
//
//     [BuildingYear.AVANT_1948] = 'Avant 1948',
//     [BuildingYear.ENTRE_1948_1997] = 'Entre 1948 et 1997',
//     [BuildingYear.APRES_1997] = 'Après 1997',
//     [BuildingYear.MOINS_15_ANS] = 'Moins de 15 ans',
//
//     [SURFACE.ENTRE_10_40_M2] = 'De 10 à 40 m²',
//     [SURFACE.ENTRE_40_70_M2] = 'De 40 à 70 m²',
//     [SURFACE.ENTRE_70_110_M2] = 'De 70 à 110 m²',
//     [SURFACE.ENTRE_110_150_M2] = 'De 110 à 150 m²',
//     [SURFACE.ENTRE_150_220_M2] = 'De 150 à 220 m²',
// }