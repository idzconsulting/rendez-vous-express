import {makeAutoObservable} from 'mobx';
import {InsererDTO} from '../types/dto/InsererDTO';

export class InsererStore {
    private inserer: InsererDTO = {};

    constructor() {
        makeAutoObservable(this);
    }

    get() {
        return this.inserer;
    }

    set(inserer: InsererDTO) {
        this.inserer = {...this.inserer, ...inserer};
    }
}