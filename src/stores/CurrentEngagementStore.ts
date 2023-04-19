import {makeAutoObservable, toJS} from 'mobx';
import {
    BuildingYear,
    Engagement,
   IInfos,
   Bien,
   Refs,
   Surface
} from '../types/Engagement';
import {DiagnosticsTypes} from '../types/DiagnosticsTypes';

export class CurrentEngagementStore {
    private engagement: Engagement = {};

    constructor() {
        makeAutoObservable(this);
    }

    getCurrentEngagement() {
        return toJS(this.engagement);
    }

    getProperty(field: Refs) {
        if (Object.is(field, Refs.TRANSACTION)) {
            return this.engagement.project;
        }
        else if (Object.is(field, Refs.BIEN)) {
            return this.engagement.bien;
        } else if (Object.is(field,Refs.ANNEE_CONSTRUCTION)) {
            return this.engagement.buildingYear;
        } else if (Object.is(field, Refs.SURFACE)) {
            return this.engagement.surface;
        }
    }

    setProperty(field: Refs, value: any) {
        if (Object.is(field, Refs.TRANSACTION)) {
            console.log('hi')
            this.engagement = {...this.engagement, project: value};
        }
        else if (Object.is(field, Refs.BIEN)) {
            this.engagement = {...this.engagement, bien: value as Bien};
        } else if (Object.is(field, Refs.ANNEE_CONSTRUCTION)) {
            this.engagement = {...this.engagement, buildingYear: value as BuildingYear};
        } else if (Object.is(field, Refs.SURFACE)) {
            this.engagement = {...this.engagement, surface: value as Surface};
        }
    }

    getAnnexes(): number | undefined {
        return this.engagement.annexes;
    }

    setAnnexes(annexes: number = 0) {
        this.engagement.annexes = annexes;
    }

    getDiagnostics() {
        return this.engagement.diagnostics;
    }

    setDiagnostics(diagnostics: DiagnosticsTypes[]) {
        this.engagement.diagnostics = [...diagnostics];
    }

    getInfos() {
        return this.engagement.infos;
    }

    setInfos(infos: IInfos) {
        this.engagement.infos = {...this.engagement.infos, ...infos};
    }

    setRDV(date: Date, hour: string) {
        this.engagement.infos = {...this.engagement.infos, date, hour}
    }
}
