import {makeAutoObservable, toJS} from 'mobx';
import {BuildingYear, Engagement, Good, GoodSurface, IEngagementType, Project} from '../types/Engagement';

export class CurrentEngagement {
    private engagement: Engagement = {};

    constructor() {
        makeAutoObservable(this);
    }

    getCurrentEngagement() {
        return this.engagement;
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
        console.warn(field);
        console.warn(typeof Project);
        console.warn(Object.is(field, Project));

        if (Object.is(field, Project)) {
            this.engagement = {...this.engagement, project: value as Project};
        } else if (Object.is(field, Good)) {
            this.engagement = {...this.engagement, good: value as Good};
        } else if (Object.is(field, BuildingYear)) {
            this.engagement = {...this.engagement, buildingYear: value as BuildingYear};
        } else if (Object.is(field, GoodSurface)) {
            this.engagement = {...this.engagement, goodSurface: value as GoodSurface};
        }

        console.warn(toJS(this.engagement));
    }
}
