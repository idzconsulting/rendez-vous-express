import {makeAutoObservable, toJS} from 'mobx';
import {
    BuildingYear,
    Engagement,
    Good,
    GoodSurface,
    IEngagementType,
    IInfos,
    Project
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

    getProperty(field: IEngagementType) {
        if (Object.is(field, Project)) {
            return this.engagement.project;
        } else if (Object.is(field, Good)) {
            return this.engagement.good;
        } else if (Object.is(field, BuildingYear)) {
            return this.engagement.buildingYear;
        } else if (Object.is(field, GoodSurface)) {
            return this.engagement.goodSurface;
        }
    }

    setProperty(field: IEngagementType, value: any) {
        if (Object.is(field, Project)) {
            this.engagement = {...this.engagement, project: value as Project};
        } else if (Object.is(field, Good)) {
            this.engagement = {...this.engagement, good: value as Good};
        } else if (Object.is(field, BuildingYear)) {
            this.engagement = {...this.engagement, buildingYear: value as BuildingYear};
        } else if (Object.is(field, GoodSurface)) {
            this.engagement = {...this.engagement, goodSurface: value as GoodSurface};
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
        this.engagement.infos = {...infos};
    }

    setRDV(date: Date, hour: string) {
        this.engagement.infos = {...this.engagement.infos, date, hour}
    }
}
