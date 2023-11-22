import { makeAutoObservable, toJS } from 'mobx';
import {
    ConstructionDate,
    Engagement,
    IInfos,
    Bien,
    Refs,
    Surface,
    Diagnostiques
} from '../types/Engagement';
import { log } from 'console';

export class CurrentEngagementStore {
    private engagement: Engagement = {};
    private mission: any ={}

    constructor() {
        makeAutoObservable(this);
    }

    getCurrentEngagement() {
        return toJS(this.engagement);
    }

    getCurrentMission() {
        return toJS(this.mission);
    }

    setMissionId(id: string) {
        this.mission.id = id;
    }

    getProperty(field: Refs) {
        if (Object.is(field, Refs.TRANSACTION)) {
            return this.engagement.project;
        }
        else if (Object.is(field, Refs.BIEN)) {
            return this.engagement.bien;
        } else if (Object.is(field, Refs.ANNEE_CONSTRUCTION)) {
            return this.engagement.buildingYear;
        } else if (Object.is(field, Refs.SURFACE)) {
            return this.engagement.surface;
        }
    }

    setProperty(field: Refs, value: any) {
        if (Object.is(field, Refs.TRANSACTION)) {
            this.engagement = { ...this.engagement, project: value };
            this.mission = { ...this.mission, type_transaction_id: value.id };
            
        }
        else if (Object.is(field, Refs.BIEN)) {
            this.engagement = { ...this.engagement, bien: value as Bien };
            this.mission = { ...this.mission, type_bien_id: value.id as string };
        } else if (Object.is(field, Refs.ANNEE_CONSTRUCTION)) {
            this.engagement = { ...this.engagement, buildingYear: value as ConstructionDate };
            this.mission = { ...this.mission, type_construction_id: value.id as string };
        } else if (Object.is(field, Refs.SURFACE)) {
            this.engagement = { ...this.engagement, surface: value as Surface };
            this.mission = { ...this.mission, type_surface_id: value.id as string};
        }
    }

    getAnnexes(): number | undefined {
        return this.engagement.annexes;
    }

    setAnnexes(annexes: number = 0) {
        this.engagement.annexes = annexes;
        this.mission.surface_annexe = annexes;
    }

    getDiagnostics() {
        return this.engagement.diagnostics;
    }

    setDiagnostics(diagnostics: Diagnostiques[]) {
        this.engagement.diagnostics = [...diagnostics];
        this.mission.diagnostics = [...diagnostics.map((diag) => diag.id)];
    }

    getInfos() {
        return this.engagement.infos;
    }


    setInfos(infos: IInfos) {
        this.engagement.infos = { ...this.engagement.infos, ...infos };
        this.mission = { ...this.mission, ...infos };
    }

    setRDV(rdv_jour: string) {
        this.engagement.infos = { ...this.engagement.infos, rdv_jour }
        this.mission.rdv_jour = rdv_jour 
        console.log('date',this.engagement.infos)
    }
}
