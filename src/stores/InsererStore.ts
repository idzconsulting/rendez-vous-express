import { makeAutoObservable } from 'mobx';
import { InsererDTO } from '../types/dto/InsererDTO';

export class InsererStore {
    private inserer: InsererDTO = {};
    private showNext = false;
    constructor() {
        makeAutoObservable(this);
    }

    setNext(flag: boolean) {
        this.showNext = flag;
    }
    getNext() {
        return this.showNext
    }
    get() {
        return this.inserer;
    }

    set(inserer: InsererDTO) {
        this.inserer = { ...this.inserer, ...inserer };
    }
}